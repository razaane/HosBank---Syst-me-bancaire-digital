const demandeRepository = require('../repositories/demandeRepository');

async function listerDemandes(clientId) {
  return await demandeRepository.findByClientId(clientId);
}

async function demanderCarteVirtuelle(clientId) {
  return await demandeRepository.create({
    clientId,
    typeDemande: 'carte_virtuelle',
    donneesSpecifiques: {}
  });
}

module.exports = { listerDemandes, demanderCarteVirtuelle };