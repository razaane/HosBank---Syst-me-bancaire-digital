const BeneficiaireRepository = require("../repositories/BeneficiaireRepository");

async function listBeneficiaires(clienId) {
    return await BeneficiaireRepository.findBeneficiaireById(clienId);
}

async function ajouterBeneficiaire(data) {
    if(!data.nom || !data.rib){
        throw new Error("le nom et le rib sont obligatoires à remplire");
    }
    return await BeneficiaireRepository.create(data);
}

async function supprimerBeneficiaire(id) {
    return await BeneficiaireRepository.deleteById(id);
}

module.exports={
    listBeneficiaires,
    ajouterBeneficiaire,
    supprimerBeneficiaire,
}