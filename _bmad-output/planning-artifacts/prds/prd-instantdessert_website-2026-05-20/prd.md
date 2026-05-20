---
title: "Instant Dessert — PRD"
status: draft
created: 2026-05-20
updated: 2026-05-20
---

# PRD: Instant Dessert — Présence digitale complète

## 0. Document Purpose

Ce PRD est destiné aux 3 associés d'Instant Dessert, aux prestataires techniques (développeurs, designers) et aux workflows BMAD aval (architecture, UX, epics). Il couvre la conception de 4 sites web distincts sous un seul domaine (`instantdessert.fr`), correspondant aux 3 activités du laboratoire artisanal : B2B restaurants, dark kitchen particuliers, et brunchs (M6). Les décisions d'architecture et les hypothèses issues de la session brainstorming du 2026-05-20 sont intégrées directement — ce PRD n'en est pas la répétition mais le contrat fonctionnel.

---

## 1. Vision

Instant Dessert est un laboratoire artisanal de desserts basé dans les Hauts-de-Seine (92), opérant sur trois segments complémentaires : fourniture B2B de desserts aux restaurants, dark kitchen grand public via commande directe et plateformes de livraison, et brunchs en précommande week-end (à partir de M6). Chaque segment adresse une audience et un parcours d'achat radicalement différents — ce qui exige des expériences digitales distinctes, unifiées par une identité de marque forte et cohérente.

La présence digitale d'Instant Dessert doit accomplir trois choses simultanément : convertir les restaurateurs en partenaires B2B récurrents, transformer les particuliers en clients fidèles de la dark kitchen avec commande directe (évitant les 25–30 % de commission des plateformes), et construire l'audience brunch avant même son lancement. Le tout sur un seul domaine acheté — `instantdessert.fr` — exploité via 4 sous-domaines autonomes.

La marque se positionne comme premium accessible : ni luxe froid, ni fast-food criard. L'univers visuel (crème, chocolat profond, rose poudré, caramel doré) et le ton de communication (gourmand, direct, chaleureux) doivent traverser les 4 sites de façon immédiatement reconnaissable, avec des adaptations de ton pour chaque audience.

---

## 2. Target Users

### 2.1 Personas

**Persona A — Le restaurateur partenaire**
Gérant ou chef d'un restaurant dans le 92. Cherche des desserts fiables, réguliers, avec DLC garantie, sans avoir à produire en interne. Décide vite, commande souvent les mêmes produits, n'a pas le temps de naviguer dans un système complexe. Accède au site depuis un ordinateur le matin avant le service.

**Persona B — Le particulier pressé (dark kitchen)**
Habitant du 92, 20–40 ans. Envie soudaine d'un dessert premium le soir ou le week-end. Commande depuis son téléphone. Connaît Uber Eats mais préfère commander directement si l'expérience est aussi simple. Sensible au visuel — une belle photo convertit mieux qu'une description.

**Persona C — Le client brunch week-end**
Couple ou groupe d'amis cherchant une expérience sucrée-salée le samedi matin dans le 92. Précommande à l'avance, partage l'expérience sur les réseaux. Découvre Instant Dessert via le bouche-à-oreille ou Instagram.

### 2.2 Jobs To Be Done

**Persona A (restaurateur) :**
- Commander des desserts en quantité précise, de façon récurrente, sans friction
- Vérifier les DLC, allergènes, et conditionnements sans appeler
- Accéder à son historique de commandes et re-commander rapidement
- S'inscrire comme partenaire sans attendre un rappel commercial

**Persona B (particulier DK) :**
- Commander un dessert de qualité livré en moins de 30 min, ou à récupérer
- Découvrir la marque et avoir envie de commander avant même d'avoir vu les prix
- Retrouver ses commandes habituelles facilement lors d'une revisite
- Partager l'expérience (packaging instagrammable, confirmation de marque)

**Persona C (client brunch) :**
- Précommander une formule brunch week-end pour un groupe
- Choisir parmi des options claires (simple, duo, premium)
- Être notifié du lancement et des disponibilités

### 2.3 Non-Users (v1)

- Clients en dehors du 92 [ASSUMPTION: la livraison est limitée au 92 au lancement]
- Grossistes alimentaires ou centrales d'achat (B2B ≠ grande distribution)
- Restaurants souhaitant commander moins de 5 unités par semaine (seuil minimal B2B à définir)

### 2.4 User Journeys

**UJ-1. Le restaurateur découvre et s'inscrit en espace pro.**
- **Persona + contexte :** Gérant d'un restaurant à Boulogne-Billancourt, cherche un fournisseur de desserts B2B.
- **Entry state :** Non authentifié, arrive sur `instantdessert.fr` via recherche Google ou carte de visite.
- **Chemin :** Portail → clic "Vous êtes restaurateur ?" → `pro.instantdessert.fr` → vitrine publique avec produits et garanties → formulaire d'inscription pro en 3 étapes → confirmation email → validation manuelle par Instant Dessert → accès espace pro.
- **Climax :** Le restaurateur reçoit ses identifiants et peut voir les prix B2B et commander.
- **Résolution :** Compte pro actif, première commande possible immédiatement.
- **Edge case :** Si le restaurateur n'est pas validé sous 24h, email automatique de confirmation de réception de la demande.

**UJ-2. Le restaurateur passe sa commande hebdomadaire.**
- **Persona + contexte :** Restaurateur partenaire, commande chaque lundi matin.
- **Entry state :** Authentifié, accède à `pro.instantdessert.fr`.
- **Chemin :** Dashboard → "Rejouer ma dernière commande" → vérification quantités → modification si besoin → validation → confirmation reçue par email.
- **Climax :** Commande enregistrée en moins de 2 minutes.
- **Résolution :** Commande visible dans l'historique, produits livrés selon les horaires convenus.

**UJ-3. Le particulier commande son dessert depuis le canapé.**
- **Persona + contexte :** Particulière, 28 ans, Issy-les-Moulineaux, 21h un vendredi.
- **Entry state :** Non authentifiée, arrive sur `commande.instantdessert.fr` via Instagram ou Google.
- **Chemin :** Page d'accueil immersive → scroll découverte des 4 produits → fiche produit croissant fourré pistache → ajout panier → choix livraison ou click & collect → création de compte rapide (email + mot de passe) → paiement Stripe → confirmation.
- **Climax :** Écran de confirmation avec message de marque et estimation de livraison.
- **Résolution :** Commande en cours, notification à la livraison. Compte créé pour futures commandes.
- **Edge case :** Si zone de livraison hors périmètre, proposition automatique du click & collect.

**UJ-4. Le client régulier re-commande en 1 clic.**
- **Persona + contexte :** Client existant, veut re-commander son riz b-laben habituel.
- **Entry state :** Authentifié, arrive sur `commande.instantdessert.fr`.
- **Chemin :** Accueil → "Votre habituel ? Riz b-laben + Boisson maison" → confirmation en 1 clic → paiement avec carte enregistrée → validation.
- **Climax :** Commande passée en moins de 30 secondes.
- **Résolution :** Commande confirmée, livraison en route.

**UJ-5. Le futur client brunch s'inscrit sur liste d'attente.**
- **Persona + contexte :** Couple cherchant une idée de brunch week-end, découvre Instant Dessert via la dark kitchen.
- **Entry state :** Sur `commande.instantdessert.fr`, voit le teaser brunch.
- **Chemin :** Section teaser brunch → "Être prévenu en premier" → saisie email → confirmation inscription.
- **Résolution :** Email enregistré, notification automatique au lancement M6.

---

## 3. Glossaire

- **Portail** — La landing page `instantdessert.fr`, point d'entrée unique qui oriente vers les 3 sous-domaines selon l'audience.
- **Site pro** — `pro.instantdessert.fr`, site B2B dédié aux restaurants partenaires, avec espace sécurisé.
- **Site DK** — `commande.instantdessert.fr`, site dark kitchen dédié aux particuliers avec e-commerce direct.
- **Site brunch** — `ptitdej.instantdessert.fr`, site dédié aux brunchs, lancement M6.
- **Espace pro** — Zone authentifiée du Site pro accessible aux restaurants validés. Contient les prix B2B, le catalogue et l'interface de commande.
- **Partenaire** — Restaurant ayant un compte pro validé par Instant Dessert.
- **Commande directe** — Commande passée sur le Site DK avec paiement en ligne, sans intermédiaire de plateforme.
- **Click & collect** — Commande en ligne retirée au laboratoire selon des créneaux horaires fixes.
- **Produits lancement DK** — Les 4 produits disponibles dès M1 sur le Site DK : riz b-laben, boisson maison, croissant fourré, crêpes.
- **Catalogue pro** — L'ensemble des produits B2B disponibles à la commande dans l'Espace pro (cheesecake, tiramisu, mousse au chocolat, boissons).
- **DLC** — Date limite de consommation, information critique pour les partenaires restaurateurs.
- **Kit dégustation** — Offre d'échantillons proposée aux restaurants avant signature d'un partenariat.

---

## 4. Features

### 4.1 Portail — `instantdessert.fr`

**Description :** Landing page ultra-épurée qui constitue la porte d'entrée de la marque. Son seul rôle est d'orienter l'utilisateur vers le bon sous-domaine en moins de 10 secondes. Elle n'est pas un site à part entière — c'est une page de marque avec deux chemins explicites. Réalise UJ-1, UJ-3.

**Functional Requirements :**

#### FR-1 : Bifurcation d'audience
Le visiteur peut choisir entre deux chemins distincts depuis la page d'accueil du Portail.

**Conséquences testables :**
- La page affiche deux zones cliquables distinctes : "Vous êtes restaurateur ?" et "Vous voulez commander ?"
- Chaque clic redirige vers le sous-domaine correspondant (pro. ou commande.)
- Aucun contenu produit n'est affiché sur cette page

#### FR-2 : Identité de marque complète
La page applique intégralement la charte graphique Instant Dessert.

**Conséquences testables :**
- Logo principal affiché en position centrale
- Palette crème/chocolat/rose poudré respectée
- Une phrase de marque visible (ex. "La douceur, maintenant.")
- Lien discret vers `ptitdej.instantdessert.fr` visible (brunch)

---

### 4.2 Site pro — `pro.instantdessert.fr`

**Description :** Site B2B en deux couches. Une vitrine publique consultable sans compte, qui présente les produits, les garanties et la démarche partenariat. Un Espace pro sécurisé réservé aux Partenaires validés, avec catalogue complet, prix B2B, interface de commande et historique. Réalise UJ-1, UJ-2.

**Functional Requirements :**

#### FR-3 : Vitrine publique pro
Un visiteur non authentifié peut consulter la présentation de l'offre B2B sans voir les prix.

**Conséquences testables :**
- Page produits avec fiches (cheesecake, tiramisu, mousse au chocolat, boissons) sans prix affichés
- Section garanties visible : DLC minimale garantie, horaires de livraison, politique de remplacement
- Kit dégustation commandable via formulaire de contact
- Appel à l'action "Devenir partenaire" visible sur toutes les pages

#### FR-4 : Fiches produits B2B
Chaque produit du Catalogue pro dispose d'une fiche technique accessible publiquement.

**Conséquences testables :**
- Chaque fiche affiche : nom du produit, poids/grammage, conditionnement (nb unités/barquette), DLC minimale garantie, allergènes complets, photo du produit servi en assiette de restaurant
- Les prix n'apparaissent pas sur les fiches publiques

#### FR-5 : Garanties visibles
Les engagements de service Instant Dessert sont affichés de façon proéminente sur la vitrine.

**Conséquences testables :**
- Section dédiée affiche a minima : délai de livraison dans le 92, DLC garantie, procédure de remplacement en cas de problème
- Positionnée en haut de la page d'accueil pro, visible sans scroll sur desktop

#### FR-6 : Onboarding Partenaire
Un restaurateur peut créer une demande d'accès Espace pro en 3 étapes, sans appel téléphonique.

**Conséquences testables :**
- Formulaire en 3 écrans : (1) Nom du restaurant, adresse, téléphone, email, (2) Fréquence de commande estimée, produits d'intérêt, (3) Récapitulatif + validation
- Confirmation email envoyée immédiatement après soumission
- Email de notification envoyé à Instant Dessert avec les données du restaurant
- Si non validé sous 24h, email automatique "demande en cours d'examen" envoyé au restaurant

#### FR-7 : Espace pro sécurisé — authentification
Un Partenaire validé peut accéder à son Espace pro avec ses identifiants.

**Conséquences testables :**
- Connexion par email + mot de passe
- Session persistante (pas de reconnexion à chaque visite sur le même appareil)
- Réinitialisation de mot de passe par email
- Accès impossible sans validation manuelle préalable par Instant Dessert

#### FR-8 : Interface de commande B2B
Le Partenaire peut composer et valider une commande depuis l'Espace pro.

**Conséquences testables :**
- Catalogue affiche tous les produits disponibles avec prix B2B, unités minimum, et dispo
- Chaque produit dispose d'un champ quantité (saisie numérique ou +/−)
- Panier récapitulatif visible à tout moment
- Validation de commande envoie un email de confirmation au Partenaire et une notification à Instant Dessert
- Aucun paiement en ligne requis [ASSUMPTION: la facturation B2B est gérée hors ligne (virement, chèque) au lancement]

#### FR-9 : Dashboard Partenaire
Le Partenaire accède à un tableau de bord simple après connexion.

**Conséquences testables :**
- Affiche : dernière commande avec statut, bouton "Rejouer cette commande", historique des 5 commandes précédentes
- Encart "Nouveauté du mois" ou produit mis en avant
- Accès direct à l'interface de commande en 1 clic

---

### 4.3 Site DK — `commande.instantdessert.fr`

**Description :** Site e-commerce de la dark kitchen destiné aux particuliers. Expérience immersive et désirable — l'entrée se fait par l'émotion de marque, pas par le catalogue. Commande directe avec paiement en ligne, livraison et click & collect. Fidélisation via compte client. Réalise UJ-3, UJ-4, UJ-5.

**Functional Requirements :**

#### FR-10 : Page d'accueil immersive
Le visiteur découvre la marque avant le catalogue.

**Conséquences testables :**
- Hero plein écran avec image produit et phrase de marque
- Bouton unique "Commander" ou "Voir la carte" — pas de menu complexe en haut
- Le catalogue apparaît au scroll, pas immédiatement
- Temps de chargement < 2s sur mobile 4G

#### FR-11 : Catalogue produits lancement
Les 4 Produits lancement DK sont présentés avec fiches sensorielles.

**Conséquences testables :**
- Chaque produit dispose : d'une image "en coupe" ou "explosion" plein cadre, d'une description en 2 lignes maximum dans le ton de marque, du prix TTC, des allergènes affichés discrètement, d'un bouton "Ajouter au panier"
- Catégories classiques (ex. Desserts, Boissons) visibles
- Aucun filtre émotionnel

#### FR-12 : Commande directe avec paiement en ligne
Le visiteur peut acheter sans passer par Uber Eats ou Deliveroo.

**Conséquences testables :**
- Panier persistant (survie à la fermeture du navigateur)
- Paiement sécurisé par carte bancaire (Stripe ou équivalent PCI-DSS)
- Confirmation de commande envoyée par email immédiatement
- Page de confirmation affiche : récapitulatif commande, estimation délai, message de marque chaleureux

#### FR-13 : Modes de livraison
Le client choisit entre livraison à domicile et click & collect.

**Conséquences testables :**
- Deux options présentées lors du checkout : Livraison (zone 92 [ASSUMPTION]) / Click & collect (adresse du labo)
- Si adresse de livraison hors zone, message d'erreur clair avec proposition automatique du click & collect
- Horaires de livraison et click & collect affichés (créneaux fixes, pas en temps réel)

#### FR-14 : Compte client
Le client peut créer un compte pour retrouver ses commandes et commander plus vite.

**Conséquences testables :**
- Création de compte par email + mot de passe (ou création à la volée lors du checkout)
- Historique des commandes accessible
- Adresse de livraison sauvegardée
- Carte bancaire enregistrable pour future commande rapide (via Stripe)
- Réinitialisation de mot de passe par email

#### FR-15 : "Votre habituel ?" — commande rapide
Le client connecté voit sa dernière commande en suggestion dès l'accueil.

**Conséquences testables :**
- Si le client est authentifié et a au moins une commande passée, un encart "Votre habituel ?" affiche le dernier produit commandé avec bouton "Recommander"
- Le bouton ajoute directement au panier sans retourner à la fiche produit
- Disponible à partir de M2

#### FR-16 : "Souvent commandé avec..."
Des suggestions croisées sont proposées sur chaque fiche produit.

**Conséquences testables :**
- Section "Souvent commandé avec" affiche 1 à 2 suggestions basées sur les combinaisons réelles de commandes
- Disponible à partir de M2 (nécessite suffisamment de données de commandes)

#### FR-17 : Preuve sociale hyper-locale
Le Site DK affiche des éléments de confiance orientés localement.

**Conséquences testables :**
- Compteur de commandes livrées (ex. "48 commandes dans le 92 cette semaine") visible sur la page d'accueil — mis à jour manuellement ou automatiquement
- Section avis clients avec prénom + ville (ex. "Sarah, Boulogne-Billancourt ★★★★★")
- Section "Notre labo" avec 3 photos : labo, équipe, produits en préparation

#### FR-18 : Teasing brunch + liste d'attente
Le Site DK annonce les brunchs et collecte des emails avant M6.

**Conséquences testables :**
- Section visible sur la page d'accueil ou dans le footer dès M1 : "Les brunchs arrivent — être prévenu en premier"
- Formulaire de capture email (prénom + email)
- Email de confirmation d'inscription envoyé au visiteur
- Base d'emails exportable pour campagne au lancement M6

#### FR-19 : Programme de fidélité (M3)
Le client est récompensé pour ses commandes répétées.

**Conséquences testables :**
- Après X commandes [ASSUMPTION: seuil à définir, ex. 5], le client reçoit un avantage (réduction, produit offert) sans carte de fidélité physique ni interface criarde
- L'avantage est mentionné discrètement dans l'espace client

#### FR-20 : Newsletter gourmande (M3)
Le client peut s'abonner à une newsletter éditoriale.

**Conséquences testables :**
- Formulaire d'inscription newsletter distinct du teasing brunch
- Fréquence mensuelle [ASSUMPTION]
- Contenu : nouveautés, coulisses du labo, produits saisonniers

#### FR-21 : Parrainage (M3)
Le client peut parrainer un ami avec un code de réduction.

**Conséquences testables :**
- Espace client affiche un code parrainage unique
- Le code donne une réduction à l'ami et un avantage au parrain sur sa prochaine commande [ASSUMPTION: montants à définir]

---

### 4.4 Site brunch — `ptitdej.instantdessert.fr` (lancement M6)

**Description :** Site dédié aux brunchs week-end. Même charte graphique qu'Instant Dessert, ton adapté (chaleureux, matinal, convivial). Axé sur les formules box et les précommandes. Réalise UJ-5.

**Functional Requirements :**

#### FR-22 : Présentation des formules brunch
Le visiteur consulte les formules disponibles avec contenu et prix.

**Conséquences testables :**
- Affiche a minima 3 formules : Simple (14,90–17,90 €), Box duo (29,90–34,90 €), Premium (19,90–24,90 €)
- Chaque formule détaille son contenu (boissons, desserts, toppings)
- Options upsell listées (matcha latte, supplément pistache, etc.)

#### FR-23 : Précommande brunch
Le client peut réserver une formule pour le week-end suivant.

**Conséquences testables :**
- Sélection de la formule + date de récupération (créneaux week-end fixes)
- Paiement en ligne lors de la précommande
- Email de confirmation avec récapitulatif et instructions de récupération
- Délai de précommande minimum [ASSUMPTION: 24h avant le créneau]

---

## 5. Non-Goals (Explicit)

- Pas de marketplace multi-fournisseurs — Instant Dessert est le seul producteur
- Pas de gestion de créneaux en temps réel (dispo en direct) au lancement
- Pas de paiement B2B en ligne au lancement — facturation hors ligne
- Pas d'application mobile native (les 4 sites sont responsive/PWA-ready)
- Pas de gestion des stocks en temps réel côté client [NON-GOAL pour MVP]
- Pas de programme de fidélité gamifié (points, niveaux, badges)
- Pas de blog ou contenu éditorial long format au lancement
- Pas de livraison en dehors du 92 au lancement [ASSUMPTION]
- Pas d'intégration automatique avec Uber Eats / Deliveroo (les plateformes restent des canaux séparés gérés manuellement)

---

## 6. MVP Scope

### 6.1 In Scope — M1 (lancement)

- Portail `instantdessert.fr` avec bifurcation (FR-1, FR-2)
- Site pro vitrine + onboarding Partenaire + espace pro authentifié + interface de commande B2B + dashboard simple (FR-3 à FR-9)
- Site DK : page d'accueil immersive, 4 produits lancement, commande directe, paiement en ligne, livraison + click & collect, compte client, teaser brunch + liste d'attente (FR-10 à FR-14, FR-17 partiel, FR-18)

### 6.2 In Scope — M2/M3

- "Votre habituel ?" (FR-15) — M2
- "Souvent commandé avec..." (FR-16) — M2
- Preuve sociale complète : compteur + avis + section labo (FR-17 complet) — M2
- Programme fidélité (FR-19) — M3
- Newsletter (FR-20) — M3
- Parrainage (FR-21) — M3

### 6.3 In Scope — M6

- Site brunch `ptitdej.instantdessert.fr` (FR-22, FR-23)

### 6.4 Out of Scope pour MVP

- Paiement B2B en ligne (facturation hors ligne au lancement)
- Gestion des stocks en temps réel
- Notifications push mobiles
- Application mobile native
- Livraison hors 92
- Intégration API Uber Eats / Deliveroo

---

## 7. Success Metrics

**Primaires**

- **SM-1 : Partenaires B2B actifs** — Nombre de restaurants ayant passé au moins une commande par semaine via l'Espace pro. Cible : 5 à M1, 15 à M12. Valide FR-6, FR-8.
- **SM-2 : Commandes DK directes** — Nombre de commandes passées sur `commande.` par semaine. Cible : 30/semaine à M3, 80/semaine à M6. Valide FR-12.
- **SM-3 : Taux de repeat DK** — % de clients ayant commandé 2 fois ou plus dans le mois. Cible : > 30 % à M3. Valide FR-14, FR-15.

**Secondaires**

- **SM-4 : Emails brunch collectés** — Nombre d'inscrits sur liste d'attente avant M6. Cible : 200 emails. Valide FR-18.
- **SM-5 : Panier moyen DK** — Valeur moyenne d'une commande directe. Cible : > 12 € (supérieur au panier plateforme moyen pour compenser absence de commission). Valide FR-16.
- **SM-6 : Taux de conversion Espace pro** — % de demandes d'accès pro aboutissant à une commande dans les 7 jours. Cible : > 60 %. Valide FR-6, FR-7.

**Counter-metrics (à ne pas optimiser)**

- **SM-C1 : Taux d'abandon commande DK** — Ne pas l'optimiser en réduisant les étapes de sécurité de paiement ou en supprimant la création de compte. L'UX doit rester fluide sans sacrifier la collecte de données client. Contre-balance SM-2.
- **SM-C2 : Volume de produits B2B** — Ne pas pousser trop de références au lancement pour optimiser SM-1. La qualité et la régularité priment sur la largeur du catalogue. Contre-balance SM-1.

---

## 8. Open Questions

1. **Zone de livraison exacte** — Quelles communes du 92 sont couvertes au lancement ? (impacte FR-13)
2. **Seuil minimum de commande B2B** — Quelle quantité minimale par commande pour les partenaires ? (impacte FR-8)
3. **Paiement B2B futur** — À quel mois envisage-t-on le paiement en ligne B2B ? (impacte FR-8)
4. **Seuil programme fidélité** — Combien de commandes avant récompense, et quelle récompense ? (impacte FR-19)
5. **Parrainage** — Montants de la réduction parrain / filleul ? (impacte FR-21)
6. **Délai minimum précommande brunch** — 24h ? 48h ? (impacte FR-23)
7. **Hébergement et tech stack** — Aucune décision prise dans ce PRD — voir workflow Architecture.
8. **Gestionnaire de livraisons** — La livraison directe est-elle gérée par le dirigeant seul ou via un prestataire tiers ? (impacte FR-13)

---

## 9. Assumptions Index

- **[ASSUMPTION §2.3]** — La livraison est limitée au 92 au lancement.
- **[ASSUMPTION §FR-8]** — La facturation B2B est gérée hors ligne (virement, chèque) au lancement. Pas de paiement en ligne côté pro en MVP.
- **[ASSUMPTION §FR-13]** — La zone de livraison DK couvre tout ou partie du 92.
- **[ASSUMPTION §FR-19]** — Seuil programme fidélité : 5 commandes (à confirmer).
- **[ASSUMPTION §FR-20]** — Fréquence newsletter : mensuelle.
- **[ASSUMPTION §FR-21]** — Montants de réduction parrainage à définir par les associés.
- **[ASSUMPTION §FR-23]** — Délai minimum précommande brunch : 24h.

---

## Annexe A — Esthétique & Ton

**Palette couleur (stricte, aucune substitution) :**
- `#2B1A14` Chocolat profond — textes principaux, fonds premium
- `#FFF7EE` Crème vanille — fond dominant (60 % de la surface)
- `#D97773` Rose poudré — boutons, séparateurs, détails (10 %)
- `#C8953E` Caramel doré — étoiles, touches premium, jamais dominant (5 %)
- `#FCE7E3` Blush très clair — arrière-plans secondaires

**Typographies :**
- Titres : Cormorant Garamond ou Playfair Display (serif élégante, chocolat profond)
- Corps, labels, prix : Montserrat ou Poppins (sans-serif moderne)
- Maximum 2 typographies dans tout le projet

**Ton de communication :**
- Court, chaleureux, gourmand, direct — jamais corporate
- Exemples validés : "Un dessert, tout de suite." / "La douceur du moment." / "Fait pour les envies soudaines."
- Ton adapté par site : pro (fiable, professionnel) / DK (désirable, spontané) / brunch (cosy, convivial)

**Direction photo :**
- Fonds crème, beige ou marbre clair
- Lumière naturelle ou douce
- Photos "en coupe" ou "explosion" pour les produits DK
- Gros plans textures : chocolat fondu, crème, toppings
- Photos labo : naturelles, pas mises en scène de façon excessive

**À éviter absolument :**
- Rose fluo, violet, bleu dans l'identité principale
- Fonds surchargés ou filtres saturés
- Illustrations cartoon ou mascotte
- Plus de 2 typographies
- Logo déformé ou ombres portées lourdes

---

## Annexe B — Architecture de l'information

**Hiérarchie des 4 sites :**

```
instantdessert.fr (portail)
├── pro.instantdessert.fr
│   ├── Vitrine publique (produits, garanties, kit dégustation)
│   ├── Devenir partenaire (onboarding 3 étapes)
│   └── Espace pro (authentifié)
│       ├── Dashboard (historique, "rejouer")
│       └── Commander (catalogue + quantités)
├── commande.instantdessert.fr
│   ├── Accueil immersif
│   ├── Carte (4 produits M1, extension progressive)
│   ├── Panier + Checkout
│   ├── Mon compte (historique, adresse, "votre habituel")
│   └── [Footer] Teaser brunch
└── ptitdej.instantdessert.fr (M6)
    ├── Formules brunch
    └── Précommande
```

---

## Annexe C — NFRs Cross-Cutting

- **Mobile-first** : les 3 sites (portail, DK, brunch) sont conçus mobile d'abord. Le site pro peut être desktop-first (restaurateurs commandent le matin sur ordinateur).
- **Performance** : First Contentful Paint < 1,5s sur mobile 4G. Temps de chargement total < 3s.
- **Sécurité paiement** : conformité PCI-DSS via Stripe (aucune donnée carte stockée côté serveur).
- **RGPD** : consentement explicite avant collecte email (liste d'attente, newsletter, compte). Politique de confidentialité accessible depuis toutes les pages.
- **Accessibilité** : contraste minimum WCAG AA sur toute la palette (à vérifier notamment crème/rose poudré).
- **SEO** : chaque sous-domaine optimisé indépendamment. Balises Open Graph pour partage social sur le site DK.
- **Disponibilité** : objectif 99,5 % uptime (pas d'exigence enterprise, mais indisponibilité = commandes perdues).

---

## Annexe D — Pourquoi maintenant

Le laboratoire Instant Dessert est opérationnel à M1 avec une pâtissière en CDI, un véhicule réfrigéré, et 5 restaurants prospects en attente de partenariat. Chaque semaine sans site pro est une semaine sans commandes B2B et sans données clients propriétaires. La dark kitchen sur plateformes seules impose 25–30 % de commission et zéro donnée client — un handicap structurel à corriger dès le lancement. Le site est un outil commercial immédiat, pas un projet futur.
