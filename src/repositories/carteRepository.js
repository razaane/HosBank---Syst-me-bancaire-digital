const db = require('../config/connexion');

async function findByClientId(clientId) {
  const [rows] = await db.query(
    `SELECT c.* FROM cartes c
     JOIN comptes_bancaires cb ON c.compte_id = cb.id
     WHERE cb.client_id = ?`,
    [clientId]
  );
  return rows;
}

module.exports = { findByClientId };