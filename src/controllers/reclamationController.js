const reclamationService = require('../services/reclamationService');

async function listerMesReclamations(req, res) {
  try {
    const reclamations = await reclamationService.listerReclamations(req.session.userId);
    res.render('client/reclamation/liste', { reclamations, active: 'reclamations' });
  } catch (err) {
    console.error(err);
    res.status(500).send('Erreur lors du chargement des réclamations.');
  }
}
function showAddForm(req, res) {
  res.render('client/reclamation/ajouter', { active: 'reclamations' });
}
async function ajouterReclamation(req, res) {
  try {
    const { sujet, description } = req.body;
    await reclamationService.deposerReclamation(req.session.userId, sujet, description);
    res.redirect('/reclamations');
  } catch (err) {
    res.status(400).send(err.message);
  }
}
module.exports = { listerMesReclamations, showAddForm, ajouterReclamation };