const db = require('../config/connexion');
const Demande = require('../models/Demande');

async function findByClientId(clientId) {
  const [rows] = await db.query(
    "SELECT * FROM demandes WHERE client_id = ? ORDER BY date_creation DESC",
    [clientId]
  );
  return rows.map(row => new Demande(row));
}

async function create(data) {
  const { clientId, typeDemande, donneesSpecifiques } = data;
  const [result] = await db.query(
    'INSERT INTO demandes (client_id, type_demande, donnees_specifiques) VALUES (?, ?, ?)',
    [clientId, typeDemande, JSON.stringify(donneesSpecifiques || {})]
  );

  return result.insertId;
}
module.exports = { findByClientId, create };