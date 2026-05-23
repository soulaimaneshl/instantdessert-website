# QA Checklist — Story 3.4 : Authentification client B2C

> Lance `npm run dev` depuis la racine
> Page à tester → `http://localhost:3002`

---

## 1. Page connexion (`/connexion`)

- [ ] Logo + lien "← Continuer mes achats" dans le header
- [ ] Formulaire email + mot de passe
- [ ] Lien "Oublié ?" → `/mot-de-passe-oublie`
- [ ] Lien "Créer un compte" → `/inscription`
- [ ] Bouton "Se connecter" rose, pleine largeur
- [ ] Message d'erreur si identifiants incorrects
- [ ] Redirect vers `/catalogue` après connexion (ou `?next=` si présent)
- [ ] Si déjà connecté → redirect automatique

---

## 2. Page inscription (`/inscription`)

- [ ] Formulaire prénom + email + mot de passe (8 car. min)
- [ ] Lien "Se connecter" → `/connexion`
- [ ] Validation côté client : mdp < 8 car. → message d'erreur
- [ ] Après soumission → écran "Vérifiez votre boîte mail"
- [ ] Si déjà connecté → redirect automatique

---

## 3. Page mot de passe oublié (`/mot-de-passe-oublie`)

- [ ] Formulaire email
- [ ] Après soumission → message "Email envoyé !"
- [ ] Lien "Retour à la connexion"

---

## 4. Header connecté/déconnecté

- [ ] Non connecté → lien "Se connecter" visible dans la nav
- [ ] Connecté → "Bonjour, {Prénom}" + bouton "Déconnexion"
- [ ] Déconnexion → redirect vers `/` et header revient à l'état déconnecté

---

## 5. Panier → Commande

- [ ] Bouton "Passer la commande →" redirige vers `/connexion?next=/panier/paiement`
- [ ] Après connexion → redirect vers `/panier/paiement` (page 404 pour l'instant, normal)

---

## Résultat attendu

| Check | Statut |
|---|---|
| Connexion fonctionnelle | ⬜ |
| Inscription + email confirmation | ⬜ |
| Mot de passe oublié | ⬜ |
| Header dynamique connecté/déco | ⬜ |
| Flux panier → connexion → checkout | ⬜ |

**Quand tous les points sont cochés → Story 3.4 validée ✅ → passer à Story 3.5**
