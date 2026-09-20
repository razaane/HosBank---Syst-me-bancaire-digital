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
    const [rows]= db.query("SELECT solde FROM comptes_bancaires WHERE id =?",[compteId]);
    if(rows.length === 0){
        throw new Error("le compte est introvablle");
    }
    const solde = Number(rows[0].solde);

    if(solde < Number(montant)){
        throw new Error('Solde insuffisant pour effectuer ce virement.');
    }

    return await virementRepository.create({ compteId, beneficiaireId, montant, motif });
}

module.exports={
    listerVirements,
    ajouterVirement
}