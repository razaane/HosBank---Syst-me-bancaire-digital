const beneficiaireRepository = require("../repositories/beneficiaireRepository");

async function listBeneficiaires(clienId) {
    return await beneficiaireRepository.findBeneficiaireById(clienId);
}

async function ajouterBeneficiaire(data) {
    if(!data.nom || !data.rib){
        throw new Error("le nom et le rib sont obligatoires à remplire");
    }
    return await beneficiaireRepository.create(data);
}

async function supprimerBeneficiaire(id) {
    return await beneficiaireRepository.deleteById(id);
}

module.exports={
    listBeneficiaires,
    ajouterBeneficiaire,
    supprimerBeneficiaire,
}