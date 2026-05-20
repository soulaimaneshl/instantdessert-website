---
stepsCompleted: [1, 2, 3, 4, 5, 6, 7, 8]
inputDocuments: ['_bmad-output/planning-artifacts/prds/prd-instantdessert_website-2026-05-20/prd.md', 'docs/business_plan_instant_dessert_revise.docx', '_bmad-output/brainstorming/brainstorming-session-2026-05-20-1640.md']
workflowType: 'architecture'
project_name: 'instantdessert_website'
user_name: 'Sousousou'
date: '2026-05-20'
---

# Architecture Decision Document — Instant Dessert

_Document construit collaborativement step-by-step. Sections ajoutées au fil des décisions._

## Project Context Analysis

### Requirements Overview

**Functional Requirements (23 FRs, 4 sites) :**

| Site | FRs | Complexité dominante |
|---|---|---|
| `instantdessert.fr` — Portail | FR-1, FR-2 | Simple — landing statique bifurquée |
| `pro.instantdessert.fr` — B2B | FR-3 à FR-9 | Moyenne — auth, interface commande, dashboard |
| `commande.instantdessert.fr` — DK | FR-10 à FR-21 | Élevée — e-commerce, paiement, compte client, fidélisation |
| `ptitdej.instantdessert.fr` — Brunch | FR-22, FR-23 | Moyenne — catalogue formules, précommande avec paiement |

**Implications architecturales clés par FR :**
- **Commande directe DK (FR-12)** → gateway de paiement PCI-DSS (Stripe), gestion de panier persistant, webhooks de confirmation
- **Authentification Partenaire + Client (FR-7, FR-14)** → deux systèmes d'auth distincts (B2B vs B2C) ou un seul avec rôles — décision critique
- **"Votre habituel ?" (FR-15)** → persistance historique commandes, logique de suggestion côté serveur
- **"Souvent commandé avec..." (FR-16)** → agrégation de données de commandes (simple requête SQL, pas ML)
- **Teaser brunch + liste d'attente (FR-18)** → capture email, intégration newsletter (Brevo, Mailchimp ou équivalent)
- **Dashboard Partenaire (FR-9)** → API REST interne pour historique commandes B2B
- **Commande B2B sans paiement en ligne (FR-8)** → workflow de commande simplifié côté back-office, notification email/SMS

**Non-Functional Requirements architecturalement structurants :**
- Mobile-first DK + brunch (responsive obligatoire)
- FCP < 1,5s mobile 4G → SSR ou SSG obligatoire sur les pages critiques
- PCI-DSS via Stripe (aucune donnée carte stockée serveur)
- RGPD → consentement cookies, droit à l'oubli, politique de confidentialité
- Uptime 99,5 % → hébergement avec SLA garantie, pas de mutualisé basique

### Scale & Complexity

- **Domaine principal :** Full-stack web — multi-site, e-commerce, authentification, back-office léger
- **Niveau de complexité :** Moyen-élevé (pas enterprise, mais au-delà du site vitrine simple)
- **Composants architecturaux estimés :** 8-12 (4 frontends, 1-2 backends/API, 1 base de données, 1 gateway paiement, 1 service email, 1 hébergement/CDN)
- **Données sensibles :** Adresses clients, emails, historiques commandes, données de paiement (via Stripe uniquement)

### Technical Constraints & Dependencies

- **Domaine unique :** `instantdessert.fr` — les 4 sous-domaines sont des DNS distincts pointant vers le même ou différents hébergements
- **Pas de paiement B2B en ligne au lancement** — simplifie le site pro mais crée un besoin de notification/workflow manuel côté dirigeant
- **Pas de gestion de stocks en temps réel** — retire la complexité d'un système d'inventaire live
- **Pas de créneaux en temps réel** — les horaires de livraison/click & collect sont statiques
- **Pas d'intégration API Uber Eats/Deliveroo** — les plateformes restent des canaux manuels séparés
- **Lancement M1 urgent** — l'architecture doit permettre un déploiement rapide du portail + site pro + site DK simultanément
- **Budget startup** — pas d'infrastructure cloud complexe au lancement (pas de Kubernetes, pas de microservices)
- **Équipe technique :** Probablement 1-2 développeurs [ASSUMPTION] — l'architecture doit rester maintenable par une petite équipe

## Starter Template & Stack Decision

### Structure : Monorepo Turborepo 2.9.0

```
instantdessert-website/
├── apps/
│   ├── portail/        → instantdessert.fr
│   ├── pro/            → pro.instantdessert.fr
│   ├── commande/       → commande.instantdessert.fr
│   └── ptitdej/        → ptitdej.instantdessert.fr
└── packages/
    ├── ui/             → composants partagés (design system)
    └── config/         → configs partagées (TypeScript, Tailwind)
```

**Commande d'initialisation :**
```bash
npx create-turbo@2.9.0
```

### Stack validé

| Technologie | Version | Rôle |
|---|---|---|
| Next.js | 16.2.6 LTS | Framework web — SSR/SSG, API routes, 4 apps |
| TypeScript | latest | Langage — typage statique, maintenabilité |
| Tailwind CSS | v4.3 | Styling — tokens charte graphique intégrés |
| Supabase | JS client 2.30.0 | PostgreSQL + Auth + Row Level Security |
| Stripe | Node SDK v21+ | Paiement en ligne PCI-DSS |
| Brevo | v5.x (@getbrevo/brevo) | Email transactionnel + newsletter |
| Vercel | — | Hébergement Next.js, CDN mondial |
| Hostinger | — | DNS uniquement (sous-domaines → Vercel) |
| Plausible | — | Analytics RGPD-friendly |

### Rationale des choix clés

- **Turborepo** → partage du design system entre les 4 apps, un seul repo GitHub, un seul pipeline CI/CD
- **Next.js** → SSR obligatoire pour FCP < 1,5s mobile; API routes remplacent un back-end séparé pour les opérations simples
- **Supabase** → PostgreSQL (SQL connu), auth B2B + B2C avec Row Level Security, gratuit au lancement
- **Vercel** → déploiement automatique depuis GitHub, sous-domaines configurables, optimisé Next.js
- **Hostinger** → conservé uniquement pour la gestion du domaine `instantdessert.fr` et les entrées DNS

---

### Cross-Cutting Concerns

## Core Architectural Decisions

### Décisions critiques (bloquantes pour l'implémentation)

| # | Décision | Choix retenu |
|---|---|---|
| D-1 | Modèle utilisateur | Table unique `auth.users` avec `role` (client / partenaire / admin) |
| D-2 | Validation partenaire | Manuelle via dashboard Supabase — `statut_validation` en base |
| D-3 | Protection routes | Middleware Next.js vérifie rôle avant affichage |
| D-4 | Pattern API | Server Actions pour opérations internes, API Route pour webhooks Stripe |
| D-5 | State management | React `useState` + Context léger pour panier — pas de librairie externe |
| D-6 | Déploiement | 4 projets Vercel distincts sur même repo, branche `main` → production |

### Décisions importantes (structurantes)

| # | Décision | Choix retenu |
|---|---|---|
| D-7 | Sécurité données | Row Level Security Supabase activé sur toutes les tables |
| D-8 | Sessions cross-sous-domaines | Cookie `domain=.instantdessert.fr` |
| D-9 | Design system | `packages/ui` partagé — tokens charte graphique + composants communs |
| D-10 | Images produits | Supabase Storage + `next/image` (WebP, lazy loading) |
| D-11 | DNS | Hostinger → 4 CNAME vers `cname.vercel-dns.com` |
| D-12 | CI/CD | Vercel natif (preview sur PR, production sur merge `main`) |

### Décisions différées (post-MVP)

| Décision | Raison du report |
|---|---|
| Paiement B2B en ligne | Facturation hors ligne au lancement — FR-8 |
| Gestion stocks temps réel | Complexité injustifiée au lancement |
| Notifications push mobile | Non dans scope MVP |

### Data Architecture

**Schéma de base de données (Supabase / PostgreSQL) :**

```sql
-- Géré par Supabase Auth
-- auth.users: id, email, role (client|partenaire|admin), created_at

-- Profils restaurants B2B
restaurants (
  id uuid PK,
  user_id uuid FK → auth.users,
  nom text,
  adresse text,
  telephone text,
  statut_validation text DEFAULT 'en_attente'  -- en_attente | validé | refusé
)

-- Catalogue produits (B2B et B2C)
products (
  id uuid PK,
  nom text,
  description text,
  prix_b2b numeric,
  prix_b2c numeric,
  categorie text,
  actif boolean DEFAULT true
)

-- Commandes B2B
orders_b2b (
  id uuid PK,
  restaurant_id uuid FK → restaurants,
  statut text DEFAULT 'reçue',  -- reçue | en_préparation | livrée
  created_at timestamptz
)

order_items_b2b (
  id uuid PK,
  order_id uuid FK → orders_b2b,
  product_id uuid FK → products,
  quantite integer
)

-- Commandes Dark Kitchen
orders_b2c (
  id uuid PK,
  user_id uuid FK → auth.users,
  mode text,  -- livraison | click_collect
  statut text DEFAULT 'reçue',
  stripe_payment_id text,
  created_at timestamptz
)

order_items_b2c (
  id uuid PK,
  order_id uuid FK → orders_b2c,
  product_id uuid FK → products,
  quantite integer
)

-- Programme fidélité DK (FR-17)
fidelite_points (
  id uuid PK,
  user_id uuid FK → auth.users,
  points integer DEFAULT 0,        -- 1 point = 1 € dépensé (arrondi inférieur)
  updated_at timestamptz
)

fidelite_transactions (
  id uuid PK,
  user_id uuid FK → auth.users,
  order_id uuid FK → orders_b2c,
  points_gagnes integer,
  created_at timestamptz
)

-- Liste d'attente brunch
waitlist_brunch (
  id uuid PK,
  email text UNIQUE,
  prenom text,
  created_at timestamptz
)
```

**Row Level Security — exemples de politiques :**
```sql
-- Un partenaire ne voit que ses propres commandes
CREATE POLICY "partenaire_own_orders" ON orders_b2b
  FOR SELECT USING (
    restaurant_id IN (
      SELECT id FROM restaurants WHERE user_id = auth.uid()
    )
  );

-- Un client ne voit que ses propres commandes DK
CREATE POLICY "client_own_orders" ON orders_b2c
  FOR SELECT USING (user_id = auth.uid());

-- Un client ne voit que ses propres points fidélité
CREATE POLICY "client_own_fidelite" ON fidelite_points
  FOR SELECT USING (user_id = auth.uid());

CREATE POLICY "client_own_fidelite_transactions" ON fidelite_transactions
  FOR SELECT USING (user_id = auth.uid());
```

### Authentication & Security

- **Supabase Auth** — gestion complète (inscription, connexion, reset password, sessions)
- **Rôles** : `client` (auto-inscription DK), `partenaire` (inscription manuelle validée), `admin` (associés)
- **Cookie de session** : `domain=.instantdessert.fr` — persistance cross-sous-domaines
- **Validation partenaire** : workflow manuel — Supabase dashboard → changer `statut_validation` → accès débloqué
- **Middleware Next.js** : vérifie `supabase.auth.getUser()` + rôle sur chaque route protégée
- **Secrets** : toutes clés API en variables d'environnement Vercel, jamais dans le code

### API & Communication Patterns

```
Client (navigateur)
    ↓ appelle
Server Action (Next.js — côté serveur)
    ↓ appelle
Supabase (base de données) | Stripe (paiement) | Brevo (email)
```

- **Server Actions** : création de compte, passage de commande, inscription liste d'attente, dashboard partenaire
- **API Route** `/api/stripe/webhook` : réception confirmation paiement Stripe (URL publique nécessaire)
- **Appels Supabase directs** (Server Components) : lecture catalogue, lecture historique commandes
- **Pattern d'erreur uniforme** : `{ success: boolean, error?: string }` sur toutes les Server Actions

### Frontend Architecture

**Design System — `packages/ui` :**
```typescript
// design-tokens.ts — charte graphique en tokens Tailwind
colors: {
  chocolat: '#2B1A14',
  creme:    '#FFF7EE',
  rose:     '#D97773',
  caramel:  '#C8953E',
  blush:    '#FCE7E3',
}
// Typo titre : Cormorant Garamond / Playfair Display
// Typo corps : Montserrat / Poppins
```

- **Composants partagés** : `Button`, `ProductCard`, `Logo`, `Input`, `Badge`, `Modal`, `CookieBanner`
- **State management** : Server Components pour données serveur, `useState` pour interactions locales, Context pour panier DK
- **Images** : Supabase Storage → `next/image` (optimisation automatique WebP, lazy loading)
- **Fonts** : `next/font` avec Google Fonts (Cormorant Garamond + Montserrat) — self-hosted automatiquement

### Infrastructure & Deployment

**4 projets Vercel — même repo GitHub :**

| Projet | Root Directory | Domaine |
|---|---|---|
| `id-portail` | `apps/portail` | `instantdessert.fr` |
| `id-pro` | `apps/pro` | `pro.instantdessert.fr` |
| `id-commande` | `apps/commande` | `commande.instantdessert.fr` |
| `id-ptitdej` | `apps/ptitdej` | `ptitdej.instantdessert.fr` |

**DNS Hostinger — 4 entrées CNAME :**
```
@              → cname.vercel-dns.com
pro            → cname.vercel-dns.com
commande       → cname.vercel-dns.com
ptitdej        → cname.vercel-dns.com
```

**Flux de déploiement :**
```
git push → branche feature  →  Vercel preview URL (tests)
git merge main              →  Vercel déploie en production (automatique)
```

**Variables d'environnement (par projet Vercel) :**
```bash
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=        # serveur uniquement
STRIPE_SECRET_KEY=                # serveur uniquement
STRIPE_WEBHOOK_SECRET=            # serveur uniquement
BREVO_API_KEY=                    # serveur uniquement
NEXT_PUBLIC_PLAUSIBLE_DOMAIN=
```

---

## 1. **Identité visuelle partagée** → système de design commun (tokens de couleur, typographies, composants partagés) déployable sur les 4 sites
2. **Authentification multi-site** → stratégie de session entre sous-domaines (cookies cross-subdomain ou tokens JWT)
3. **Email transactionnel** → service unique pour les 4 sites (confirmations commande DK, validations pro, liste d'attente brunch)
4. **Analytics** → tracking unifié (Plausible ou GA4) pour comprendre le trafic global et par site
5. **RGPD** → bannière de consentement et politique de confidentialité communes
   - **Composant** : `packages/ui/CookieBanner.tsx` — importé dans le `layout.tsx` racine des 4 apps
   - **Comportement** : affiché à la première visite, stocke le choix dans `localStorage` (`cookie_consent: "accepted" | "refused"`), ne charge Plausible qu'après acceptation
   - **Contenu obligatoire** : bouton "Accepter", bouton "Refuser", lien "Politique de confidentialité"
   - **Politique de confidentialité** : une page statique par app (`/confidentialite`) — même contenu, adapté au contexte (B2B / B2C)
   - **Droit à l'oubli** : Server Action `deleteAccount()` dans `apps/commande` — supprime `auth.users` + données liées via cascade PostgreSQL
6. **SEO multi-domaine** → chaque sous-domaine a son propre SEO — stratégie de balises canonical et sitemap par site
