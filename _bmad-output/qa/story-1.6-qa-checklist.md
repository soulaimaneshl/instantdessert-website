# QA Checklist — Story 1.6 : Auth Middleware Next.js

> Validation par build TypeScript — pas d'UI à vérifier (pas encore de pages /connexion).

---

## 1. Build TypeScript — 4/4 sans erreur

- [ ] `npx turbo build` → **"4 successful, 4 total"**
- [ ] Les builds affichent `ƒ Proxy (Middleware)` (confirme que le middleware est détecté)

---

## 2. Middleware créé dans chaque app

- [ ] `apps/portail/middleware.ts` — session refresh uniquement (portail public)
- [ ] `apps/commande/middleware.ts` — protège `/compte`, `/commandes`, `/panier/paiement`
- [ ] `apps/pro/middleware.ts` — tout protégé sauf `/connexion` et `/inscription`
- [ ] `apps/ptitdej/middleware.ts` — protège `/compte`, `/commandes`

---

## 3. Helper partagé

- [ ] `packages/supabase/src/middleware.ts` exporte `updateSession()`
- [ ] Export ajouté dans `packages/supabase/package.json` (`"./middleware"`)

---

## Résultat attendu

| Check | Statut |
|---|---|
| turbo build 4/4 | ⬜ |
| Middleware détecté dans les 4 apps | ⬜ |
| updateSession partagé | ⬜ |

**Quand tous les points sont cochés → Story 1.6 validée ✅ → passer à Story 1.7**
