# QA Checklist — Story 1.5 : Configuration Stripe, Brevo, Vercel

> Validation uniquement par build TypeScript — pas d'UI à vérifier.

---

## 1. Build TypeScript — 4/4 sans erreur

- [ ] `npx turbo build` → **"4 successful, 4 total"**

---

## 2. Packages créés

- [ ] `packages/stripe/src/index.ts` — exporte `getStripe()` (client singleton server-side)
- [ ] `packages/email/src/index.ts` — exporte `getEmailClient()` (Brevo transactionnel)

---

## 3. Variables d'environnement complètes

- [ ] `.env.example` à la racine contient les sections Supabase, Stripe, Brevo, Plausible, URL
- [ ] Chaque `.env.local` d'app contient les mêmes clés (valeurs vides)
- [ ] Les `.env.local` ne sont pas committés (vérifier `git status`)

---

## Résultat attendu

| Check | Statut |
|---|---|
| turbo build 4/4 | ⬜ |
| packages/stripe et packages/email créés | ⬜ |
| .env.example complet | ⬜ |

**Quand tous les points sont cochés → Story 1.5 validée ✅ → passer à Story 1.6**
