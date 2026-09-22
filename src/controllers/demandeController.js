const demandeService = require('../services/demandeService');

async function listerMesDemandes(req, res) {
  try {
    const demandes = await demandeService.listerDemandes(req.session.userId);
    res.render('client/demande/liste', { demandes });
  } catch (err) {
    console.error(err);
    res.status(500).send('Erreur lors du chargement des demandes.');
  }
}

async function demanderCarteVirtuelle(req, res) {
  try {
    await demandeService.demanderCarteVirtuelle(req.session.userId);
    res.redirect('/demandes');
  } catch (err) {
    console.error(err);
    res.status(500).send('Erreur lors de la demande de carte virtuelle.');
  }
}

function showCarteVirtuelleForm(req, res) {
  res.render('client/demande/carte-virtuelle');
}

module.exports = { listerMesDemandes, demanderCarteVirtuelle, showCarteVirtuelleForm };