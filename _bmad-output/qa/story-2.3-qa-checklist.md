# QA Checklist — Story 2.3 : Authentification Partenaire

> Lance `npm run dev` depuis la racine
> - Portail → `http://localhost:3000`
> - Page à tester → `http://localhost:3001/connexion`

---

## 1. Page de connexion

- [ ] Logo en haut à gauche, lien vers `/`
- [ ] Titre "Espace Partenaire" en Cormorant Garamond
- [ ] Champs Email + Mot de passe avec labels
- [ ] Lien **"Mot de passe oublié ?"** à droite du label mot de passe
- [ ] Lien **"Demander un accès"** en bas du formulaire
- [ ] Bouton "Se connecter" → **44px minimum**

---

## 2. Validation connexion

- [ ] Email ou mot de passe incorrect → message d'erreur rouge "Email ou mot de passe incorrect."
- [ ] Champs vides + submit → champs `required` bloquent la soumission (natif)
- [ ] Pendant l'envoi → bouton affiche "Connexion..." et est désactivé

---

## 3. Mot de passe oublié (`/mot-de-passe-oublie`)

- [ ] Page accessible via le lien depuis `/connexion`
- [ ] Champ email + bouton "Envoyer le lien"
- [ ] **Sans Supabase configuré** : une erreur s'affiche (attendu)
- [ ] **Avec Supabase** : message de succès "Un lien a été envoyé à [email]..."
- [ ] Lien "← Retour à la connexion" fonctionnel

---

## 4. Dashboard (`/dashboard`)

- [ ] Accéder à `http://localhost:3001/dashboard` **sans être connecté** → redirige vers `/connexion` (middleware)
- [ ] **Sans Supabase** : la redirection vers `/connexion` fonctionne correctement
- [ ] Le dashboard affiche l'écran "En attente de validation" pour les nouveaux partenaires
- [ ] Bouton "Se déconnecter" visible dans le header

---

## 5. Accessibilité

- [ ] `autoComplete="email"` et `autoComplete="current-password"` sur les champs (aide le gestionnaire de mots de passe)
- [ ] Tous les boutons ≥ 44px

---

## Résultat attendu

| Check | Statut |
|---|---|
| Page connexion complète | ⬜ |
| Lien mot de passe oublié | ⬜ |
| Dashboard protégé par middleware | ⬜ |
| Bouton déconnexion | ⬜ |

**Quand tous les points sont cochés → Story 2.3 validée ✅ → passer à Story 2.4**
