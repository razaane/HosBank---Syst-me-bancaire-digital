const db = require('../config/connexion');
const Reclamation = require('../models/Reclamation');

async function findByClientId(clientId) {
  const [rows] = await db.query('SELECT * FROM reclamations WHERE client_id = ? ORDER BY date_creation DESC', [clientId]);
  return rows.map(row => new Reclamation(row));
}

async function create(data) {
  const { clientId, sujet, description } = data;
  const [result] = await db.query(
    'INSERT INTO reclamations (client_id, sujet, description) VALUES (?, ?, ?)',
    [clientId, sujet, description]
  );
  return result.insertId;
}
module.exports = { findByClientId, create };