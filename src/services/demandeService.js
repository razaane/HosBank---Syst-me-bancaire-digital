const demandeRepository = require('../repositories/demandeRepository');
const carteRepository = require('../repositories/carteRepository');

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

async function opposerCarte(clientId, carteId) {
  if (!carteId) {
    throw new Error('La carte est obligatoire.');
  }

  const cartes = await carteRepository.findByClientId(clientId);

  const carte = cartes.find(c => c.id === Number(carteId));

  if (!carte) {
    throw new Error("Cette carte n'appartient pas à ce client.");
  }

  if (carte.statut === 'opposee') {
    throw new Error('Cette carte est déjà en opposition.');
  }

  return await demandeRepository.createOppositionCarte({
    clientId,
    carteId
  });
}

module.exports = { listerDemandes, demanderCarteVirtuelle ,opposerCarte};