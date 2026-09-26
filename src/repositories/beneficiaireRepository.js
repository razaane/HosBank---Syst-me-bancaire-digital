const db = require("../config/connexion");
const Beneficiaire =require("../models/Beneficiaire");

async function findBeneficiaireById(clientId) {
    const [rows] =await db.query('SELECT * FROM beneficiaires WHERE client_id=?',[clientId]);
    return rows.map((row)=>new Beneficiaire(row));
}   

async function create(data) {
  const { clientId, nom, rib, banque } = data;
  const [result] = await db.query(
    'INSERT INTO beneficiaires (client_id, nom, rib, banque) VALUES (?, ?, ?, ?)',
    [clientId, nom, rib, banque]
  );
  return result.insertId;
}

async function deleteById(id) {
  await db.query('DELETE FROM beneficiaires WHERE id = ?', [id]);
}

module.exports={
    findBeneficiaireById,
    create,
    deleteById,
}        