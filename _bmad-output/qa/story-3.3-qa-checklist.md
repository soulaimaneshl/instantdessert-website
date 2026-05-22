# QA Checklist — Story 3.3 : Panier

> Lance `npm run dev` depuis la racine
> - Portail → `http://localhost:3000`
> - Page à tester → `http://localhost:3002/catalogue` puis `/panier`

---

## 1. Ajouter au panier (fiche produit)

- [ ] Bouton "Ajouter au panier — X.XX €" visible sur `/catalogue/1`
- [ ] Clic → bouton passe en vert "✓ Ajouté au panier !" pendant 1,5s
- [ ] Bouton "Voir le panier (N)" apparaît après le premier ajout
- [ ] Icône panier dans le header affiche un badge rouge avec le nombre d'articles

---

## 2. Compteur header

- [ ] Badge rouge sur l'icône panier (nombre d'articles total)
- [ ] Se met à jour en temps réel à chaque ajout
- [ ] Disparaît quand le panier est vide
- [ ] Persistant au rechargement de page (localStorage)

---

## 3. Page panier vide (`/panier` sans articles)

- [ ] Icône panier vide
- [ ] Message "Votre panier est vide"
- [ ] Bouton "Voir le catalogue →"
- [ ] Section "Ces desserts pourraient vous plaire" avec 4 suggestions

---

## 4. Page panier avec articles

- [ ] Liste des articles : emoji, nom, prix unitaire, quantité (+/−), sous-total
- [ ] Bouton − réduit la quantité (supprime si → 0)
- [ ] Bouton + augmente la quantité
- [ ] Bouton "Supprimer" retire l'article
- [ ] Récapitulatif à droite : liste, livraison, total
- [ ] Bouton "Passer la commande →" (rose, pleine largeur)
- [ ] Lien "← Continuer mes achats"

---

## 5. Section "Ces desserts pourraient vous plaire"

- [ ] Affiche uniquement les produits PAS dans le panier
- [ ] Clic sur une suggestion → fiche produit

---

## Résultat attendu

| Check | Statut |
|---|---|
| Ajout panier + badge compteur | ⬜ |
| Panier vide avec suggestions | ⬜ |
| Panier avec articles + récapitulatif | ⬜ |
| Ces desserts pourraient vous plaire | ⬜ |

**Quand tous les points sont cochés → Story 3.3 validée ✅ → passer à Story 3.4**
