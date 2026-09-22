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

async function showOppositionForm(req, res) {
  try {
    const carteRepository = require('../repositories/carteRepository');

    const cartes = await carteRepository.findByClientId(
      req.session.userId
    );

    res.render('client/demande/opposition-carte', { cartes });

  } catch (err) {
    console.error(err);
    res.status(500).send('Erreur lors du chargement de vos cartes.');
  }
}

async function opposerCarte(req, res) {
  try {
    const { carteId } = req.body;

    await demandeService.opposerCarte(
      req.session.userId,
      carteId
    );

    res.redirect('/demandes');

  } catch (err) {
    res.status(400).send(err.message);
  }
}

async function showPinForm(req, res) {
  try {
    const carteRepository = require('../repositories/carteRepository');
    const cartes = await carteRepository.findByClientId(req.session.userId);
    res.render('client/demande/renouvellement-pin', { cartes });
  } catch (err) {
    console.error(err);
    res.status(500).send('Erreur lors du chargement de vos cartes.');
  }
}

async function demanderRenouvellementPin(req, res) {
  try {
    const { carteId } = req.body;
    await demandeService.demanderRenouvellementPin(req.session.userId, carteId);
    res.redirect('/demandes');
  } catch (err) {
    res.status(400).send(err.message);
  }
}
module.exports = { listerMesDemandes, demanderCarteVirtuelle, showCarteVirtuelleForm ,showOppositionForm , opposerCarte ,showPinForm,demanderRenouvellementPin};