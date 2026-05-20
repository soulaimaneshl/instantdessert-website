---
stepsCompleted: [1, 2, 3, 4]
selected_approach: 'ai-recommended'
techniques_used: ['assumption-reversal', 'cross-pollination', 'solution-matrix']
ideas_generated: [22]
session_active: false
workflow_completed: true
inputDocuments: ['docs/business_plan_instant_dessert_revise.docx', 'docs/charte_graphique_instant_dessert.pdf']
session_topic: 'Architecture et stratégie des deux sites web Instant Dessert (B2B restaurants + Dark Kitchen particuliers)'
session_goals: 'Définir la structure, les fonctionnalités, le positionnement et la stratégie digitale pour deux sites distincts sous un seul domaine (instantdessert.fr)'
selected_approach: ''
techniques_used: []
ideas_generated: []
context_file: 'docs/business_plan_instant_dessert_revise.docx'
---

# Brainstorming Session — Instant Dessert

**Date:** 2026-05-20
**Projet:** instantdessert.fr

## Session Overview

**Topic:** Architecture et stratégie des deux sites web Instant Dessert
**Goals:** Définir la structure, les fonctionnalités, le positionnement et la stratégie digitale pour deux sites distincts sous un seul domaine

### Context Guidance (from business plan)

- **Deux audiences radicalement différentes :**
  - B2B : restaurateurs professionnels → ton pro, catalogue, fiabilité, contact commercial
  - B2C (dark kitchen) : particuliers pressés d'un dessert → ton gourmand, visuel, UX rapide vers Uber Eats/Deliveroo
- **Un seul domaine acheté :** instantdessert.fr → décision d'architecture critique
- **Identité visuelle forte :** palette crème/chocolat/rose poudré/caramel, typographies serif + sans-serif, logo fouet
- **Priorité business M1 :** le B2B restaurants est le premier levier de CA
- **Dark kitchen :** produits très visuels pistache/kunefe/chocolat, combos, optimisés pour algorithmes Uber Eats

### Session Setup

Brainstorming facilité avec les documents sources (business plan + charte graphique).

---

## Technique Selection

**Approche :** AI-Recommended
**Techniques :** Assumption Reversal → Cross-Pollination → Solution Matrix

---

## Phase 1 — Assumption Reversal : Idées retenues

| # | Idée | Décision |
|---|---|---|
| 1 | Détection contextuelle auto (un site adaptatif) | ❌ Rejeté — complexité injustifiée, audiences non time-based |
| 2 | **Portail de bifurcation `instantdessert.fr`** | ✅ Retenu |
| 3 | **`pro.instantdessert.fr` — espace pro sécurisé avec commande B2B** | ✅ Retenu |
| 4 | **Interface de commande B2B (catalogue + quantités + "rejouer")** | ✅ Retenu |
| 5 | **`commande.instantdessert.fr` — e-commerce direct, plateformes secondaires** | ✅ Retenu |
| 6 | **Lancement carte resserrée 4 produits + click & collect** | ✅ Retenu |
| 7 | **UX immersive — "Instant" comme promesse (3 clics max, countdown)** | ✅ Retenu |
| 8 | **Fidélisation propriétaire (compte, newsletter, parrainage)** | ✅ Retenu |
| 9 | **Ponts cross-sites (restaurants B2B visibles côté B2C)** | ✅ Retenu |
| 10 | **Liste d'attente brunch intégrée dès M1** | ✅ Retenu |
| 11 | **`ptitdej.instantdessert.fr` — sous-domaine brunch M6** | ✅ Retenu |
| 12 | Coming soon page avant lancement | ❌ Rejeté — perte de temps |

**Produits lancement dark kitchen définis :** riz b-laben, boisson maison, croissant fourré, crêpes.

---

## Phase 2 — Cross-Pollination : Idées retenues

| # | Source | Idée | Décision |
|---|---|---|---|
| 13 | Deliveroo/Taster | **Fiche produit sensorielle (hero image, 2 lignes, allergènes discrets)** | ✅ Retenu |
| 14 | Deliveroo/Taster | **Photos "en coupe/explosion" — brief photographe** | ✅ Retenu |
| 15 | SaaS B2B | **Onboarding restaurant 3 étapes, compte actif en 2 min** | ✅ Retenu |
| 16 | SaaS B2B | **Dashboard restaurant simple (commandes, historique, "rejouer")** | ✅ Retenu |
| 17 | Pierre Hermé / Ladurée | **Page d'accueil sans catalogue — émotion d'abord** | ✅ Retenu |
| 18 | Pierre Hermé | Nomenclature poétique des produits | ❌ Rejeté — noms descriptifs préférés |
| 19 | Starbucks | **"Votre habituel ?" — commande mémorisée 1 clic** | ✅ Retenu |
| 20 | Starbucks | **Notifications intelligentes contextualisées** | ✅ Retenu |
| 21 | Airbnb | **Avis hyper-locaux + compteur commandes 92** | ✅ Retenu |
| 22 | Airbnb | **Section "Notre labo" — 3 photos transparence** | ✅ Retenu |
| 23 | Netflix | Filtres émotionnels (envie/vite/partager) | ❌ Rejeté — catégories classiques préférées |
| 24 | Netflix | **"Souvent commandé avec..." — suggestions croisées** | ✅ Retenu |
| 25 | Transgourmet | **Garanties visibles en haut du site pro (DLC, horaires, remplacement)** | ✅ Retenu |
| 26 | Transgourmet | **Fiche produit B2B technique (poids, DLC, allergènes, photo plat)** | ✅ Retenu |

---

## Phase 3 — Solution Matrix

### `instantdessert.fr` — Portail de marque

| Fonctionnalité | Priorité | Complexité |
|---|---|---|
| Landing bifurcation (2 chemins : Pro / Commander) | M1 | Simple |
| Charte graphique plein écran, logo, phrase de marque | M1 | Simple |
| Navigation vers les 3 sous-domaines | M1 | Simple |

---

### `pro.instantdessert.fr` — B2B Restaurants

| Fonctionnalité | Priorité | Complexité |
|---|---|---|
| Vitrine publique : produits, garanties, kit dégustation | M1 | Simple |
| Garanties visibles en haut (DLC, livraison, remplacement) | M1 | Simple |
| Fiches produits B2B techniques (poids, DLC, allergènes, photo plat) | M1 | Simple |
| Formulaire de demande d'accès pro | M1 | Simple |
| Onboarding restaurant 3 étapes (compte autonome en 2 min) | M1 | Moyen |
| Interface de commande (catalogue + quantités + validation) | M1 | Moyen |
| Dashboard simple (commandes, historique, "rejouer") | M2 | Moyen |
| Restaurants partenaires affichés sur le site dark kitchen | M3 | Simple |

---

### `commande.instantdessert.fr` — Dark Kitchen Particuliers

| Fonctionnalité | Priorité | Complexité |
|---|---|---|
| Page d'accueil immersive (image plein écran, émotion d'abord) | M1 | Moyen |
| 4 produits phares au lancement (riz b-laben, boisson, croissant, crêpe) | M1 | Simple |
| Photos "en coupe/explosion" — brief photographe inclus | M1 | Simple |
| Fiches produits sensorielles (hero image, 2 lignes, allergènes discrets) | M1 | Moyen |
| Catégories classiques | M1 | Simple |
| Commande directe : panier + paiement en ligne | M1 | Complexe |
| Click & collect + livraison directe | M1 | Complexe |
| Compte client + historique commandes | M1 | Moyen |
| Teasing brunch + liste d'attente email | M1 | Simple |
| "Votre habituel ?" — repassage 1 clic | M2 | Moyen |
| "Souvent commandé avec..." — suggestions croisées | M2 | Simple |
| Avis hyper-locaux + compteur commandes 92 | M2 | Simple |
| Section "Notre labo" — 3 photos transparence | M2 | Simple |
| Programme fidélité discret (après X commandes) | M3 | Moyen |
| Newsletter gourmande (coulisses, nouveautés) | M3 | Simple |
| Parrainage "Offre un instant" | M3 | Moyen |
| Notifications intelligentes contextualisées | M3 | Complexe |

---

### `ptitdej.instantdessert.fr` — Brunchs (lancement M6)

| Fonctionnalité | Priorité | Complexité |
|---|---|---|
| Site dédié brunch (même charte, ton week-end/matinal) | M6 | Moyen |
| Formules box (simple, duo, premium) | M6 | Simple |
| Précommandes week-end | M6 | Moyen |
| Options upsell (matcha latte, pistache, etc.) | M6 | Simple |

---

## Décisions d'architecture clés

1. **4 domaines** : `instantdessert.fr` (portail) + `pro.` + `commande.` + `ptitdej.`
2. **Commande directe** sur le site dark kitchen — Uber Eats/Deliveroo en canal secondaire
3. **Espace pro sécurisé** avec prix réservés aux comptes restaurants validés
4. **UX immersive** sur le site dark kitchen — pas utilitaire, désirable
5. **Noms descriptifs** pour tous les produits (pas de nomenclature poétique)
6. **Horaires fixes** — pas de gestion de créneaux en temps réel
7. **Catégories classiques** — pas de filtres émotionnels

## Prochaines étapes recommandées

1. **Créer le PRD** pour chaque site (`/bmad-prd`)
2. **Définir l'architecture technique** — stack web, système de commande, paiement (`/bmad-create-architecture`)
3. **Brief photographe** — 4 produits "en coupe", labo, équipe
4. **UX Design** pour `commande.instantdessert.fr` en priorité (`/bmad-create-ux-design`)
