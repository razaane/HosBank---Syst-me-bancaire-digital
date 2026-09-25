const chargeClientService = require('../services/chargeClientService');
const chargeClientRepository = require('../repositories/chargeClientRepository');

async function listerClients(req, res) {
  try {
    const clients = await chargeClientService.listerMesClients(req.session.userId);
    res.render('charge-client/clients/liste', { clients, active: 'clients' });
  } catch (err) {
    console.error(err);
    res.status(500).send('Erreur lors du chargement des clients.');
  }
}

async function detailClient(req, res) {
  try {
    const { id } = req.params;
    const data = await chargeClientService.detailClient(id, req.session.userId);
    res.render('charge-client/clients/detail', { ...data, active: 'clients' });
  } catch (err) {
    console.error(err);
    res.status(404).send(err.message);
  }
}

async function listerDemandes(req, res) {
  try {
    const demandes = await chargeClientService.listerDemandes(req.session.userId);
    res.render('charge-client/demandes/liste', { demandes, active: 'demandes' });
  } catch (err) {
    console.error(err);
    res.status(500).send('Erreur lors du chargement des demandes.');
  }
}

async function detailDemande(req, res) {
  try {
    const { id } = req.params;
    const demande = await chargeClientRepository.findDemandeById(id);
    const commentaires = await chargeClientRepository.findCommentairesByDemandeId(id);
    res.render('charge-client/demandes/detail', { demande, commentaires, active: 'demandes' });
  } catch (err) {
    console.error(err);
    res.status(500).send('Erreur lors du chargement de la demande.');
  }
}

async function traiterDemande(req, res) {
  try {
    const { id } = req.params;
    const { statut, commentaire } = req.body;
    await chargeClientService.traiterDemande(id, req.session.userId, statut, commentaire);
    res.redirect('/charge/demandes/' + id);
  } catch (err) {
    res.status(400).send(err.message);
  }
}

async function listerReclamations(req, res) {
  try {
    const reclamations = await chargeClientService.listerReclamations(req.session.userId);
    res.render('charge-client/reclamations/liste', { reclamations, active: 'reclamations' });
  } catch (err) {
    console.error(err);
    res.status(500).send('Erreur lors du chargement des réclamations.');
  }
}

async function traiterReclamation(req, res) {
  try {
    const { id } = req.params;
    const { statut } = req.body;
    await chargeClientService.traiterReclamation(id, req.session.userId, statut);
    res.redirect('/charge/reclamations');
  } catch (err) {
    res.status(400).send(err.message);
  }
}

module.exports = {
  listerClients, detailClient, listerDemandes, detailDemande,
  traiterDemande, listerReclamations, traiterReclamation
};