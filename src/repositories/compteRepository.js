const db=require('../config/connexion')
const Compte=require('../models/Compte')

async function findByClientId(clientId){

const[rows] = await db.query('SELECT * FROM comptes_bancaires WHERE client_id = ? ORDER BY type_compte',
    [clientId])
return rows.map(row=> new Compte(row))
}   

async function createCompteInitial(clientId) {
  const numero = 'CPT-' + Date.now();
  const rib = '011780' + String(clientId).padStart(3, '0') + Math.floor(Math.random() * 1e14).toString().padStart(14, '0');
  const [result] = await db.query(
    `INSERT INTO comptes_bancaires (client_id, numero_compte, type_compte, solde, statut, rib)
     VALUES (?, ?, 'courant', 0.00, 'actif', ?)`,
    [clientId, numero, rib]
  );
  return result.insertId;
}

async function findAll() {
  const [rows] = await db.query(`
    SELECT cb.*, u.nom, u.prenom
    FROM comptes_bancaires cb
    JOIN clients c ON cb.client_id = c.id
    JOIN utilisateurs u ON c.id = u.id
    ORDER BY cb.date_ouverture DESC
  `)
  return rows
}
async function createDemandeEpargne(clientId) {
  const numero = 'EPG-' + Date.now();
  const [result] = await db.query(
    `INSERT INTO comptes_bancaires (client_id, numero_compte, type_compte, solde, statut)
     VALUES (?, ?, 'epargne', 0.00, 'en_attente_ouverture')`,
    [clientId, numero]
  );
  return result.insertId;
}


async function updateStatut(compteId, statut) {
  await db.query('UPDATE comptes_bancaires SET statut = ? WHERE id = ?', [statut, compteId])
}

module.exports={findByClientId , findAll, updateStatut, createDemandeEpargne , createCompteInitial }