const reclamationRepository = require('../repositories/reclamationRepository');

async function listerReclamations(clientId) {
  return await reclamationRepository.findByClientId(clientId);
}
async function deposerReclamation(clientId, sujet, description) {
  if (!sujet || !description) throw new Error('Le sujet et la description sont obligatoires.');
  return await reclamationRepository.create({ clientId, sujet, description });
}
module.exports = { listerReclamations, deposerReclamation };