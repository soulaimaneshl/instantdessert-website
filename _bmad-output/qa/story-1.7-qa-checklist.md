# QA Checklist — Story 1.7 : Portail de marque

> Lance `npm run dev --workspace=apps/portail` → ouvre `http://localhost:3000`

---

## 1. Hero — Logo et accroche

- [ ] Le **Logo** Instant Dessert s'affiche en grand (size 48) avec la couleur rose
- [ ] Le titre s'affiche en **Cormorant Garamond** : "L'art de la pâtisserie, livré à votre porte"
- [ ] Le mot *"livré à votre porte"* est en **italique rose**
- [ ] Le sous-titre en Montserrat apparaît en texte grisé sous le titre
- [ ] Un **séparateur décoratif** (ligne + point rose) est visible entre le hero et les cartes

---

## 2. Cartes destinations — 3 cartes

- [ ] **Carte "Commander"** (particuliers) : point rose, titre, description, bouton rose
- [ ] **Carte "Espace Restaurant"** (professionnels) : point caramel, bouton caramel
- [ ] **Carte "Petit-déjeuner"** (formules matinales) : point blush/rose clair, bouton chocolat
- [ ] Les 3 cartes sont sur **une ligne** sur desktop (écran large)
- [ ] Sur **mobile** (redimensionne la fenêtre), les cartes s'empilent verticalement
- [ ] Chaque carte a un fond blanc avec bordure blush subtile

---

## 3. Interactions

- [ ] Au **survol** d'une carte, la bordure change de couleur (rose / caramel / blush)
- [ ] La carte se **soulève légèrement** au survol (`-translate-y-0.5`)
- [ ] Les boutons CTA font au moins **44px de hauteur**
- [ ] Le lien "Commander" pointe vers `http://localhost:3002`
- [ ] Le lien "Espace Restaurant" pointe vers `http://localhost:3001`
- [ ] Le lien "Petit-déjeuner" pointe vers `http://localhost:3003`

---

## 4. CookieBanner

- [ ] En navigation privée, la **bannière cookie** apparaît en bas de page
- [ ] "Refuser" et "Accepter" fonctionnent correctement

---

## 5. Footer

- [ ] Un footer minimal affiche "© 2026 Instant Dessert · Hauts-de-Seine"

---

## Résultat attendu

| Check | Statut |
|---|---|
| Hero Logo + titre Cormorant Garamond | ⬜ |
| 3 cartes destinations visibles | ⬜ |
| Responsive mobile | ⬜ |
| Hover sur les cartes | ⬜ |
| CookieBanner fonctionne | ⬜ |
| Footer visible | ⬜ |

**Quand tous les points sont cochés → Story 1.7 validée ✅ → Epic 1 terminé !**
