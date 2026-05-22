# QA Checklist — Story 2.2 : Formulaire d'accès Espace Pro en 3 étapes

> Lance `npm run dev --workspace=apps/pro` → ouvre `http://localhost:3001/acces`
> (ou clique "Demander un accès" depuis `http://localhost:3001`)

---

## 1. Page d'accueil du formulaire

- [ ] Header avec Logo + lien "Déjà partenaire ? Se connecter"
- [ ] Titre "Demande d'accès Espace Pro" en Cormorant Garamond
- [ ] Sous-titre "3 étapes — réponse sous 48h"
- [ ] Carte blanche avec bordure blush centrée

---

## 2. Étape 1 — Vos coordonnées

- [ ] **Indicateur d'étapes** visible en haut (1 / 2 / 3), étape 1 surlignée en rose
- [ ] Champs : Prénom, Nom, Email professionnel, Mot de passe, Confirmer le mot de passe
- [ ] Bouton "Continuer →" visible en bas
- [ ] **Validation** : clique "Continuer" sans remplir → messages d'erreur rouge sous chaque champ
- [ ] Email invalide (ex: "abc") → "Email invalide"
- [ ] Mot de passe < 8 caractères → "Minimum 8 caractères"
- [ ] Mots de passe différents → "Les mots de passe ne correspondent pas"
- [ ] Formulaire valide → passe à l'étape 2

---

## 3. Étape 2 — Votre restaurant

- [ ] Indicateur d'étapes : étape 1 cochée (✓ chocolat), étape 2 en rose
- [ ] Champs : Nom du restaurant, Adresse, Téléphone
- [ ] Bouton "Retour" + bouton "Continuer →"
- [ ] Téléphone invalide (ex: "12345") → "Numéro invalide (ex: 06 12 34 56 78)"
- [ ] Formulaire valide → passe à l'étape 3

---

## 4. Étape 3 — Confirmation

- [ ] Récapitulatif de toutes les infos saisies sur fond blush
- [ ] Bouton "Retour" + bouton "Envoyer ma demande" (fond chocolat)
- [ ] Cliquer "Envoyer ma demande" → bouton devient "Envoi en cours..." (désactivé)
- [ ] **Sans Supabase configuré** : une erreur apparaît avec bouton "Réessayer" (comportement attendu)

---

## 5. Accessibilité

- [ ] Tous les boutons font au moins **44px de hauteur**
- [ ] Les labels des champs sont visibles et clairs
- [ ] Les erreurs sont affichées en rouge sous le champ concerné

---

## Résultat attendu

| Check | Statut |
|---|---|
| 3 étapes navigables | ⬜ |
| Validation étape 1 (email, password) | ⬜ |
| Validation étape 2 (téléphone) | ⬜ |
| Récapitulatif étape 3 | ⬜ |
| Boutons ≥ 44px | ⬜ |

**Quand tous les points sont cochés → Story 2.2 validée ✅ → passer à Story 2.3**
