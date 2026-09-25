const chargeClientRepository = require('../repositories/chargeClientRepository');
const compteRepository = require('../repositories/compteRepository');
const carteRepository = require('../repositories/carteRepository');

async function listerMesClients(chargeId) {
  return await chargeClientRepository.findClientsByChargeId(chargeId);
}

async function detailClient(clientId, chargeId) {
  const client = await chargeClientRepository.findClientById(clientId, chargeId);
  if (!client) throw new Error('Client introuvable ou non affecté.');

  const comptes = await compteRepository.findByClientId(clientId);
  const cartes = await carteRepository.findByClientId(clientId);
  const historique = await chargeClientRepository.findHistoriqueByClientId(clientId);

  return { client, comptes, cartes, historique };
}

async function listerDemandes(chargeId) {
  return await chargeClientRepository.findDemandesByChargeId(chargeId);
}

async function traiterDemande(demandeId, chargeId, nouveauStatut, commentaireTexte) {
  const statutsValides = ['en_cours', 'validee', 'refusee'];
  if (!statutsValides.includes(nouveauStatut)) throw new Error('Statut invalide.');

  const demande = await chargeClientRepository.findDemandeById(demandeId);
  if (!demande) throw new Error('Demande introuvable.');

  await chargeClientRepository.updateDemandeStatut(demandeId, nouveauStatut);

  if (commentaireTexte) {
    await chargeClientRepository.addCommentaire(demandeId, chargeId, commentaireTexte);
  }

  await chargeClientRepository.addHistorique(
    demande.client_id, chargeId, 'traitement_demande',
    `Demande #${demandeId} (${demande.type_demande}) passée à "${nouveauStatut}"`
  );
}

async function listerReclamations(chargeId) {
  return await chargeClientRepository.findReclamationsByChargeId(chargeId);
}

async function traiterReclamation(reclamationId, chargeId, nouveauStatut) {
  const statutsValides = ['en_cours', 'resolue', 'fermee'];
  if (!statutsValides.includes(nouveauStatut)) throw new Error('Statut invalide.');
  await chargeClientRepository.updateReclamationStatut(reclamationId, nouveauStatut);
}

module.exports = {
  listerMesClients, detailClient, listerDemandes, traiterDemande,
  listerReclamations, traiterReclamation
};