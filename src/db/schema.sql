CREATE DATABASE IF NOT EXISTS hosbank;

USE hosbank;

CREATE TABLE utilisateurs (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nom VARCHAR(100) NOT NULL,
    prenom VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    mot_de_passe VARCHAR(255) NOT NULL,
    telephone VARCHAR(20),
    role ENUM('client', 'charge_client', 'admin') NOT NULL,
    email_verifie BOOLEAN NOT NULL DEFAULT FALSE,
    token_verification VARCHAR(255),
    actif BOOLEAN NOT NULL DEFAULT TRUE,
    date_creation DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    date_derniere_connexion DATETIME
);

CREATE TABLE charge_clients (
    id INT PRIMARY KEY,
    matricule VARCHAR(50),
    FOREIGN KEY (id) REFERENCES utilisateurs(id) ON DELETE CASCADE
);

CREATE TABLE clients (
    id INT PRIMARY KEY,
    charge_client_id INT,
    adresse VARCHAR(255),
    date_naissance DATE,
    cin VARCHAR(20) UNIQUE,
    FOREIGN KEY (id) REFERENCES utilisateurs(id) ON DELETE CASCADE,
    FOREIGN KEY (charge_client_id) REFERENCES charge_clients(id) ON DELETE SET NULL
);

CREATE TABLE comptes_bancaires (
    id INT AUTO_INCREMENT PRIMARY KEY,
    client_id INT NOT NULL,
    numero_compte VARCHAR(50) NOT NULL UNIQUE,
    type_compte ENUM('courant', 'epargne') NOT NULL,
    solde DECIMAL(15,2) NOT NULL DEFAULT 0.00,
    statut ENUM('actif', 'suspendu', 'ferme', 'en_attente_ouverture') NOT NULL DEFAULT 'en_attente_ouverture',
    date_ouverture DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    rib VARCHAR(50),
    FOREIGN KEY (client_id) REFERENCES clients(id) ON DELETE CASCADE
);


CREATE TABLE beneficiaires (
    id INT AUTO_INCREMENT PRIMARY KEY,
    client_id INT NOT NULL,
    nom VARCHAR(150) NOT NULL,
    rib VARCHAR(50) NOT NULL,
    banque VARCHAR(100),
    date_ajout DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (client_id) REFERENCES clients(id) ON DELETE CASCADE
);


CREATE TABLE virements (
    id INT AUTO_INCREMENT PRIMARY KEY,
    compte_source_id INT NOT NULL,
    beneficiaire_id INT,
    compte_destination_id INT,
    montant DECIMAL(15,2) NOT NULL,
    motif VARCHAR(255),
    date_virement DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    statut ENUM('en_attente', 'valide', 'echoue', 'annule') NOT NULL DEFAULT 'en_attente',
    FOREIGN KEY (compte_source_id) REFERENCES comptes_bancaires(id) ON DELETE CASCADE,
    FOREIGN KEY (beneficiaire_id) REFERENCES beneficiaires(id) ON DELETE SET NULL,
    FOREIGN KEY (compte_destination_id) REFERENCES comptes_bancaires(id) ON DELETE SET NULL
);


CREATE TABLE cartes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    compte_id INT NOT NULL,
    numero_carte VARCHAR(50) NOT NULL,
    type_carte ENUM('physique', 'virtuelle') NOT NULL,
    statut ENUM('active', 'opposee', 'expiree', 'en_attente') NOT NULL DEFAULT 'en_attente',
    date_expiration DATE,
    date_creation DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (compte_id) REFERENCES comptes_bancaires(id) ON DELETE CASCADE
);


CREATE TABLE demandes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    client_id INT NOT NULL,
    charge_client_id INT,
    type_demande ENUM('ouverture_epargne', 'rib', 'carte_virtuelle', 'opposition_carte', 'renouvellement_pin') NOT NULL,
    statut ENUM('en_attente', 'en_cours', 'validee', 'refusee') NOT NULL DEFAULT 'en_attente',
    date_creation DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    date_traitement DATETIME,
    donnees_specifiques JSON,
    FOREIGN KEY (client_id) REFERENCES clients(id) ON DELETE CASCADE,
    FOREIGN KEY (charge_client_id) REFERENCES charge_clients(id) ON DELETE SET NULL
);

--still don't know to add this table or not
CREATE TABLE commentaire_demandes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    demande_id INT NOT NULL,
    auteur_id INT NOT NULL,
    contenu TEXT NOT NULL,
    date_creation DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (demande_id) REFERENCES demandes(id) ON DELETE CASCADE,
    FOREIGN KEY (auteur_id) REFERENCES utilisateurs(id) ON DELETE CASCADE
);


CREATE TABLE reclamations (
    id INT AUTO_INCREMENT PRIMARY KEY,
    client_id INT NOT NULL,
    charge_client_id INT,
    sujet VARCHAR(150) NOT NULL,
    description TEXT NOT NULL,
    statut ENUM('ouverte', 'en_cours', 'resolue', 'fermee') NOT NULL DEFAULT 'ouverte',
    date_creation DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    date_traitement DATETIME,
    FOREIGN KEY (client_id) REFERENCES clients(id) ON DELETE CASCADE,
    FOREIGN KEY (charge_client_id) REFERENCES charge_clients(id) ON DELETE SET NULL
);


CREATE TABLE historiques_interaction (
    id INT AUTO_INCREMENT PRIMARY KEY,
    client_id INT NOT NULL,
    charge_client_id INT NOT NULL,
    type_action VARCHAR(100) NOT NULL,
    description TEXT,
    date_action DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (client_id) REFERENCES clients(id) ON DELETE CASCADE,
    FOREIGN KEY (charge_client_id) REFERENCES charge_clients(id) ON DELETE CASCADE
);


CREATE TABLE historiques_operation (
    id INT AUTO_INCREMENT PRIMARY KEY,
    compte_id INT NOT NULL,
    type_operation VARCHAR(100) NOT NULL,
    montant DECIMAL(15,2),
    date_operation DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (compte_id) REFERENCES comptes_bancaires(id) ON DELETE CASCADE
);


