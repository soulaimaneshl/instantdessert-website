# QA Checklist — Story 1.3 : Composants partagés fondamentaux

> Lance `npm run dev --workspace=apps/portail` → ouvre `http://localhost:3000`

---

## 1. Logo — 3 variantes × 3 tailles

- [ ] **Taille 24px** : Logo visible, petit, lisible
- [ ] **Taille 32px** : Logo visible, taille normale
- [ ] **Taille 48px** : Logo visible, grand
- [ ] **variant "default"** : icône et texte en rose (#D97773)
- [ ] **variant "monochrome-clair"** : icône et texte en blanc (sur fond chocolat)
- [ ] **variant "monochrome-sombre"** : icône et texte en chocolat (sur fond chocolat — pour différencier, il a une teinte plus sombre)
- [ ] Le texte "Instant Dessert" s'affiche en Cormorant Garamond (serif)

---

## 2. CookieBanner — apparaît automatiquement

- [ ] À la **première visite** (ou en navigation privée), une bannière noire apparaît en bas de page avec 2 boutons : "Refuser" et "Accepter" + lien "Politique de confidentialité"
- [ ] Clique **"Accepter"** → la bannière disparaît, ne réapparaît pas si tu recharges la page (F5)
- [ ] Ouvre un **onglet de navigation privée** → la bannière réapparaît (localStorage vide)
- [ ] Clique **"Refuser"** → la bannière disparaît également
- [ ] Le lien "Politique de confidentialité" pointe vers `/confidentialite`
- [ ] Les boutons font au moins 44px de hauteur (visuellement confortables)

---

## 3. BottomSheet — overlay bas de page

- [ ] Clique le bouton **"Ouvrir le panier"** → une feuille s'ouvre depuis le bas de l'écran
- [ ] La feuille a un titre "Mon panier" en Cormorant Garamond
- [ ] Un fond semi-transparent (overlay sombre) couvre le reste de la page
- [ ] Clique sur l'**overlay sombre** → la feuille se ferme
- [ ] Clique le bouton **✕** en haut à droite → la feuille se ferme
- [ ] Appuie sur **Échap (Escape)** → la feuille se ferme
- [ ] La feuille est **ancrée en bas** (pas centrée comme une modale)

---

## 4. États vides (EmptyState)

- [ ] **Panier vide** : icône 🛒 + message + bouton "Voir les desserts" visible
- [ ] **Historique vide** : icône 📋 + message + bouton "Commander maintenant" visible
- [ ] **Erreur réseau** : icône ⚡ + message + bouton "Réessayer" visible
- [ ] Les boutons CTA font au minimum 44px de hauteur

---

## 5. Touch targets (WCAG 2.5.5)

Sur mobile (ou en mode responsive des DevTools — F12 → icône mobile) :
- [ ] Tous les boutons sont confortables à tapper (≥ 44×44px)
- [ ] Le bouton "✕" du BottomSheet est facile à toucher

---

## 6. Build final

- [ ] Lance `npx turbo build` → **"4 successful, 4 total"** sans erreur

---

## Résultat attendu

| Check | Statut |
|---|---|
| Logo 3 variantes × 3 tailles | ⬜ |
| CookieBanner 1ère visite | ⬜ |
| CookieBanner persistance localStorage | ⬜ |
| BottomSheet s'ouvre/ferme | ⬜ |
| 3 états vides affichés | ⬜ |
| Touch targets confortables | ⬜ |
| turbo build 4/4 | ⬜ |

**Quand tous les points sont cochés → Story 1.3 validée ✅ → passer à Story 1.4**
