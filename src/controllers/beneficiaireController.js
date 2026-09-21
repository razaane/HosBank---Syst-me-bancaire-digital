const beneficiaireService = require('../services/beneficiaireService');

async function list(req, res) {
  try {
    const clientId = req.session.userId;
    const beneficiaires = await beneficiaireService.listerBeneficiaires(clientId);
    res.render('client/beneficiaire/liste', { beneficiaires });
  } catch (err) {
    console.error(err);
    res.status(500).send('Erreur lors du chargement des bénéficiaires.');
  }
}

function showAddForm(req, res) {
  res.render('client/beneficiaire/ajouter');
}

async function add(req, res) {
  try {
    const clientId = req.session.userId || 1;
    const { nom, rib, banque } = req.body;

    await beneficiaireService.ajouterBeneficiaire({ clientId, nom, rib, banque });
    res.redirect('/beneficiaires');
  } catch (err) {
    res.status(400).send(err.message);
  }
}

async function remove(req, res) {
  try {
    const { id } = req.params;
    await beneficiaireService.supprimerBeneficiaire(id);
    res.redirect('/beneficiaires');
  } catch (err) {
    res.status(500).send('Erreur lors de la suppression.');
  }
}

module.exports = { list, showAddForm, add, remove };