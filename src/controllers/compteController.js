const compteRepository = require('../repositories/compteRepository');

async function listerMesComptes(req, res) {
  try {
    const comptes = await compteRepository.findByClientId(req.session.userId);
    res.render('client/compte/liste', { comptes, active: 'comptes' });
  } catch (err) {
    console.error(err);
    res.status(500).send('Erreur lors du chargement des comptes.');
  }
}

async function showEpargneForm(req, res) {
  res.render('client/compte/epargne', { active: 'comptes' });
}

async function demanderEpargne(req, res) {
  try {
    await compteRepository.createDemandeEpargne(req.session.userId);
    res.redirect('/comptes');
  } catch (err) {
    console.error(err);
    res.status(500).send('Erreur lors de la demande.');
  }
}
async function consulterRib(req, res) {
  try {
    const comptes = await compteRepository.findByClientId(req.session.userId);
    res.render('client/compte/rib', { comptes, active: 'rib' });
  } catch (err) {
    console.error(err);
    res.status(500).send('Erreur lors du chargement des RIB.');
  }
}
module.exports = { listerMesComptes, showEpargneForm, demanderEpargne, consulterRib };