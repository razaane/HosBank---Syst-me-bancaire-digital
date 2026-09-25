const db=require('../config/connexion')
const Compte=require('../models/Compte')

async function findByClientId(clientId){

const[rows] = await db.query('SELECT * FROM comptes_bancaires WHERE client_id = ? ORDER BY type_compte',
    [clientId])
return rows.map(row=> new Compte(row))
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


async function updateStatut(compteId, statut) {
  await db.query('UPDATE comptes_bancaires SET statut = ? WHERE id = ?', [statut, compteId])
}

module.exports={findByClientId , findAll, updateStatut }