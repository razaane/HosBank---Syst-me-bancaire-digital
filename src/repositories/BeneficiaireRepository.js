const db = require("../db/connexion");
const Beneficiaire =require("../models/Beneficiaire");

async function findBeneficiaireById(clientId) {
    const [rows] =await db.query('SELECT * FROM beneficiaire WHERE client_id=?',[clientId]);
    return rows.map((row)=>new Beneficiaire(row));
}   

async function create(data) {
    const {clientId,nom,rib,banque} = data;
    const [resultat]=await db.query(
        'INSERT INTO beneficiaire (client_id,nom,rib,banque) VALUES (?,?,?,?)'
        ,[clientId,nom,rib,banque]);
    return true;
}

async function deleteById(id) {
     await db.query('DELETE FROM beneficiaire WHERE id=?',[id]);
}

module.exports={
    findBeneficiaireById,
    create,
    deleteById,
}