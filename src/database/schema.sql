CREATE DATABASE IF NOT EXISTS hosbank;
USE hosbank;

-- Table Utilisateur (Base)
CREATE TABLE IF NOT EXISTS utilisateurs (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nom VARCHAR(100) NOT NULL,
    prenom VARCHAR(100) NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    motPass VARCHAR(255) NOT NULL,
    telephone VARCHAR(20),
    roleUtilisateur ENUM('client', 'charge_client', 'admin') DEFAULT 'client',
    emailVerification BOOLEAN DEFAULT FALSE,
    tokenVerification VARCHAR(255),
    actif BOOLEAN DEFAULT TRUE,
    dateCreation DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Table Client
CREATE TABLE IF NOT EXISTS clients (
    id INT AUTO_INCREMENT PRIMARY KEY,
    utilisateur_id INT NOT NULL UNIQUE,
    adress TEXT,
    dateNaissance DATE,
    cin VARCHAR(50) UNIQUE,
    chargeClientId INT,
    FOREIGN KEY (utilisateur_id) REFERENCES utilisateurs(id) ON DELETE CASCADE,
    FOREIGN KEY (chargeClientId) REFERENCES charge_clients(id) ON DELETE SET NULL
);

-- Table ChargeClient
CREATE TABLE IF NOT EXISTS charge_clients (
    id INT AUTO_INCREMENT PRIMARY KEY,
    utilisateur_id INT NOT NULL UNIQUE,
    matricule VARCHAR(50) UNIQUE NOT NULL,
    FOREIGN KEY (utilisateur_id) REFERENCES utilisateurs(id) ON DELETE CASCADE
);

-- Table Administrateur
CREATE TABLE IF NOT EXISTS administrateurs (
    id INT AUTO_INCREMENT PRIMARY KEY,
    utilisateur_id INT NOT NULL UNIQUE,
    FOREIGN KEY (utilisateur_id) REFERENCES utilisateurs(id) ON DELETE CASCADE
);

-- Table CompteBancaire
CREATE TABLE IF NOT EXISTS comptes_bancaires (
    id INT AUTO_INCREMENT PRIMARY KEY,
    client_id INT NOT NULL,
    numeroCompte VARCHAR(50) UNIQUE NOT NULL,
    typeCompte ENUM('courant', 'epargne') NOT NULL,
    solde DECIMAL(15, 2) DEFAULT 0.00,
    statutCompte ENUM('actif', 'suspendu', 'ferme', 'en_attente_ouverture') DEFAULT 'en_attente_ouverture',
    dateOuverture DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (client_id) REFERENCES clients(id) ON DELETE CASCADE
);

-- Table Beneficiaire
CREATE TABLE IF NOT EXISTS beneficiaires (
    id INT AUTO_INCREMENT PRIMARY KEY,
    client_id INT NOT NULL,
    nom VARCHAR(100) NOT NULL,
    rib VARCHAR(50) NOT NULL,
    banque VARCHAR(100) NOT NULL,
    dateAjout DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (client_id) REFERENCES clients(id) ON DELETE CASCADE
);

-- Table Virement
CREATE TABLE IF NOT EXISTS virements (
    id INT AUTO_INCREMENT PRIMARY KEY,
    compteSourceId INT NOT NULL,
    beneficiaireId INT,
    compteDestinationId INT,
    montant DECIMAL(15, 2) NOT NULL,
    motif TEXT,
    dateVirement DATETIME DEFAULT CURRENT_TIMESTAMP,
    statutVirement ENUM('en_attente', 'valide', 'echoue', 'annule') DEFAULT 'en_attente',
    FOREIGN KEY (compteSourceId) REFERENCES comptes_bancaires(id),
    FOREIGN KEY (beneficiaireId) REFERENCES beneficiaires(id) ON DELETE SET NULL,
    FOREIGN KEY (compteDestinationId) REFERENCES comptes_bancaires(id)
);

-- Table Carte
CREATE TABLE IF NOT EXISTS cartes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    compteId INT NOT NULL,
    numeroCarte VARCHAR(50) UNIQUE NOT NULL,
    typeCarte ENUM('physique', 'virtuelle') NOT NULL,
    statutCarte ENUM('active', 'opposee', 'expiree', 'en_attente') DEFAULT 'en_attente',
    dateExpiration DATE NOT NULL,
    dateCreation DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (compteId) REFERENCES comptes_bancaires(id) ON DELETE CASCADE
);

-- Table Demande
CREATE TABLE IF NOT EXISTS demandes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    client_id INT NOT NULL,
    chargeClientId INT,
    typeDemande ENUM('ouverture_epargne', 'rib', 'carte_virtuelle', 'opposition_carte', 'renouvellement_pin') NOT NULL,
    statutDemande ENUM('en_attente', 'en_cours', 'validee', 'refusee') DEFAULT 'en_attente',
    dateCreation DATETIME DEFAULT CURRENT_TIMESTAMP,
    dateTraitement DATETIME,
    donneesSpecifiques JSON,
    FOREIGN KEY (client_id) REFERENCES clients(id) ON DELETE CASCADE,
    FOREIGN KEY (chargeClientId) REFERENCES charge_clients(id) ON DELETE SET NULL
);

-- Table Reclamation
CREATE TABLE IF NOT EXISTS reclamations (
    id INT AUTO_INCREMENT PRIMARY KEY,
    client_id INT NOT NULL,
    chargeClientId INT,
    sujet VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    statusReclamation ENUM('ouverte', 'en_cours', 'resolue') DEFAULT 'ouverte',
    dateCreation DATETIME DEFAULT CURRENT_TIMESTAMP,
    dateTraitement DATETIME,
    FOREIGN KEY (client_id) REFERENCES clients(id) ON DELETE CASCADE,
    FOREIGN KEY (chargeClientId) REFERENCES charge_clients(id) ON DELETE SET NULL
);

-- Table Commentaire
CREATE TABLE IF NOT EXISTS commentaires (
    id INT AUTO_INCREMENT PRIMARY KEY,
    demandeId INT,
    auteurId INT NOT NULL,
    contenu TEXT NOT NULL,
    dateCreation DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (demandeId) REFERENCES demandes(id) ON DELETE CASCADE,
    FOREIGN KEY (auteurId) REFERENCES utilisateurs(id) ON DELETE CASCADE
);

-- Table HistoriqueInteraction
CREATE TABLE IF NOT EXISTS historique_interactions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    clientId INT NOT NULL,
    chargeClientId INT NOT NULL,
    typeAction VARCHAR(100) NOT NULL,
    desription TEXT,
    dateAction DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (clientId) REFERENCES clients(id) ON DELETE CASCADE,
    FOREIGN KEY (chargeClientId) REFERENCES charge_clients(id) ON DELETE CASCADE
);

-- Table HistoriqueOperation
CREATE TABLE IF NOT EXISTS historique_operations (
    id INT AUTO_INCREMENT PRIMARY KEY,
    compteId INT NOT NULL,
    typeOperation VARCHAR(100) NOT NULL,
    montant DECIMAL(15, 2) NOT NULL,
    dateOperation DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (compteId) REFERENCES comptes_bancaires(id) ON DELETE CASCADE
);