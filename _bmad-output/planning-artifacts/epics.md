---
stepsCompleted: [1, 2, 3]
inputDocuments: ['_bmad-output/planning-artifacts/prds/prd-instantdessert_website-2026-05-20/prd.md', '_bmad-output/planning-artifacts/architecture.md', '_bmad-output/planning-artifacts/ux-design-specification.md']
---

# instantdessert_website - Epic Breakdown

## Overview

Ce document décompose les requirements du PRD, de l'Architecture et de la spécification UX en epics et stories implémentables pour le projet Instant Dessert (4 sous-domaines : portail, pro, commande, ptitdej).

## Requirements Inventory

### Functional Requirements

FR-1: Le visiteur peut choisir entre deux chemins distincts depuis le portail (restaurateur / commander)
FR-2: Le portail applique intégralement la charte graphique Instant Dessert
FR-3: Un visiteur non authentifié peut consulter la vitrine pro sans voir les prix
FR-4: Chaque produit B2B dispose d'une fiche technique accessible publiquement (DLC, allergènes, conditionnement)
FR-5: Les garanties de service Instant Dessert sont affichées de façon proéminente sur la vitrine pro
FR-6: Un restaurateur peut créer une demande d'accès Espace pro en 3 étapes sans appel téléphonique
FR-7: Un Partenaire validé peut accéder à son Espace pro avec ses identifiants (session persistante, reset password)
FR-8: Le Partenaire peut composer et valider une commande depuis l'Espace pro (sans paiement en ligne)
FR-9: Le Partenaire accède à un tableau de bord simple avec historique et "rejouer commande"
FR-10: Le visiteur DK découvre la marque avant le catalogue (hero plein écran, FCP < 2s mobile 4G)
FR-11: Les 4 produits lancement DK sont présentés avec fiches sensorielles (image, description 2 lignes, prix, allergènes)
FR-12: Le visiteur peut acheter sans passer par Uber Eats (panier persistant, Stripe PCI-DSS, confirmation email)
FR-13: Le client choisit entre livraison à domicile (zone 92) et click & collect
FR-14: Le client peut créer un compte pour retrouver ses commandes et commander plus vite
FR-15: Le client connecté voit sa dernière commande en suggestion dès l'accueil "Votre habituel ?" [M2]
FR-16: Des suggestions croisées "Souvent commandé avec..." sont proposées sur chaque fiche produit [M2]
FR-17: Le Site DK affiche des éléments de preuve sociale hyper-locale (compteur, avis, section labo) [partiel M1, complet M2]
FR-18: Le Site DK annonce les brunchs et collecte des emails avant M6 (formulaire + confirmation email)
FR-19: Le client est récompensé pour ses commandes répétées via programme de fidélité [M3]
FR-20: Le client peut s'abonner à une newsletter gourmande mensuelle [M3]
FR-21: Le client peut parrainer un ami avec un code de réduction [M3]
FR-22: Le visiteur consulte les formules brunch avec contenu et prix [M6]
FR-23: Le client peut réserver une formule brunch pour le week-end suivant avec paiement en ligne [M6]

### NonFunctional Requirements

NFR-1: Mobile-first — portail, DK, brunch conçus mobile en premier ; pro peut être desktop-first
NFR-2: Performance — First Contentful Paint < 1,5s mobile 4G ; chargement total < 3s
NFR-3: Sécurité paiement — conformité PCI-DSS via Stripe, aucune donnée carte stockée côté serveur
NFR-4: RGPD — consentement explicite avant collecte email, politique de confidentialité accessible depuis toutes les pages
NFR-5: Accessibilité — contraste WCAG AA minimum sur toute la palette ; Lighthouse Accessibility ≥ 90 avant merge main
NFR-6: SEO — chaque sous-domaine optimisé indépendamment ; balises Open Graph pour partage social sur DK
NFR-7: Disponibilité — objectif 99,5% uptime (Vercel SLA)

### Additional Requirements

- AR-1: Initialiser le monorepo Turborepo 2.9.0 avec `npx create-turbo@2.9.0` (structure apps/ + packages/)
- AR-2: Créer les 4 apps Next.js 16.2.6 dans apps/ (portail, pro, commande, ptitdej)
- AR-3: Créer packages/ui — design system partagé (composants + tokens Tailwind)
- AR-4: Créer packages/config — configs partagées (tsconfig.base.json, tailwind.config.ts, eslint.config.js)
- AR-5: Configurer Supabase — créer projet, activer Auth, créer toutes les tables DB, activer RLS avec politiques
- AR-6: Configurer 4 projets Vercel distincts sur le même repo GitHub (root directory par app)
- AR-7: Configurer DNS Hostinger — 4 entrées CNAME vers cname.vercel-dns.com
- AR-8: Configurer les variables d'environnement sur chaque projet Vercel (Supabase, Stripe, Brevo, Plausible)
- AR-9: Initialiser shadcn/ui dans chaque app avec tokens de couleur Instant Dessert remplaçant les defaults
- AR-10: Configurer Stripe — clés API + webhook endpoint `/api/stripe/webhook`
- AR-11: Configurer Brevo — clés API pour emails transactionnels et newsletter
- AR-12: Middleware Next.js d'authentification — vérifie session Supabase + rôle sur routes protégées

### UX Design Requirements

UX-DR1: Implémenter CartBar — composant sticky bottom-0, bg-rose poudré, texte blanc, bouton bg-white text-rose, animation bounce à l'ajout panier, aria-label dynamique
UX-DR2: Implémenter ProductCard — bg-white rounded-2xl shadow-sm, ratio image 4:3, bouton "+" bg-rose rounded-full 32×32px, état skeleton (animate-pulse mêmes dimensions)
UX-DR3: Implémenter HabitualBanner — affiché pour clients connectés avec historique, bg-blush rounded-xl, bouton "Réajouter" pré-remplit panier
UX-DR4: Implémenter ModeSelector — 2 cards Click & Collect / Livraison, border-2 rose si sélectionné, radiogroup ARIA
UX-DR5: Implémenter OrderConfirmation — page post-paiement chaleureuse avec prénom, animation confetti légère, focus h1 automatique
UX-DR6: Implémenter CookieBanner — partagé entre 4 apps via packages/ui, localStorage (accepted/refused), charge Plausible seulement après acceptation
UX-DR7: Implémenter Logo — 3 variantes (default, monochrome-clair, monochrome-sombre), 3 tailles (24/32/48px)
UX-DR8: Configurer design tokens Tailwind — chocolat #2B1A14, crème #FFF7EE, rose #D97773, caramel #C8953E, blush #FCE7E3 ; remplacer defaults shadcn/ui (--background, --foreground, --primary, --accent, --muted)
UX-DR9: Configurer typographie — Cormorant Garamond via next/font (Display/H1/H2) + Montserrat (H3/body/small/caption)
UX-DR10: Implémenter focus-visible:ring-2 ring-rose ring-offset-2 sur tous les éléments interactifs
UX-DR11: Implémenter prefers-reduced-motion — désactiver animations CartBar bounce et confetti OrderConfirmation
UX-DR12: Garantir touch targets minimum 44×44px sur tous les éléments tappables (WCAG 2.5.5)
UX-DR13: Utiliser bottom sheet (pas modale centrée) pour panier récap et overlays sur mobile
UX-DR14: Implémenter états vides explicites avec message + action proposée (panier vide, historique vide, erreur réseau)

### FR Coverage Map

| Requirement | Epic | Description |
|---|---|---|
| AR-1 à AR-12 | Epic 1 | Infrastructure monorepo, apps, packages, Supabase, Vercel, DNS, Stripe, Brevo, middleware |
| FR-1 | Epic 1 | Portail — bifurcation restaurateur / commander |
| FR-2 | Epic 1 | Portail — charte graphique Instant Dessert |
| UX-DR6 | Epic 1 | CookieBanner partagé (4 apps) |
| UX-DR7 | Epic 1 | Logo 3 variantes × 3 tailles |
| UX-DR8 | Epic 1 | Tokens Tailwind charte graphique |
| UX-DR9 | Epic 1 | Typographie Cormorant Garamond + Montserrat |
| UX-DR10 | Epic 1 | Focus-visible ring sur éléments interactifs |
| UX-DR11 | Epic 1 | prefers-reduced-motion |
| UX-DR12 | Epic 1 | Touch targets 44×44px |
| UX-DR13 | Epic 1 | Bottom sheet mobile |
| UX-DR14 | Epic 1 | États vides explicites |
| FR-3 | Epic 2 | Vitrine pro sans prix pour visiteurs non authentifiés |
| FR-4 | Epic 2 | Fiches techniques produits B2B (DLC, allergènes, conditionnement) |
| FR-5 | Epic 2 | Garanties de service affichées |
| FR-6 | Epic 2 | Demande d'accès Espace pro en 3 étapes |
| FR-7 | Epic 2 | Authentification Partenaire (session persistante, reset password) |
| FR-8 | Epic 2 | Composition et validation de commande B2B |
| FR-9 | Epic 2 | Dashboard Partenaire (historique + rejouer commande) |
| FR-10 | Epic 3 | Hero plein écran DK, FCP < 2s mobile 4G |
| FR-11 | Epic 3 | 4 produits lancement DK avec fiches sensorielles |
| FR-12 | Epic 3 | Commande directe (panier persistant, Stripe, email confirmation) |
| FR-13 | Epic 3 | Livraison (zone 92) + Click & Collect |
| FR-14 | Epic 3 | Compte client DK (commandes, commande plus vite) |
| FR-17 (partiel) | Epic 3 | Compteur social + avis hyper-local (M1) |
| FR-18 | Epic 3 | Teaser brunch + collecte emails liste d'attente |
| UX-DR1 | Epic 3 | CartBar sticky rose/blanc |
| UX-DR2 | Epic 3 | ProductCard bg-white rounded-2xl |
| UX-DR4 | Epic 3 | ModeSelector Click & Collect / Livraison |
| UX-DR5 | Epic 3 | OrderConfirmation post-paiement avec confetti |
| FR-15 | Epic 4 | "Votre habituel ?" — suggestion dernière commande |
| FR-16 | Epic 4 | "Souvent commandé avec..." — suggestions croisées |
| FR-17 (complet) | Epic 4 | Preuve sociale complète (compteur, avis, section labo) |
| UX-DR3 | Epic 4 | HabitualBanner pour clients connectés |
| FR-19 | Epic 5 | Programme de fidélité (récompenses commandes répétées) |
| FR-20 | Epic 5 | Newsletter gourmande mensuelle |
| FR-21 | Epic 5 | Parrainage ami avec code de réduction |
| FR-22 | Epic 6 | Catalogue formules brunch avec contenu et prix |
| FR-23 | Epic 6 | Réservation brunch avec paiement en ligne |

**NFR Coverage :**
- NFR-1 (Mobile-first) : Epic 1 (design system), Epic 3 (commande DK)
- NFR-2 (FCP < 1,5s) : Epic 1 (SSR/SSG), Epic 3 (hero DK)
- NFR-3 (PCI-DSS Stripe) : Epic 1 (Stripe config), Epic 3 (paiement DK), Epic 6 (paiement brunch)
- NFR-4 (RGPD) : Epic 1 (CookieBanner, consentement, /confidentialite)
- NFR-5 (WCAG AA) : Epic 1 (design system), tous les epics (composants)
- NFR-6 (SEO) : Epic 1 (meta tags portail), Epic 2 (pro), Epic 3 (DK), Epic 6 (brunch)
- NFR-7 (99,5% uptime) : Epic 1 (Vercel SLA)

## Epic List

### Epic 1 — Fondations & Portail de marque
**Milestone :** Pré-M1 — bloquant pour tous les autres epics
**Goal :** Initialiser le monorepo, configurer tous les services tiers, créer le design system partagé, et déployer le portail de bifurcation.
**Requirements couverts :** AR-1 à AR-12, FR-1, FR-2, UX-DR6 à UX-DR14

### Epic 2 — Site Pro B2B : vitrine + espace partenaire
**Milestone :** M1
**Goal :** Permettre aux restaurateurs de découvrir l'offre, demander un accès, puis gérer leurs commandes depuis un espace dédié.
**Requirements couverts :** FR-3, FR-4, FR-5, FR-6, FR-7, FR-8, FR-9

### Epic 3 — Dark Kitchen M1 : découverte & commande directe
**Milestone :** M1
**Goal :** Permettre à un particulier de découvrir les desserts DK, composer un panier, payer en ligne et choisir livraison ou click & collect.
**Requirements couverts :** FR-10, FR-11, FR-12, FR-13, FR-14, FR-17 (partiel), FR-18, UX-DR1, UX-DR2, UX-DR4, UX-DR5

### Epic 4 — Dark Kitchen M2 : fidélisation initiale
**Milestone :** M2
**Goal :** Inciter les clients existants à revenir en leur proposant leur commande habituelle et des suggestions croisées.
**Requirements couverts :** FR-15, FR-16, FR-17 (complet), UX-DR3

### Epic 5 — Dark Kitchen M3 : croissance & rétention
**Milestone :** M3
**Goal :** Maximiser la fréquence d'achat et la valeur client via fidélité points, newsletter et parrainage.
**Requirements couverts :** FR-19, FR-20, FR-21

### Epic 6 — Site Brunch M6 : précommandes week-end
**Milestone :** M6
**Goal :** Lancer le site ptitdej avec catalogue brunch et système de réservation avec paiement en ligne.
**Requirements couverts :** FR-22, FR-23

---

## Epic 1 — Fondations & Portail de marque

**Milestone :** Pré-M1 — bloquant pour tous les autres epics
**Goal :** Initialiser le monorepo, configurer tous les services tiers, créer le design system partagé, et déployer le portail de bifurcation.
**Requirements couverts :** AR-1–12, FR-1, FR-2, UX-DR6–14

### Story 1.1 — Initialisation du monorepo Turborepo

As a developer,
I want a Turborepo monorepo with 4 Next.js apps and 2 shared packages,
So that I can develop all 4 sites in one repo with shared configs and components.

**Acceptance Criteria:**

**Given** a new empty repository
**When** the project is initialized with `npx create-turbo@2.9.0`
**Then** the structure exists: `apps/{portail,pro,commande,ptitdej}` and `packages/{ui,config}`
**And** each app runs independently with `turbo dev`
**And** `packages/config` contains `tsconfig.base.json`, `tailwind.config.ts`, and `eslint.config.js` shared across all apps
**And** TypeScript strict mode is enabled in all apps

---

### Story 1.2 — Design system : tokens et typographie

As a developer,
I want the Instant Dessert brand tokens and fonts configured in `packages/ui`,
So that all 4 apps automatically use the correct colors and typography.

**Acceptance Criteria:**

**Given** `packages/ui` is initialized with shadcn/ui
**When** a component uses Tailwind utility classes
**Then** `bg-chocolat` (#2B1A14), `bg-creme` (#FFF7EE), `bg-rose` (#D97773), `bg-caramel` (#C8953E), `bg-blush` (#FCE7E3) are available
**And** shadcn/ui CSS variables are overridden: `--background:#FFF7EE`, `--foreground:#2B1A14`, `--primary:#D97773`, `--accent:#C8953E`, `--muted:#FCE7E3`
**And** Cormorant Garamond (Display/H1/H2) and Montserrat (H3/body/small/caption) are loaded via `next/font` (self-hosted)
**And** all interactive elements have `focus-visible:ring-2 ring-rose ring-offset-2`
**And** `prefers-reduced-motion` disables all CSS animations when set

---

### Story 1.3 — Composants partagés fondamentaux

As a developer,
I want the shared UI components (Logo, CookieBanner, empty states, bottom sheet) built in `packages/ui`,
So that all 4 apps can import them directly without reimplementing.

**Acceptance Criteria:**

**Given** `packages/ui` has the brand tokens from Story 1.2
**When** a component is imported from `@instantdessert/ui`
**Then** `Logo` renders in 3 variants (default, monochrome-clair, monochrome-sombre) at 3 sizes (24/32/48px)
**And** `CookieBanner` shows on first visit, stores choice in `localStorage` (key: `cookie_consent`, values: `accepted`|`refused`), loads Plausible analytics only after acceptance
**And** `CookieBanner` has "Accepter", "Refuser" buttons and a link to `/confidentialite`
**And** all tappable elements have minimum 44×44px touch targets (WCAG 2.5.5)
**And** the `BottomSheet` component renders as a bottom-anchored overlay on mobile (not a centered modal)
**And** empty state components display a message + suggested action (empty cart, empty history, network error)

---

### Story 1.4 — Configuration Supabase (Auth + infrastructure DB)

As a developer,
I want Supabase configured with Auth and the core database infrastructure,
So that authentication and data access work correctly across all 4 apps.

**Acceptance Criteria:**

**Given** a Supabase project is created
**When** the project is configured
**Then** Supabase Auth is enabled with email/password provider
**And** Row Level Security is activated globally on the project
**And** the `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, and `SUPABASE_SERVICE_ROLE_KEY` env vars are documented in `.env.example`
**And** a `packages/config/supabase.ts` client initializer is created and shared across apps
**And** session cookie is configured with `domain=.instantdessert.fr` for cross-subdomain persistence

---

### Story 1.5 — Configuration des services tiers (Stripe, Brevo, Vercel)

As a developer,
I want Stripe, Brevo, and Vercel configured and connected to the monorepo,
So that payment, email, and deployment pipelines are ready for feature development.

**Acceptance Criteria:**

**Given** accounts exist for Stripe, Brevo, and Vercel
**When** the services are configured
**Then** 4 Vercel projects are created (`id-portail`, `id-pro`, `id-commande`, `id-ptitdej`) each pointing to the correct `apps/` root directory on the same GitHub repo
**And** each Vercel project deploys from `main` branch automatically
**And** Stripe API keys (secret + webhook secret) are set as Vercel env vars on `id-commande` only
**And** Brevo API key is set as Vercel env var on `id-commande`, `id-pro`, and `id-ptitdej`
**And** `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` is set on all 4 Vercel projects
**And** all sensitive keys are server-only (not prefixed with `NEXT_PUBLIC_`)
**And** an `.env.example` file documents all required variables without real values

---

### Story 1.6 — Middleware d'authentification Next.js

As a developer,
I want a shared Next.js middleware that checks Supabase session and user role,
So that protected routes are automatically guarded without repeating auth logic per page.

**Acceptance Criteria:**

**Given** a user attempts to access a protected route
**When** the middleware runs
**Then** if no valid Supabase session exists, the user is redirected to the login page
**And** if the user's role does not match the required role for the route, they are redirected to an unauthorized page
**And** public routes (landing, product catalog, /confidentialite) are accessible without session
**And** the middleware is implemented in each app's `middleware.ts` using the shared Supabase client from `packages/config`
**And** the middleware does not block Vercel preview deployments

---

### Story 1.7 — Portail de marque instantdessert.fr

As a visitor,
I want to land on instantdessert.fr and clearly choose between "Je suis restaurateur" or "Commander mes desserts",
So that I am directed to the right experience without confusion.

**Acceptance Criteria:**

**Given** a visitor opens instantdessert.fr on any device
**When** the page loads
**Then** the Instant Dessert logo is displayed using the `Logo` component (variant default, size 48px)
**And** two clearly distinct CTAs are visible: "Je suis restaurateur" (→ `pro.instantdessert.fr`) and "Commander mes desserts" (→ `commande.instantdessert.fr`)
**And** the page uses the crème background, chocolat text, and rose accent colors
**And** Cormorant Garamond is used for the headline, Montserrat for body text
**And** the `CookieBanner` component appears on first visit
**And** the page achieves Lighthouse Performance ≥ 90 and Accessibility ≥ 90 on mobile
**And** Open Graph meta tags are configured (title, description, image) for social sharing
**And** a `/confidentialite` static page exists on the portail

---

## Epic 2 — Site Pro B2B : vitrine + espace partenaire

**Milestone :** M1
**Goal :** Permettre aux restaurateurs de découvrir l'offre, demander un accès, puis gérer leurs commandes depuis un espace dédié.
**Requirements couverts :** FR-3, FR-4, FR-5, FR-6, FR-7, FR-8, FR-9

### Story 2.1 — Catalogue vitrine publique B2B

As a restaurateur non authentifié,
I want to browse the Instant Dessert product catalog with technical sheets but without prices,
So that I can evaluate the offer before requesting access.

**Acceptance Criteria:**

**Given** the `products` table is created with columns: `id`, `nom`, `description`, `prix_b2b`, `prix_b2c`, `categorie`, `actif`, `dlc`, `allergenes`, `conditionnement`
**When** a visitor opens `pro.instantdessert.fr`
**Then** all products with `actif = true` are displayed without showing `prix_b2b`
**And** each product card shows: name, category, DLC, allergens, and packaging (conditionnement)
**And** the 5 Instant Dessert service guarantees are displayed prominently (e.g. fresh daily, no preservatives)
**And** a CTA "Demander un accès Espace Pro" is visible above the fold
**And** RLS policy on `products` allows public SELECT on non-price columns only for unauthenticated users

---

### Story 2.2 — Demande d'accès Espace Pro en 3 étapes

As a restaurateur,
I want to submit a partnership request in 3 steps online,
So that I can get access to the Pro space without needing to make a phone call.

**Acceptance Criteria:**

**Given** the `restaurants` table is created with columns: `id`, `user_id`, `nom`, `adresse`, `telephone`, `statut_validation` (default: `en_attente`)
**When** a restaurateur completes the 3-step form (step 1: contact info, step 2: restaurant info, step 3: confirmation)
**Then** a record is created in `restaurants` with `statut_validation = 'en_attente'`
**And** a Supabase Auth account is created for the restaurateur (email/password)
**And** a confirmation email is sent via Brevo to the restaurateur acknowledging receipt
**And** a notification email is sent via Brevo to the Instant Dessert admin with the request details
**And** the form validates each step before proceeding (required fields, valid email, valid phone)
**And** an error state is shown if submission fails, with a retry option (UX-DR14)

---

### Story 2.3 — Authentification Partenaire (login + reset password)

As a partenaire validé,
I want to log in to my Pro space with my credentials and stay logged in,
So that I can access my dashboard without logging in every time.

**Acceptance Criteria:**

**Given** a partenaire account exists with `statut_validation = 'validé'` in `restaurants`
**When** the partenaire logs in with email and password
**Then** a persistent Supabase session is created (cookie `domain=.instantdessert.fr`)
**And** the partenaire is redirected to their dashboard (`/dashboard`)
**And** if `statut_validation` is `en_attente` or `refusé`, login succeeds but a blocking screen explains the status
**And** a "Mot de passe oublié" link triggers a Supabase password reset email
**And** the reset email link lands on a page where the partenaire can set a new password
**And** the session is protected by the middleware from Story 1.6 (role: `partenaire`)

---

### Story 2.4 — Composition et validation de commande B2B

As a partenaire,
I want to build and confirm an order from the Pro catalog with quantities,
So that Instant Dessert receives my order without requiring a phone call.

**Acceptance Criteria:**

**Given** the `orders_b2b` table (id, restaurant_id, statut, created_at) and `order_items_b2b` table (id, order_id, product_id, quantite) are created with RLS policy "partenaire sees own orders only"
**When** a partenaire selects products with quantities and confirms
**Then** an `orders_b2b` record is created with `statut = 'reçue'`
**And** corresponding `order_items_b2b` records are created for each line item
**And** a confirmation email is sent to the partenaire via Brevo with the order summary
**And** a notification email is sent to the Instant Dessert admin with the full order details
**And** the partenaire sees a success confirmation page with their order number
**And** products display their `prix_b2b` only to authenticated partenaires (RLS enforced)

---

### Story 2.5 — Dashboard Partenaire (historique + rejouer commande)

As a partenaire,
I want to see my past orders and replay a previous one in one click,
So that I can reorder my usual products quickly.

**Acceptance Criteria:**

**Given** a partenaire is authenticated and has at least one past order
**When** they open `/dashboard`
**Then** they see a list of their past orders sorted by date descending, with: order date, status badge, and total item count
**And** each order has a "Rejouer cette commande" button that pre-fills the order form with the same products and quantities
**And** if they have no orders yet, an empty state is shown with a CTA to place the first order (UX-DR14)
**And** the dashboard is accessible without JavaScript (Server Component, SSR)
**And** the page is optimised for desktop (pro site is desktop-first per NFR-1)

---

## Epic 3 — Dark Kitchen M1 : découverte & commande directe

**Milestone :** M1
**Goal :** Permettre à un particulier de découvrir les desserts DK, composer un panier, payer en ligne et choisir livraison ou click & collect.
**Requirements couverts :** FR-10, FR-11, FR-12, FR-13, FR-14, FR-17 (partiel), FR-18, UX-DR1, UX-DR2, UX-DR4, UX-DR5

### Story 3.1 — Accueil DK : hero de marque + preuve sociale

As a visitor to `commande.instantdessert.fr`,
I want to discover the Instant Dessert brand through a full-screen hero before seeing the catalog,
So that I feel the brand's identity and quality before purchasing.

**Acceptance Criteria:**

**Given** a visitor opens `commande.instantdessert.fr` on mobile 4G
**When** the page loads
**Then** a full-screen hero section is the first visible content, with the logo, a brand headline (Cormorant Garamond), and a CTA "Découvrir nos desserts"
**And** First Contentful Paint is < 2s on simulated mobile 4G (Lighthouse)
**And** below the hero, a social proof section displays: a live order counter ("Plus de X commandes livrées"), a section about the lab ("Notre Labo"), and at least 2 local customer reviews
**And** the social proof data is rendered via SSG (static at build time for M1)
**And** Lighthouse Accessibility ≥ 90 on mobile
**And** Open Graph meta tags are configured for sharing on social networks

---

### Story 3.2 — Catalogue produits avec fiches sensorielles

As a visitor,
I want to browse the 4 DK launch products with sensory product sheets,
So that I can choose what to order based on image, description, price, and allergens.

**Acceptance Criteria:**

**Given** the `products` table exists (from Epic 2 Story 2.1) and has at least 4 B2C products with `actif = true`
**When** a visitor scrolls to the catalog section
**Then** each product is rendered using the `ProductCard` component: `bg-white rounded-2xl shadow-sm`, image at 4:3 ratio, 2-line description, `prix_b2c`, allergens
**And** the "+" button on `ProductCard` is `bg-rose rounded-full w-8 h-8` (32×32px) with `aria-label="Ajouter {nom} au panier"`
**And** while products are loading, a skeleton state is shown with `animate-pulse` at the same dimensions as the card
**And** tapping "+" adds the product to the cart and triggers the CartBar bounce animation
**And** products are fetched as a Server Component (SSR) for FCP performance

---

### Story 3.3 — Panier persistant + CartBar

As a customer,
I want my cart to persist across page refreshes and see it summarized at the bottom of the screen,
So that I don't lose my selection when I navigate or accidentally close the tab.

**Acceptance Criteria:**

**Given** a visitor has added at least one product to the cart
**When** they view any page on `commande.instantdessert.fr`
**Then** the `CartBar` is visible sticky at the bottom: `bg-rose text-white rounded-t-2xl sticky bottom-0 z-50`
**And** the CartBar shows item count and total price, with a `bg-white text-rose` "Voir mon panier" button
**And** the CartBar has `aria-label="Panier : {n} article(s), {total}€"` updated dynamically
**And** tapping "+" on any product triggers a bounce animation on the CartBar (disabled when `prefers-reduced-motion` is set)
**And** cart state is persisted in `localStorage` so it survives page refresh
**And** tapping "Voir mon panier" opens a `BottomSheet` with the cart summary and a "Passer commande" CTA
**And** if cart is empty, the CartBar is hidden

---

### Story 3.4 — Checkout : mode de livraison + paiement Stripe

As a customer,
I want to choose between home delivery (zone 92) and click & collect, then pay securely online,
So that I can complete my order without going through a third-party app.

**Acceptance Criteria:**

**Given** the `orders_b2c` table (id, user_id, mode, statut, stripe_payment_id, created_at) and `order_items_b2c` table (id, order_id, product_id, quantite) are created with RLS policy "client sees own orders only"
**When** a customer proceeds to checkout
**Then** a `ModeSelector` component shows 2 cards: "Click & Collect" and "Livraison à domicile (zone 92)", with `border-2 border-rose` on the selected one, implemented as a radiogroup with correct ARIA attributes
**And** if "Livraison" is selected, a delivery address field is shown with postal code validation (must start with 92)
**And** the Stripe Payment Element is embedded (PCI-DSS compliant, no card data touches our server)
**And** on successful Stripe payment, a Server Action creates an `orders_b2c` record with `statut = 'reçue'` and `stripe_payment_id`
**And** a webhook at `/api/stripe/webhook` handles `payment_intent.succeeded` as the authoritative confirmation
**And** the customer is redirected to the confirmation page after successful payment

---

### Story 3.5 — Page de confirmation de commande

As a customer,
I want to see a warm confirmation page after my payment,
So that I know my order was received and I feel good about my purchase.

**Acceptance Criteria:**

**Given** a customer has just completed a successful Stripe payment
**When** they land on `/commande/confirmation`
**Then** the page displays the customer's first name in a personalized headline ("Merci {prénom} !")
**And** a light confetti animation plays on page load (disabled when `prefers-reduced-motion` is set)
**And** focus is programmatically set to the `h1` on load (accessibility — UX-DR5)
**And** the order summary (products ordered, mode, estimated time) is displayed
**And** a confirmation email is sent via Brevo with the order details
**And** the cart is cleared from `localStorage` after confirmation
**And** a CTA "Voir mes commandes" is shown if the customer is logged in

---

### Story 3.6 — Compte client DK (inscription + historique)

As a customer,
I want to create an account and see my past orders,
So that I can order faster next time and track my history.

**Acceptance Criteria:**

**Given** Supabase Auth is configured (from Epic 1 Story 1.4)
**When** a customer creates an account with email/password on `commande.instantdessert.fr`
**Then** a Supabase Auth user is created with `role = 'client'`
**And** they can log in and out with a persistent session
**And** a "Mot de passe oublié" flow sends a Supabase reset email
**And** when authenticated, the customer sees their past orders on `/compte/commandes` sorted by date descending
**And** if they have no orders yet, an empty state is shown with a CTA to start ordering (UX-DR14)
**And** routes `/compte/*` are protected by the middleware (role: `client`)

---

### Story 3.7 — Teaser brunch + collecte liste d'attente

As a visitor to the DK site,
I want to be informed about upcoming brunches and register my interest,
So that I am notified when brunch reservations open.

**Acceptance Criteria:**

**Given** the `waitlist_brunch` table is created with columns: `id`, `email`, `prenom`, `created_at`, with `email` UNIQUE
**When** a visitor fills in the waitlist form (first name + email) and submits
**Then** a record is inserted into `waitlist_brunch`
**And** a confirmation email is sent via Brevo ("Vous êtes sur la liste !")
**And** RGPD: an explicit consent checkbox is required before submission ("J'accepte de recevoir des informations sur les brunchs Instant Dessert")
**And** if the email already exists in `waitlist_brunch`, a friendly message is shown ("Vous êtes déjà sur la liste !")
**And** the form section on the DK homepage is visually distinct (e.g. `bg-blush` section) with a short teaser text about the brunch concept

---

## Epic 4 — Dark Kitchen M2 : fidélisation initiale

**Milestone :** M2
**Goal :** Inciter les clients existants à revenir en leur proposant leur commande habituelle et des suggestions croisées, et compléter la preuve sociale avec des données dynamiques.
**Requirements couverts :** FR-15, FR-16, FR-17 (complet), UX-DR3

### Story 4.1 — "Votre habituel ?" — HabitualBanner

As a returning logged-in customer,
I want to see my last order suggested as soon as I open the DK homepage,
So that I can reorder my usual desserts in one tap without browsing the catalog again.

**Acceptance Criteria:**

**Given** a customer is authenticated and has at least one past `orders_b2c` record
**When** they open `commande.instantdessert.fr`
**Then** a `HabitualBanner` component is displayed above the catalog: `bg-blush rounded-xl`, showing the products from their most recent order
**And** the banner has a "Réajouter" button that pre-fills the cart with all products from the last order at their previous quantities
**And** after tapping "Réajouter", the CartBar updates immediately and the bounce animation plays
**And** if the customer has no order history, the `HabitualBanner` is not rendered (no empty state needed — catalog is shown directly)
**And** the last order is fetched server-side (Server Component) using the authenticated Supabase session

---

### Story 4.2 — Suggestions croisées "Souvent commandé avec..."

As a customer viewing a product,
I want to see what other products are frequently ordered with it,
So that I can discover complementary desserts and build a better order.

**Acceptance Criteria:**

**Given** a customer views a product card or product detail
**When** the page renders
**Then** a "Souvent commandé avec..." section shows up to 3 other products most frequently ordered alongside the current product
**And** the suggestions are calculated by a SQL query aggregating `order_items_b2c` co-occurrence (products appearing in the same `order_id`)
**And** products with fewer than 5 co-occurrences in real orders fall back to a curated static list (no ML required)
**And** each suggested product renders as a compact `ProductCard` with a "+" button that adds directly to cart
**And** if no suggestions exist (new product, no data), the section is hidden with no empty state shown

---

### Story 4.3 — Preuve sociale complète avec compteur dynamique

As a visitor to the DK site,
I want to see a live order count and a complete lab section with real reviews,
So that I trust the brand even more when deciding to order.

**Acceptance Criteria:**

**Given** `orders_b2c` has real data from M1 orders
**When** a visitor opens the homepage
**Then** the order counter in the social proof section shows a live count from `SELECT COUNT(*) FROM orders_b2c WHERE statut != 'reçue'` (confirmed orders only)
**And** the counter is fetched via a Server Component with ISR revalidation every 60 seconds
**And** the "Notre Labo" section is complete: full editorial content (photo, text about the artisan process, sourcing)
**And** at least 4 curated local customer reviews are displayed (stored as static data in the codebase — not user-submitted in M2)
**And** the reviews include customer first name, neighbourhood (e.g. "Boulogne-Billancourt"), and star rating

---

## Epic 5 — Dark Kitchen M3 : croissance & rétention

**Milestone :** M3
**Goal :** Maximiser la fréquence d'achat et la valeur client via programme de fidélité, newsletter mensuelle et parrainage.
**Requirements couverts :** FR-19, FR-20, FR-21

### Story 5.1 — Programme de fidélité par points

As a customer,
I want to earn loyalty points with every order and see my balance in my account,
So that I am rewarded for ordering regularly and motivated to come back.

**Acceptance Criteria:**

**Given** the `fidelite_points` table (id, user_id, points, updated_at) and `fidelite_transactions` table (id, user_id, order_id, points_gagnes, created_at) are created with RLS policies allowing clients to read only their own records
**When** a Stripe `payment_intent.succeeded` webhook is received for an `orders_b2c`
**Then** points are calculated as `floor(order_total_euros)` (1 point = 1€ spent, rounded down)
**And** a `fidelite_transactions` record is created and `fidelite_points.points` is incremented for the customer
**And** the customer's loyalty balance is visible on `/compte` with total points and a history of transactions
**And** a reward tier is displayed: e.g. "10 points = 5€ de réduction sur votre prochaine commande"
**And** at checkout, a customer with ≥ 10 points can choose to redeem them for a Stripe coupon discount
**And** if the order is refunded, a compensating `fidelite_transactions` entry removes the corresponding points

---

### Story 5.2 — Newsletter mensuelle gourmande

As a customer,
I want to subscribe to the Instant Dessert monthly newsletter,
So that I receive recipes, news, and exclusive offers every month.

**Acceptance Criteria:**

**Given** a Brevo newsletter contact list exists for the monthly newsletter
**When** a customer opts in from their account page or a homepage subscription form
**Then** an explicit RGPD consent checkbox is required: "J'accepte de recevoir la newsletter mensuelle d'Instant Dessert"
**And** the customer's email is added to the Brevo newsletter contact list via the Brevo API
**And** a confirmation email is sent via Brevo acknowledging the subscription
**And** every newsletter email sent from Brevo includes a one-click unsubscribe link (RGPD — Brevo handles this natively)
**And** customers can unsubscribe from `/compte/preferences` which calls the Brevo API to remove them from the list
**And** the subscription form is also accessible to non-account visitors on the DK homepage (email-only opt-in)

---

### Story 5.3 — Parrainage ami avec code de réduction

As a customer,
I want to share a unique referral code with a friend and both of us get a discount,
So that I am rewarded for bringing new customers to Instant Dessert.

**Acceptance Criteria:**

**Given** two new tables are created: `referral_codes` (id, user_id, code UNIQUE, created_at) and `referral_uses` (id, referral_code_id, new_user_id, order_id, created_at)
**When** a logged-in customer opens `/compte/parrainage`
**Then** their unique referral code is generated (if none exists) and displayed with a "Copier le lien" button
**And** the shareable link is `commande.instantdessert.fr?ref={code}`
**When** a new visitor opens the DK site with `?ref={code}` in the URL
**Then** the referral code is stored in `sessionStorage` and applied at account creation
**And** on the new customer's first completed order, a Stripe coupon is applied: 10% discount for the new customer
**And** the referring customer receives 10 loyalty points added to their `fidelite_points` balance
**And** a `referral_uses` record is created linking the code, the new user, and the qualifying order
**And** each referral code can only be used once per new customer (duplicate use is silently ignored)

---

## Epic 6 — Site Brunch M6 : précommandes week-end

**Milestone :** M6
**Goal :** Lancer le site ptitdej.instantdessert.fr avec catalogue brunch et système de réservation avec paiement en ligne.
**Requirements couverts :** FR-22, FR-23

### Story 6.1 — Catalogue formules brunch

As a visitor to `ptitdej.instantdessert.fr`,
I want to browse the brunch formulas with their full content and prices,
So that I can choose the right formula for my group before booking.

**Acceptance Criteria:**

**Given** the `brunch_formulas` table is created with columns: `id`, `nom`, `description`, `contenu`, `prix_par_personne`, `image_url`, `actif`
**When** a visitor opens `ptitdej.instantdessert.fr`
**Then** all active formulas are displayed with: name, photo, full content list, price per person, and a "Réserver" CTA
**And** the page uses the Instant Dessert design tokens (Cormorant Garamond headline, crème background, rose accents)
**And** the `CookieBanner` is shown on first visit
**And** a `/confidentialite` static page exists on the ptitdej app
**And** the page is SSG-rendered (no auth needed to browse)
**And** Lighthouse Performance ≥ 90 and Accessibility ≥ 90 on mobile

---

### Story 6.2 — Réservation brunch avec paiement en ligne

As a customer,
I want to book a brunch formula for the following weekend with online payment,
So that my spot is confirmed immediately without needing to call.

**Acceptance Criteria:**

**Given** the `brunch_reservations` table is created with columns: `id`, `formula_id`, `user_id` (nullable), `date_brunch`, `nombre_personnes`, `statut` (default: `en_attente`), `stripe_payment_id`, `created_at`
**When** a customer clicks "Réserver" on a formula
**Then** they can choose a date (next weekend only — Saturdays and Sundays for the upcoming week) and the number of persons
**And** total price is calculated dynamically: `prix_par_personne × nombre_personnes`
**And** payment is processed via Stripe (same PCI-DSS pattern as Epic 3 Story 3.4)
**And** on successful payment, a `brunch_reservations` record is created with `statut = 'en_attente'`
**And** a confirmation email is sent via Brevo with: formula name, date, time, number of persons, location, total paid
**And** a notification email is sent to the Instant Dessert admin with the full reservation details
**And** the customer lands on a confirmation page with their booking summary
**And** a webhook at `/api/stripe/webhook` on the ptitdej app handles `payment_intent.succeeded` as the authoritative confirmation
