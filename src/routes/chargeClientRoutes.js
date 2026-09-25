const express = require('express');
const router = express.Router();
const chargeClientController = require('../controllers/chargeClientController');

router.get('/charge/clients', chargeClientController.listerClients);
router.get('/charge/clients/:id', chargeClientController.detailClient);

router.get('/charge/demandes', chargeClientController.listerDemandes);
router.get('/charge/demandes/:id', chargeClientController.detailDemande);
router.post('/charge/demandes/:id', chargeClientController.traiterDemande);

router.get('/charge/reclamations', chargeClientController.listerReclamations);
router.post('/charge/reclamations/:id', chargeClientController.traiterReclamation);

module.exports = router;