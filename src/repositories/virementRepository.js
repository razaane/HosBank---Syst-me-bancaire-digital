const db = require("../config/connexion");
const Virement = require("../models/Virement");

async function findCompteById(compteId){
  const [rows] = await db.query(
    "SELECT * FROM virements WHERE compte_source_id = ? ORDER BY date_virement DESC",
    [compteId]
  );
  return rows.map(row => new Virement(row));
}

async function create(data) {
    const { compteId, beneficiaireId, montant, motif }  =data;
    const [resultat] = await db.query("INSERT INTO virements (compte_source_id,beneficiaire_id,montant,motif) VALUES (?,?,?,?)"
    ,[compteId,beneficiaireId,montant,motif]);
    return resultat.insertId;
}


async function findAll() {
  const [rows] = await db.query(`
    SELECT v.*, cb.numero_compte, u.nom, u.prenom
    FROM virements v
    JOIN comptes_bancaires cb ON v.compte_source_id = cb.id
    JOIN clients c ON cb.client_id = c.id
    JOIN utilisateurs u ON c.id = u.id
    ORDER BY v.date_virement DESC
  `)
  return rows
}
module.exports ={
    findCompteById,
    create,findAll
}