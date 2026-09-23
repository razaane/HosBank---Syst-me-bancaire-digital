const db=require('../config/connexion')
const Compte=require('../models/Compte')

async function findByClientId(clientId){

const[rows] = await db.query('SELECT * FROM comptes_bancaires WHERE client_id = ? ORDER BY type_compte',
    [clientId])
return rows.map(row=> new Compte(row))
}   


module.exports={findByClientId}