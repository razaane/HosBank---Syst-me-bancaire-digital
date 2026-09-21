const virementRepository = require("../repositories/virementRepository");
const db = require("../config/connexion");

async function listerVirements(clienId) {
    return virementRepository.findCompteById(clienId);
}

async function ajouterVirement(data) {
    const { compteId, beneficiaireId, montant, motif } =data;
    if(!montant || montant <=0){
        throw new Error("le montant doit etre suppérieur à 0") ;
    }
    if(!beneficiaireId){
        throw new Error("le bénéficiaire est obligatoire");
    }
  
    const connection = await db.getConnection();
    try {
        await connection.beginTransaction();

        const [rows] = await connection.query(
        "SELECT solde FROM comptes_bancaires WHERE id = ? FOR UPDATE",
        [compteId]
        );
        if (rows.length === 0) throw new Error("Le compte est introuvable.");

        const solde = Number(rows[0].solde);
        if (solde < Number(montant)) throw new Error("Solde insuffisant pour effectuer ce virement.");

        await connection.query(
        "UPDATE comptes_bancaires SET solde = solde - ? WHERE id = ?",
        [montant, compteId]
        );

        const [result] = await connection.query(
        "INSERT INTO virements (compte_source_id, beneficiaire_id, montant, motif) VALUES (?, ?, ?, ?)",
        [compteId, beneficiaireId, montant, motif]
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

module.exports={
    listerVirements,
    ajouterVirement
}