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

async function createOppositionCarte(data) {
  const db = require('../config/connexion');
  const { clientId, carteId } = data;

  const connection = await db.getConnection();
  try {
    await connection.beginTransaction();

    const [result] = await connection.query(
      'INSERT INTO demandes (client_id, type_demande, statut, donnees_specifiques) VALUES (?, ?, ?, ?)',
      [clientId, 'opposition_carte', 'validee', JSON.stringify({ carteId })]
    );

    await connection.query(
      'UPDATE cartes SET statut = ? WHERE id = ?',
      ['opposee', carteId]
    );

    await connection.commit();
    return result.insertId;

  } catch (err) {
    await connection.rollback();
    throw err;
  } finally {
    connection.release();
  }
}

async function createRenouvellementPin(data) {
  const { clientId, carteId } = data;
  const [result] = await db.query(
    'INSERT INTO demandes (client_id, type_demande, donnees_specifiques) VALUES (?, ?, ?)',
    [clientId, 'renouvellement_pin', JSON.stringify({ carteId })]
  );
  return result.insertId;
}
module.exports = { findByClientId, create ,createOppositionCarte ,createOppositionCarte};