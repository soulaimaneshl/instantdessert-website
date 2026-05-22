# QA Checklist — Story 2.4 : Composition et validation de commande B2B

> Lance `npm run dev` depuis la racine
> - Portail → `http://localhost:3000`
> - Page à tester → `http://localhost:3001/commandes/nouvelle`

---

## 1. Dashboard (partenaire validé)

- [ ] Deux cartes visibles : "Passer une commande" et "Mes commandes"
- [ ] Clic sur "Passer une commande" → redirige vers `/commandes/nouvelle`
- [ ] Clic sur "Mes commandes" → redirige vers `/commandes`

---

## 2. Composition de commande (`/commandes/nouvelle`)

- [ ] Accès sans connexion → redirige vers `/connexion`
- [ ] Titre "Composer une commande" en Cormorant Garamond
- [ ] 4 produits affichés avec nom, catégorie, conditionnement et prix B2B
- [ ] Bouton **−** retire 1 unité (minimum 0, ne passe pas en négatif)
- [ ] Bouton **+** ajoute 1 unité
- [ ] Compteur central mis à jour en temps réel
- [ ] Lien "← Mes commandes" fonctionnel en haut

---

## 3. Barre total flottante

- [ ] Apparaît uniquement quand au moins 1 produit est sélectionné
- [ ] Affiche le nombre de produits et le total en euros
- [ ] Bouton "Voir le récapitulatif →" → passe à l'étape de confirmation
- [ ] Message "Ajoutez des produits..." affiché quand panier vide

---

## 4. Étape de confirmation

- [ ] Liste de tous les produits sélectionnés avec quantité et sous-total
- [ ] Total général affiché en bas
- [ ] Bouton "Modifier" → retour à la composition (quantités conservées)
- [ ] Bouton "Valider la commande" → affiche "Envoi..." pendant la soumission

---

## 5. Page de confirmation (`/commandes/confirmation`)

- [ ] Icône checkmark rose visible
- [ ] Titre "Commande confirmée !"
- [ ] Référence commande affichée (8 caractères en majuscules)
- [ ] Bouton "Passer une nouvelle commande" → `/commandes/nouvelle`
- [ ] Bouton "Voir mes commandes" → `/commandes`
- [ ] **Sans Supabase** : redirige avec `?id=mock` (référence "MOCK")

---

## 6. Historique commandes (`/commandes`)

- [ ] Accès sans connexion → redirige vers `/connexion`
- [ ] **Sans commandes** : message "Aucune commande" + bouton "Passer une commande"
- [ ] **Avec commandes** : liste avec référence, date et statut coloré
- [ ] Bouton "+ Nouvelle commande" en haut à droite
- [ ] Lien "← Dashboard" fonctionnel

---

## Résultat attendu

| Check | Statut |
|---|---|
| Composition avec +/- fonctionnel | ⬜ |
| Barre total flottante | ⬜ |
| Étape confirmation + retour modifier | ⬜ |
| Page confirmation avec référence | ⬜ |
| Historique commandes | ⬜ |

**Quand tous les points sont cochés → Story 2.4 validée ✅ → passer à Story 2.5**
