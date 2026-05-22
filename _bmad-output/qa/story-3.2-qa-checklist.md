# QA Checklist — Story 3.2 : Catalogue produits B2C

> Lance `npm run dev` depuis la racine
> - Portail → `http://localhost:3000`
> - Page à tester → `http://localhost:3002/catalogue`

---

## 1. Page catalogue (`/catalogue`)

- [ ] 8 produits affichés en grille (2 colonnes mobile, 3 desktop, 4 xl)
- [ ] Chaque card : catégorie en rose, nom, description courte, prix en caramel
- [ ] Hover sur une card → ombre + bordure rose subtile
- [ ] Lien "← Accueil" fonctionnel

---

## 2. Filtres par catégorie

- [ ] Onglets : "Tout", "Tartes", "Choux", "Chocolat", "Classiques", "Petits gâteaux"
- [ ] Clic sur une catégorie → affiche uniquement les produits correspondants
- [ ] Catégorie active → fond chocolat, texte crème
- [ ] "Tout" → réaffiche les 8 produits

---

## 3. Fiche produit (`/catalogue/1` par exemple)

- [ ] Fil d'Ariane : Accueil / Catalogue / Nom du produit
- [ ] Grande image (placeholder 🧁)
- [ ] Catégorie en rose, titre en Cormorant Garamond
- [ ] Description longue, prix + poids
- [ ] Chips allergènes sur fond blush
- [ ] Bouton "Ajouter au panier" (chocolat, pleine largeur)
- [ ] Bouton "← Continuer mes achats" (bordure)

---

## 4. Section "Souvent dégustés avec"

- [ ] 2 produits suggérés affichés sous la fiche
- [ ] Chaque suggestion : catégorie, nom, description, prix
- [ ] Clic sur une suggestion → navigue vers la fiche du produit suggéré

---

## Résultat attendu

| Check | Statut |
|---|---|
| Catalogue 8 produits + filtres | ⬜ |
| Fiche produit complète | ⬜ |
| Souvent dégustés avec | ⬜ |

**Quand tous les points sont cochés → Story 3.2 validée ✅ → passer à Story 3.3**
