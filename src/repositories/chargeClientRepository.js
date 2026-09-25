const db = require('../config/connexion');
const Utilisateur = require('../models/Utilisateur');
const Reclamation = require('../models/Reclamation');
const Commentaire = require('../models/Commentaire');
const HistoriqueInteraction = require('../models/HistoriqueInteraction');

// Clients affectés à ce chargé
async function findClientsByChargeId(chargeId) {
  const [rows] = await db.query(
    `SELECT u.* FROM utilisateurs u
     JOIN clients c ON c.id = u.id
     WHERE c.charge_client_id = ?`,
    [chargeId]
  );
  return rows.map(row => new Utilisateur(row));
}

// Détail d'un client (vérifie qu'il est bien affecté à ce chargé)
async function findClientById(clientId, chargeId) {
  const [rows] = await db.query(
    `SELECT u.* FROM utilisateurs u
     JOIN clients c ON c.id = u.id
     WHERE u.id = ? AND c.charge_client_id = ?`,
    [clientId, chargeId]
  );
  return rows[0] ? new Utilisateur(rows[0]) : null;
}

// Toutes les demandes des clients affectés à ce chargé
async function findDemandesByChargeId(chargeId) {
  const [rows] = await db.query(
    `SELECT d.*, u.nom, u.prenom FROM demandes d
     JOIN clients c ON c.id = d.client_id
     JOIN utilisateurs u ON u.id = d.client_id
     WHERE c.charge_client_id = ?
     ORDER BY d.date_creation DESC`,
    [chargeId]
  );
  return rows;
}

async function findDemandeById(demandeId) {
  const [rows] = await db.query(
    `SELECT d.*, u.nom, u.prenom FROM demandes d
     JOIN utilisateurs u ON u.id = d.client_id
     WHERE d.id = ?`,
    [demandeId]
  );
  return rows[0] || null;
}

async function updateDemandeStatut(demandeId, statut) {
  await db.query(
    'UPDATE demandes SET statut = ?, date_traitement = NOW() WHERE id = ?',
    [statut, demandeId]
  );
}

async function addCommentaire(demandeId, auteurId, contenu) {
  const [result] = await db.query(
    'INSERT INTO commentaire_demandes (demande_id, auteur_id, contenu) VALUES (?, ?, ?)',
    [demandeId, auteurId, contenu]
  );
  return result.insertId;
}

async function findCommentairesByDemandeId(demandeId) {
  const [rows] = await db.query(
    `SELECT cd.*, u.nom, u.prenom FROM commentaire_demandes cd
     JOIN utilisateurs u ON u.id = cd.auteur_id
     WHERE cd.demande_id = ? ORDER BY cd.date_creation ASC`,
    [demandeId]
  );
  return rows;
}

// Réclamations des clients affectés
async function findReclamationsByChargeId(chargeId) {
  const [rows] = await db.query(
    `SELECT r.*, u.nom, u.prenom FROM reclamations r
     JOIN clients c ON c.id = r.client_id
     JOIN utilisateurs u ON u.id = r.client_id
     WHERE c.charge_client_id = ?
     ORDER BY r.date_creation DESC`,
    [chargeId]
  );
  return rows;
}

async function updateReclamationStatut(reclamationId, statut) {
  await db.query(
    'UPDATE reclamations SET statut = ?, date_traitement = NOW() WHERE id = ?',
    [statut, reclamationId]
  );
}

// Historique d'interactions
async function addHistorique(clientId, chargeId, typeAction, description) {
  await db.query(
    'INSERT INTO historiques_interaction (client_id, charge_client_id, type_action, description) VALUES (?, ?, ?, ?)',
    [clientId, chargeId, typeAction, description]
  );
}

async function findHistoriqueByClientId(clientId) {
  const [rows] = await db.query(
    'SELECT * FROM historiques_interaction WHERE client_id = ? ORDER BY date_action DESC',
    [clientId]
  );
  return rows.map(row => new HistoriqueInteraction(row));
}

module.exports = {
  findClientsByChargeId, findClientById,
  findDemandesByChargeId, findDemandeById, updateDemandeStatut,
  addCommentaire, findCommentairesByDemandeId,
  findReclamationsByChargeId, updateReclamationStatut,
  addHistorique, findHistoriqueByClientId
};