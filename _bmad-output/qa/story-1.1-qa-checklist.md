# QA Checklist — Story 1.1 : Initialisation du monorepo Turborepo

> Coche chaque point avant de valider la story et passer à la suivante.

---

## 1. Structure du projet

- [ ] Le dossier `apps/` contient exactement 4 sous-dossiers : `portail`, `pro`, `commande`, `ptitdej`
- [ ] Le dossier `packages/` contient exactement 2 sous-dossiers : `ui`, `config`
- [ ] `turbo.json` existe à la racine
- [ ] `package.json` racine contient `"workspaces": ["apps/*", "packages/*"]`

---

## 2. Build Turborepo (depuis la racine du projet)

Lance : `npx turbo build`

- [ ] Les 4 apps affichent **"✓ Compiled successfully"**
- [ ] La ligne finale affiche **"4 successful, 4 total"** — aucune erreur
- [ ] Un dossier `.next/` est créé dans chaque app après le build

---

## 3. Dev en local — chaque app sur son port

Lance chaque commande dans un terminal séparé :

```bash
npm run dev --workspace=apps/portail    # → http://localhost:3000
npm run dev --workspace=apps/pro        # → http://localhost:3001
npm run dev --workspace=apps/commande   # → http://localhost:3002
npm run dev --workspace=apps/ptitdej    # → http://localhost:3003
```

- [ ] `localhost:3000` s'ouvre et affiche **"Instant Dessert — Portail"**
- [ ] `localhost:3001` s'ouvre et affiche **"Instant Dessert — Espace Pro"**
- [ ] `localhost:3002` s'ouvre et affiche **"Instant Dessert — Commander"**
- [ ] `localhost:3003` s'ouvre et affiche **"Instant Dessert — Brunch"**
- [ ] Aucune erreur rouge dans la console navigateur sur aucune des 4 apps

---

## 4. TypeScript strict

- [ ] `packages/config/tsconfig.base.json` contient `"strict": true`
- [ ] **Test d'erreur volontaire** : ajoute `const x: number = "texte"` dans `apps/portail/app/page.tsx`, lance `npx turbo build --filter=@instantdessert/portail` → le build doit **échouer** avec une erreur TypeScript
- [ ] Retire la ligne de test → le build repasse vert ✅

---

## 5. Packages partagés liés correctement

- [ ] Ouvre `apps/portail/tsconfig.json` → contient `"extends": "@instantdessert/config/tsconfig/nextjs"`
- [ ] `@instantdessert/ui` est listé dans les `dependencies` de chaque `apps/*/package.json`
- [ ] `@instantdessert/config` est listé dans les `devDependencies` de chaque app

---

## 6. Tailwind CSS v4

- [ ] Chaque app a un fichier `postcss.config.mjs` avec `'@tailwindcss/postcss': {}`
- [ ] Chaque `app/globals.css` contient `@import "tailwindcss"`
- [ ] **Test visuel** : ajoute `<p className="bg-red-500 text-white p-4">Test Tailwind</p>` dans `apps/portail/app/page.tsx` → la balise apparaît avec un fond rouge dans le navigateur
- [ ] Retire la ligne de test après confirmation ✅

---

## Résultat attendu

| Check | Statut |
|---|---|
| Structure dirs | ⬜ |
| turbo build 4/4 | ⬜ |
| Dev apps 4 ports | ⬜ |
| TypeScript strict | ⬜ |
| Packages liés | ⬜ |
| Tailwind v4 | ⬜ |

**Quand tous les points sont cochés → Story 1.1 validée ✅ → passer à Story 1.2**
