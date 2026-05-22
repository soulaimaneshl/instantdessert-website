# QA Checklist — Story 2.1 : Catalogue vitrine publique B2B

> Lance `npm run dev --workspace=apps/pro` → ouvre `http://localhost:3001`

---

## 1. Header

- [ ] Logo Instant Dessert visible en haut à gauche
- [ ] Bouton **"Demander un accès"** visible en haut à droite (fond chocolat, texte crème)
- [ ] Le header reste **sticky** quand tu fais défiler la page

---

## 2. Hero

- [ ] Badge "Espace Professionnels" visible (caramel, lettres en majuscules)
- [ ] Titre en **Cormorant Garamond** : "Des pâtisseries artisanales pour votre carte"
- [ ] *"pour votre carte"* en **italique rose**
- [ ] Sous-titre descriptif en Montserrat grisé
- [ ] 2 CTA : **"Demander un accès Espace Pro"** (rose) + **"Se connecter"** (bordure)

---

## 3. Section Garanties (fond chocolat)

- [ ] Fond **chocolat foncé** sur toute la largeur
- [ ] 5 garanties affichées avec icône + titre + description :
  - 🌅 Préparé chaque matin
  - 🚫 Zéro conservateur
  - 📋 Traçabilité complète
  - 🚚 Livraison en Hauts-de-Seine
  - 💻 Commande 100% en ligne
- [ ] Texte en **crème** sur fond chocolat

---

## 4. Catalogue produits — sans prix

- [ ] **4 produits** affichés en grille (2 colonnes sur desktop)
- [ ] Chaque carte affiche : **catégorie**, **nom**, **description**, **DLC**, **conditionnement**, **allergènes**
- [ ] **Aucun prix** n'est visible (ni B2B, ni B2C)
- [ ] Message sous le catalogue : "Les tarifs B2B sont accessibles après validation..."
- [ ] Cartes blanches avec bordure blush et hover shadow

---

## 5. Accessibilité

- [ ] Les boutons CTA font au moins **44px de hauteur**
- [ ] Les métadonnées produit utilisent des balises `<dl>/<dt>/<dd>` (structure sémantique)

---

## Résultat attendu

| Check | Statut |
|---|---|
| Header sticky avec logo + CTA | ⬜ |
| Hero avec titre et 2 CTA | ⬜ |
| 5 garanties sur fond chocolat | ⬜ |
| 4 produits sans prix | ⬜ |
| Responsive mobile | ⬜ |

**Quand tous les points sont cochés → Story 2.1 validée ✅ → passer à Story 2.2**
