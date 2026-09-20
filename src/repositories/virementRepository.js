const db = require("../config/connexion");
const Virement = require("../models/Virement");

async function findCompteById(compteId){
    const [rows] =db.query("SELECT * FROM virements where compte_source_id =? ORDER BY date_virement DESC",[compteId]);
    return rows.map(row =>new Virement(row))

}

async function create(data) {
    const { compteId, beneficiaireId, montant, motif }  =data;
    const [resultat] = await db.query("INSERT INTO virements (compte_source_id,beneficiaire_id,montant,motif) VALUES (?,?,?,?)"
    ,[compteId,beneficiaireId,montant,motif]);
    return resultat.insertId;
}

module.exports ={
    findCompteById,
    create
}