const db = require('../config/connexion')


async function findByClientId(clientId) {
  const [rows] = await db.query(
    `SELECT c.* FROM cartes c JOIN comptes_bancaires cb ON c.compte_id = cb.id
     WHERE cb.client_id = ?`,
    [clientId]
  )
  return rows
}

async function findActiveByClientId(clientId) {
  const [rows] = await db.query(
    `SELECT c.* FROM cartes c  JOIN comptes_bancaires cb ON c.compte_id = cb.id
     WHERE cb.client_id = ? AND c.statut = 'active'`,
    [clientId]
  )
  return rows
}

async function findAllCartes() {
  const [rows] = await db.query(`SELECT c.*, b.numero_compte, u.nom, u.prenom 
    FROM cartes  JOIN comptes_bancaires cb ON c.compte_id = cb.id JOIN clients cl ON cb.client_id = cl.id
    JOIN utilisateurs u ON cl.id = u.id
    ORDER BY c.date_creation DESC
  `)
  return rows
}

async function updateStatut(carteId, statut) {
  const db = require('../config/connexion')
  await db.query('UPDATE cartes SET statut = ? WHERE id = ?', [statut, carteId])
}
async function createCarteInitiale(compteId) {
  const numero = '4402' + Math.floor(Math.random() * 1e12).toString().padStart(12, '0');
  const [result] = await db.query(
    `INSERT INTO cartes (compte_id, numero_carte, type_carte, statut, date_expiration)
     VALUES (?, ?, 'physique', 'active', DATE_ADD(NOW(), INTERVAL 3 YEAR))`,
    [compteId, numero]
  );
  return result.insertId;
}
module.exports = { findByClientId, findActiveByClientId,findAllCartes,updateStatut, createCarteInitiale };