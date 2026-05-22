# QA Checklist — Story 1.2 : Design system — tokens et typographie

> Lance `npm run dev --workspace=apps/portail` pour tester visuellement.

---

## 1. Tokens de couleur Tailwind

Modifie temporairement `apps/portail/app/page.tsx` pour tester chaque couleur :

```tsx
export default function Page() {
  return (
    <main className="p-8 space-y-4">
      <div className="bg-chocolat text-creme p-4">bg-chocolat + text-creme</div>
      <div className="bg-creme text-chocolat p-4 border border-chocolat">bg-creme</div>
      <div className="bg-rose text-white p-4">bg-rose</div>
      <div className="bg-caramel text-white p-4">bg-caramel</div>
      <div className="bg-blush text-chocolat p-4">bg-blush</div>
    </main>
  )
}
```

- [ ] `bg-chocolat` affiche un fond marron foncé (#2B1A14)
- [ ] `bg-creme` affiche un fond crème (#FFF7EE)
- [ ] `bg-rose` affiche un fond rose poudré (#D97773)
- [ ] `bg-caramel` affiche un fond caramel doré (#C8953E)
- [ ] `bg-blush` affiche un fond blush rosé (#FCE7E3)
- [ ] Le fond de `<body>` est crème et le texte est chocolat (même sans classes explicites)

---

## 2. Typographie

Toujours dans `page.tsx`, remplace par :

```tsx
export default function Page() {
  return (
    <main className="p-8 space-y-4 bg-creme">
      <h1 className="font-display text-4xl text-chocolat">Titre en Cormorant Garamond</h1>
      <p className="font-body text-base text-chocolat">Texte en Montserrat</p>
    </main>
  )
}
```

- [ ] Le `h1` s'affiche en **Cormorant Garamond** (police serif élégante)
- [ ] Le `p` s'affiche en **Montserrat** (police sans-serif moderne)
- [ ] Dans l'onglet Réseau du navigateur (DevTools → Network → filtre "Font"), les polices sont chargées depuis **ton propre domaine** (localhost) et non depuis fonts.googleapis.com (next/font les auto-héberge)

---

## 3. Focus visible

```tsx
<main className="p-8 space-y-4">
  <button className="bg-rose text-white px-4 py-2 rounded">Bouton test</button>
  <a href="#" className="text-rose underline">Lien test</a>
</main>
```

- [ ] Appuie sur **Tab** → le bouton reçoit le focus et affiche un **ring rose** autour (ring-2 ring-rose ring-offset-2)
- [ ] Appuie sur **Tab** à nouveau → le lien reçoit le même ring rose
- [ ] Le ring n'apparaît PAS au clic souris (uniquement au clavier)

---

## 4. prefers-reduced-motion

- [ ] Dans les DevTools Chrome (F12 → Rendering → "Emulate CSS media feature prefers-reduced-motion" → "reduce"), toutes les animations doivent être désactivées
- [ ] Remet "No emulation" pour revenir à l'état normal

---

## 5. Variables shadcn/ui

Dans DevTools → Inspect → `<html>` ou `<body>` → Computed → cherche `--background` :

- [ ] `--background` vaut `#FFF7EE`
- [ ] `--foreground` vaut `#2B1A14`
- [ ] `--primary` vaut `#D97773`
- [ ] `--accent` vaut `#C8953E`
- [ ] `--muted` vaut `#FCE7E3`

---

## 6. Build de vérification

- [ ] Retire les modifications de test dans `page.tsx` (revenir à `<h1>Instant Dessert — Portail</h1>`)
- [ ] Lance `npx turbo build` → **"4 successful, 4 total"** sans erreur

---

## Résultat attendu

| Check | Statut |
|---|---|
| 5 tokens couleur Tailwind | ⬜ |
| Cormorant Garamond affiché | ⬜ |
| Montserrat affiché | ⬜ |
| Polices auto-hébergées (pas Google CDN) | ⬜ |
| Focus ring clavier visible | ⬜ |
| prefers-reduced-motion fonctionne | ⬜ |
| CSS vars shadcn/ui présentes | ⬜ |
| turbo build 4/4 | ⬜ |

**Quand tous les points sont cochés → Story 1.2 validée ✅ → passer à Story 1.3**
