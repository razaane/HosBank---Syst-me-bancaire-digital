const db = require('../config/connexion');
//pour voir toute les cartes d un client
async function findByClientId(clientId) {
  const [rows] = await db.query(
    `SELECT c.* FROM cartes c
     JOIN comptes_bancaires cb ON c.compte_id = cb.id
     WHERE cb.client_id = ?`,
    [clientId]
  );
  return rows;
}
//pour voir toute les cartes d un client mais a conditions qu ilssont active 
async function findActiveByClientId(clientId) {
  const [rows] = await db.query(
    `SELECT c.* FROM cartes c
     JOIN comptes_bancaires cb ON c.compte_id = cb.id
     WHERE cb.client_id = ? AND c.statut = 'active'`,
    [clientId]
  );
  return rows;
}

module.exports = { findByClientId, findActiveByClientId };