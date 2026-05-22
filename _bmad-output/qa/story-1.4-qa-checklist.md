# QA Checklist — Story 1.4 : Configuration Supabase

> Lance `npx turbo build` depuis la racine du projet.

---

## 1. Build TypeScript — 4/4 sans erreur

- [ ] `npx turbo build` → **"4 successful, 4 total"**
- [ ] Aucune erreur TypeScript dans la console

---

## 2. Package `@instantdessert/supabase` installé

- [ ] Le dossier `packages/supabase/` existe avec `src/client.ts`, `src/server.ts`, `src/types.ts`, `src/index.ts`
- [ ] `packages/supabase/package.json` liste `@supabase/supabase-js` et `@supabase/ssr` comme dépendances

---

## 3. Variables d'environnement

- [ ] Le fichier `.env.example` existe à la racine avec `NEXT_PUBLIC_SUPABASE_URL` et `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- [ ] Chaque app (`apps/portail`, `apps/pro`, `apps/commande`, `apps/ptitdej`) a un fichier `.env.local` (même vide)
- [ ] Les fichiers `.env.local` **ne sont pas** dans git (vérifier `.gitignore`)

---

## 4. Résultat attendu

| Check | Statut |
|---|---|
| turbo build 4/4 | ⬜ |
| Package supabase créé | ⬜ |
| .env.example à la racine | ⬜ |
| .env.local dans chaque app | ⬜ |
| .env.local absent de git | ⬜ |

**Quand tous les points sont cochés → Story 1.4 validée ✅ → passer à Story 1.5**
