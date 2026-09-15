# HosBank

Application bancaire web permettant aux clients de consulter leurs comptes, gérer leurs bénéficiaires, effectuer des virements et suivre leurs demandes. Le projet comprend trois espaces : **Client**, **Chargé Client** et **Administrateur**.

Projet réalisé dans le cadre d'un travail de groupe. Deadline : **25/09/2026**.

---

## Table des matières

- [Description du projet](#description-du-projet)
- [Fonctionnalités](#fonctionnalités)
- [Stack technique](#stack-technique)
- [Architecture](#architecture)
- [Prérequis](#prérequis)
- [Installation](#installation)
- [Structure du projet](#structure-du-projet)
- [Scripts disponibles](#scripts-disponibles)
- [Livrables](#livrables)
- [Équipe](#équipe)

---

## Description du projet

HosBank est une application bancaire web construite selon une architecture **N-tiers** (UI / Métier / Persistance), sans ORM, avec authentification par session et vérification d'adresse e-mail. Elle répond à un besoin de gestion complète du parcours bancaire d'un client (consultation, demandes, virements) tout en offrant des outils de traitement et de supervision aux chargés de clientèle et aux administrateurs.

## Fonctionnalités

### Espace Client
- Authentification avec vérification de l'adresse e-mail
- Tableau de bord et consultation des soldes
- Consultation des comptes bancaires
- Demande d'ouverture d'un compte d'épargne
- Demande / consultation du RIB
- Ajout et gestion des bénéficiaires
- Virements
- Historique des opérations
- Demande de carte virtuelle
- Opposition sur carte
- Demande de recalcul / renouvellement du PIN
- Dépôt de réclamation
- Suivi de l'état des demandes
- Gestion des informations personnelles

### Espace Chargé Client
- Consultation des clients affectés
- Consultation des comptes et demandes des clients
- Traitement des demandes : RIB, comptes d'épargne, cartes virtuelles, recalcul PIN, oppositions de cartes
- Consultation et traitement des réclamations
- Modification du statut d'une demande
- Ajout de commentaires / réponses au client
- Historique des interactions avec les clients

### Espace Administrateur
- Gestion des utilisateurs (création, modification, désactivation)
- Gestion des rôles : Client, Chargé Client, Administrateur
- Affectation des clients aux chargés clients
- Gestion des comptes bancaires et des cartes
- Consultation des virements et opérations
- Consultation de toutes les demandes et réclamations
- Supervision des activités des chargés clients
- Statistiques générales de la plateforme

## Stack technique

| Couche | Technologie |
|---|---|
| Backend | Node.js + Express.js |
| Frontend | EJS + HTML / CSS / JavaScript |
| Base de données | MySQL |
| Persistance | SQL direct (`mysql2`), sans ORM |
| CSS | Bootstrap |
| Authentification | Sessions (`express-session`) + vérification e-mail |
| Autorisation | Gestion des rôles et permissions (middlewares) |

## Architecture

Le projet suit une architecture **N-tiers** :

```
UI (routes + views EJS)
    ↓
Métier (services)
    ↓
Persistance (repositories → requêtes SQL → MySQL)
```

- **`routes/`** — définit les endpoints et délègue aux controllers
- **`controllers/`** — reçoit la requête HTTP, appelle les services, renvoie la réponse
- **`services/`** — logique métier (règles, validations métier)
- **`repositories/`** — requêtes SQL brutes vers MySQL
- **`models/`** — structure des entités (Client, Compte, Virement, etc.)
- **`middlewares/`** — authentification, contrôle des rôles, gestion des erreurs
- **`views/`** — templates EJS, séparés par espace (client / chargé-client / admin)

## Prérequis

- Node.js (v18+ recommandé) et npm
- MySQL Server (v8+)
- Git

## Installation

### 1. Cloner le repo

```bash
git clone https://github.com/<ton-user>/hosbank.git
cd hosbank
```

### 2. Installer les dépendances

Si tu clones le repo et que `package.json` existe déjà :

```bash
npm install
```

Liste des dépendances utilisées dans ce projet (déjà présentes dans `package.json`, données ici pour référence) :

| Package | Rôle |
|---|---|
| `express` | Framework serveur |
| `ejs` | Moteur de templates pour les vues |
| `mysql2` | Driver MySQL (requêtes SQL directes) |
| `express-session` | Gestion des sessions (authentification) |
| `express-mysql-session` | Stockage des sessions dans MySQL (persistant, pas en RAM) |
| `bcrypt` | Hachage des mots de passe |
| `dotenv` | Chargement des variables d'environnement (`.env`) |
| `nodemailer` | Envoi d'e-mails (vérification d'adresse e-mail) |
| `uuid` | Génération de tokens uniques (vérification e-mail) |
| `express-validator` | Validation des données côté backend |
| `method-override` | Permet PUT/DELETE dans les formulaires HTML |
| `connect-flash` | Messages flash (succès/erreur) entre les pages |
| `helmet` | En-têtes HTTP de sécurité |
| `nodemon` *(dev)* | Auto-reload du serveur en développement |

Bootstrap est chargé via CDN directement dans les vues EJS (pas de `npm install` nécessaire) :

```html
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
```

Commande d'installation complète (si tu repars de zéro, sans `package.json`) :

```bash
npm install express ejs mysql2 express-session express-mysql-session bcrypt dotenv nodemailer uuid express-validator method-override connect-flash helmet
npm install --save-dev nodemon
```

### 3. Créer la base de données MySQL

Connecte-toi à MySQL :

```bash
sudo mysql
```

Puis exécute :

```sql
CREATE DATABASE hosbank;
CREATE USER 'hosbank_user'@'localhost' IDENTIFIED BY 'TonMotDePasse';
GRANT ALL PRIVILEGES ON hosbank.* TO 'hosbank_user'@'localhost';
FLUSH PRIVILEGES;
EXIT;
```

### 4. Configurer les variables d'environnement

Crée un fichier `.env` à la racine du projet (voir `.env.example`) :

```env
PORT=3000
DB_HOST=localhost
DB_USER=hosbank_user
DB_PASSWORD=TonMotDePasse
DB_NAME=hosbank
SESSION_SECRET=change_this_secret
EMAIL_HOST=smtp.example.com
EMAIL_PORT=587
EMAIL_USER=ton_email@example.com
EMAIL_PASSWORD=ton_mot_de_passe_app
```

⚠️ Ne jamais commit le fichier `.env` (il doit être dans `.gitignore`).

### 5. Importer le schéma de base de données

```bash
mysql -u hosbank_user -p hosbank < src/db/schema.sql
```

### 6. Lancer l'application

```bash
npm run dev
```

L'application est accessible sur `http://localhost:3000`.

## Structure du projet

```
hosbank/
├── src/
│   ├── routes/
│   ├── controllers/
│   ├── services/
│   ├── repositories/
│   ├── models/
│   ├── middlewares/
│   ├── config/
│   ├── utils/
│   └── db/
├── views/
│   ├── client/
│   ├── charge-client/
│   ├── admin/
│   ├── partials/
│   └── auth/
├── public/
│   ├── css/
│   ├── js/
│   └── images/
├── .env.example
├── .gitignore
├── package.json
└── README.md
```

## Scripts disponibles

| Commande | Description |
|---|---|
| `npm run dev` | Lance le serveur en mode développement (auto-reload) |
| `npm start` | Lance le serveur en mode production |

## Livrables

- Code source : lien GitHub (ce repo)
- Planification : lien JIRA
- Documentation technique : ce fichier README
- Maquette Figma : lien à ajouter
- Diagramme de classe (entités) : lien / fichier à ajouter
