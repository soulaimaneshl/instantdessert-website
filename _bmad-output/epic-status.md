# Statut des Epics — Instant Dessert (Plan BMAD officiel)

## Vue d'ensemble

| Epic | Titre | Milestone | Statut | Stories |
|---|---|---|---|---|
| Epic 1 | Fondations & Portail | Pré-M1 | ✅ Done | 1.1 → 1.7 |
| Epic 2 | Site Pro B2B | M1 | ✅ Done | 2.1→2.5 ✅ |
| Epic 3 | Dark Kitchen M1 | M1 | ✅ Done | 3.1→3.7 ✅ |
| Epic 4 | Dark Kitchen M2 — Fidélisation | M2 | ✅ Done | 4.1 ✅ · 4.2 ✅ · 4.3 ✅ |
| Epic 5 | Dark Kitchen M3 — Croissance | M3 | ⬜ À faire | 5.1 ❌ · 5.2 ❌ · 5.3 ❌ |
| Epic 6 | Site Brunch M6 | M6 | ⬜ À faire | 6.1 ❌ · 6.2 ❌ |

---

## Détail par story

### Epic 1 ✅ — Fondations & Portail (7/7)
| Story | Titre | Statut |
|---|---|---|
| 1.1 | Initialisation monorepo Turborepo | ✅ |
| 1.2 | Design system tokens & typographie | ✅ |
| 1.3 | Composants partagés (Logo, CookieBanner…) | ✅ |
| 1.4 | Configuration Supabase | ✅ |
| 1.5 | Configuration Stripe, Brevo, Vercel | ✅ |
| 1.6 | Middleware authentification Next.js | ✅ |
| 1.7 | Portail de marque instantdessert.fr | ✅ |

### Epic 2 ✅ — Site Pro B2B (5/5)
| Story | Titre | Statut |
|---|---|---|
| 2.1 | Catalogue vitrine publique B2B | ✅ |
| 2.2 | Demande d'accès Espace Pro 3 étapes | ✅ |
| 2.3 | Authentification Partenaire | ✅ |
| 2.4 | Composition et validation commande B2B | ✅ |
| 2.5 | Dashboard Partenaire (historique + rejouer commande) | ✅ (apps/pro/app/commandes/page.tsx) |

### Epic 3 ⚠️ — Dark Kitchen M1 (6/7)
| Story | Titre | Statut |
|---|---|---|
| 3.1 | Accueil DK : hero de marque + preuve sociale | ✅ (preuve sociale statique) |
| 3.2 | Catalogue produits avec fiches sensorielles | ✅ |
| 3.3 | Panier persistant + CartBar | ✅ |
| 3.4 | Checkout : livraison + paiement Stripe | ✅ |
| 3.5 | Page de confirmation de commande | ✅ |
| 3.6 | Compte client DK (inscription + historique) | ✅ |
| 3.7 | Teaser brunch + collecte liste d'attente | ✅ |

### Epic 4 ✅ — Dark Kitchen M2 Fidélisation (3/3)
| Story | Titre | Statut |
|---|---|---|
| 4.1 | "Votre habituel ?" — HabitualBanner | ✅ |
| 4.2 | "Souvent commandé avec..." suggestions croisées | ✅ (statique pairings) |
| 4.3 | Preuve sociale compteur commandes dynamique | ✅ |

### Epic 5 ⬜ — Dark Kitchen M3 Croissance (0/3)
| Story | Titre | Statut |
|---|---|---|
| 5.1 | Programme de fidélité par points | ❌ À faire |
| 5.2 | Newsletter mensuelle Brevo + RGPD | ❌ À faire |
| 5.3 | Parrainage ami avec code de réduction | ❌ À faire |

### Epic 6 ⬜ — Site Brunch M6 (0/2)
| Story | Titre | Statut |
|---|---|---|
| 6.1 | Catalogue formules brunch (ptitdej) | ❌ À faire |
| 6.2 | Réservation brunch avec paiement Stripe | ❌ À faire |

---

## Bonus — Fait en plus (hors plan BMAD, mais utile en prod)
| Réalisé | Description |
|---|---|
| Admin back-office | Dashboard, gestion catalogue, gestion commandes (portail/admin) |
| Analytics GA4 | Composant partagé `<Analytics />`, actif si `NEXT_PUBLIC_GA_ID` |
| SEO & Open Graph | Title templates, OG tags, generateMetadata dynamique fiches produit |
| Performance & sécurité | Security headers, poweredByHeader false, viewport themeColor |
| Config Vercel | `vercel.json` par app pour monorepo |
| Migrations Supabase | 5 migrations SQL (produits, restaurants, orders B2B, orders B2C, admin RLS) |

---

## Prochaines priorités recommandées
1. **Story 5.1** — Programme fidélité par points
2. **Story 5.2** — Newsletter Brevo + RGPD
3. **Story 5.3** — Parrainage avec code de réduction
4. **Epic 6** — Site brunch ptitdej (Milestone M6)
