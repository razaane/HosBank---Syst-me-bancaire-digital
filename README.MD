# HosBank — Application Bancaire Digitale

Application web bancaire permettant à un client de consulter ses comptes, gérer ses bénéficiaires, effectuer des virements et suivre ses demandes, avec un espace dédié pour les chargés de clientèle et un espace d'administration complet.

## Sommaire

- [Contexte](#contexte)
- [Stack technique](#stack-technique)
- [Architecture](#architecture)
- [Structure du projet](#structure-du-projet)
- [Base de données](#base-de-données)
- [Installation](#installation)
- [Comptes de test](#comptes-de-test)
- [Fonctionnalités par espace](#fonctionnalités-par-espace)
- [Sécurité](#sécurité)
- [Conventions de nommage](#conventions-de-nommage)
- [Travail restant / pistes d'amélioration](#travail-restant--pistes-damélioration)

---

## Contexte

HosBank est une application bancaire web avec trois espaces utilisateurs :

- **Client** : consultation des comptes, virements, bénéficiaires, cartes, demandes diverses, réclamations.
- **Chargé de clientèle** : suivi des clients affectés, traitement des demandes et réclamations.
- **Administrateur** : gestion des utilisateurs, des rôles, affectation clients ↔ chargés, supervision globale.

## Stack technique

| Couche | Technologie |
|---|---|
| Backend | Node.js + Express.js |
| Frontend | EJS + Tailwind CSS (CDN) |
| Base de données | MySQL (driver `mysql2/promise`) |
| Authentification | `express-session` + `bcrypt` |
| Persistance | Requêtes SQL directes (sans ORM), requêtes préparées |
| Autres dépendances | `dotenv`, `uuid` (tokens de vérification email) |

## Architecture

Le projet suit une architecture **N-tiers** stricte. Chaque requête traverse les couches dans cet ordre :

```
routes/  →  controllers/  →  services/  →  repositories/  →  models/ + db
```

| Couche | Rôle |
|---|---|
| `routes/` | Associe une URL + méthode HTTP à une fonction de controller. |
| `controllers/` | Lit `req`/`res`, extrait les données, appelle le service, renvoie la réponse (`res.render` ou `res.redirect`). Ne contient jamais de SQL. |
| `services/` | Contient la logique métier : validations, règles, transactions. |
| `repositories/` | Seule couche autorisée à écrire du SQL. Ne connaît jamais `req`/`res`. |
| `models/` | Classes JS représentant la forme d'une donnée (conversion `snake_case` SQL → `camelCase` JS). |

Les opérations sensibles impliquant plusieurs écritures liées (virement, opposition de carte) utilisent des **transactions SQL** (`beginTransaction` / `commit` / `rollback`) pour garantir l'intégrité des données.

## Structure du projet

```
HosBank/
├── src/
│   ├── config/          # Connexion MySQL (pool mysql2/promise)
│   ├── controllers/      # Un fichier par ressource (client, admin, charge-client, auth)
│   ├── services/
│   ├── repositories/
│   ├── models/
│   ├── routes/
│   ├── middlewares/       # authMiddleware, roleMiddleware
│   ├── views/
│   │   ├── partials/       # head, sidebar (client / charge / admin)
│   │   ├── auth/
│   │   ├── client/
│   │   ├── charge-client/
│   │   └── admin/
│   └── db/
│       └── schema.sql
├── public/               # Fichiers statiques
├── app.js                # Point d'entrée du serveur
├── seed.js               # Script de peuplement de données de test
├── .env                  # Variables d'environnement (non versionné)
└── package.json
```

## Base de données

Schéma relationnel MySQL (`src/db/schema.sql`). Tables principales :

| Table | Description |
|---|---|
| `utilisateurs` | Compte de connexion (email, mot de passe hashé, rôle, statut actif/en attente). |
| `clients` | Infos complémentaires d'un client (adresse, CIN, date de naissance, chargé affecté). |
| `charge_clients` | Infos complémentaires d'un chargé de clientèle (matricule). |
| `comptes_bancaires` | Comptes (courant / épargne), solde, RIB, statut. |
| `cartes` | Cartes physiques/virtuelles liées à un compte. |
| `beneficiaires` | Bénéficiaires enregistrés par un client. |
| `virements` | Historique des virements (montant, motif, statut). |
| `demandes` | Table générique pour carte virtuelle, opposition, renouvellement PIN, ouverture épargne, RIB — le détail spécifique est stocké en JSON dans `donnees_specifiques`. |
| `reclamations` | Réclamations client, traitées par un chargé de clientèle. |
| `commentaire_demandes` | Commentaires d'un chargé de clientèle sur une demande. |
| `historiques_interaction` | Historique des interactions chargé ↔ client. |

**Rôles** (`utilisateurs.role`) : `client`, `charge_client`, `admin`.

### Workflow d'inscription

1. Le client s'inscrit via `/register` (nom, prénom, email, mot de passe, téléphone, CIN, date de naissance, adresse).
2. Le compte est créé avec `actif = FALSE` — connexion refusée tant qu'il n'est pas validé.
3. Un administrateur active le compte depuis `/admin/utilisateurs`.
4. À l'activation, le système crée **automatiquement** le premier compte courant (avec RIB généré) et la première carte physique du client — aucune double création si le client est désactivé puis réactivé.

## Installation

```bash
git clone <repo-url>
cd HosBank
npm install
```

Créer un fichier `.env` à la racine (voir `.env.example`) :

```
PORT=3000
DB_HOST=localhost
DB_USER=...
DB_PASSWORD=...
DB_NAME=hosbank
SESSION_SECRET=...
```

Créer la base et importer le schéma :

```bash
mysql -u <user> -p -e "CREATE DATABASE hosbank;"
mysql -u <user> -p hosbank < src/db/schema.sql
```

Peupler des données de test :

```bash
node seed.js
```

Lancer le serveur :

```bash
node app.js
# ou
npm run dev
```

L'application est accessible sur `http://localhost:3000`.

## Comptes de test

Créés par `seed.js` (mot de passe pour tous : `password123`) :

| Email | Rôle |
|---|---|
| `yassine@test.com` | admin |
| `amine.charge@test.com` | charge_client |
| `salma@test.com` | client |

## Fonctionnalités par espace

### Espace Client
- Authentification (inscription avec activation admin, connexion, vérification email, sessions)
- Tableau de bord avec vue synthétique des soldes
- Consultation des comptes bancaires et des RIB
- Demande d'ouverture de compte d'épargne
- Gestion des bénéficiaires (ajout / liste / suppression)
- Virements avec vérification du solde en transaction + historique
- Consultation des cartes
- Demande de carte virtuelle
- Opposition sur carte (blocage immédiat, transaction atomique)
- Recalcul / renouvellement du PIN
- Suivi générique de l'état de toutes les demandes
- Dépôt et suivi des réclamations
- Gestion du profil (téléphone, email, mot de passe)

### Espace Chargé de Clientèle
- Consultation des clients affectés
- Détail d'un client (comptes, cartes, historique des interactions)
- Traitement des demandes (carte virtuelle, opposition, PIN, épargne, RIB) : changement de statut + commentaire
- Consultation et traitement des réclamations

### Espace Administrateur
- Gestion des utilisateurs et des rôles (client / charge_client / admin)
- Activation des comptes en attente (avec création automatique compte + carte)
- Affectation clients ↔ chargés de clientèle
- Gestion des comptes bancaires et des cartes (changement de statut)
- Consultation des virements, demandes et réclamations globales
- Supervision des chargés de clientèle et statistiques de la plateforme

## Sécurité

- Mots de passe hashés avec `bcrypt`.
- Sessions gérées via `express-session` (secret en `.env`, jamais commité).
- Requêtes SQL exclusivement préparées (`?` + tableau de valeurs) — protection contre les injections SQL.
- Middlewares `authMiddleware` (vérifie la session) et `requireRole(role)` (contrôle d'accès par rôle) sur toutes les routes sensibles.
- Comptes clients inactifs tant qu'ils ne sont pas validés par un administrateur.
- Opérations financières critiques (virement, opposition de carte) protégées par transaction SQL avec rollback en cas d'échec.

## Conventions de nommage

- **Fichiers JS** (controllers, services, repositories) : `camelCase`, singulier (`beneficiaireController.js`).
- **Classes / models** : `PascalCase`, singulier (`Beneficiaire.js`).
- **Tables SQL** : voir `schema.sql` (majoritairement au pluriel : `beneficiaires`, `virements`, `comptes_bancaires`).
- **Colonnes de clé étrangère** : toujours singulier + `_id` (`client_id`, `compte_id`).
- **Routes REST** : pluriel (`/beneficiaires`, `/virements`, `/comptes`).
- **Conversion SQL ↔ JS** : les models convertissent le `snake_case` des colonnes SQL en `camelCase` pour l'usage JS.

## Travail restant / pistes d'amélioration

- Historique des affectations clients ↔ chargés (table dédiée à créer pour tracer qui affecte quoi et quand).
- Génération de RIB au format PDF téléchargeable.
- Notifications par email lors du traitement d'une demande.
- Tests automatisés (actuellement tests manuels uniquement).

---

*Projet réalisé dans le cadre d'un exercice pédagogique — architecture N-tiers, Node.js/Express, MySQL, EJS.*