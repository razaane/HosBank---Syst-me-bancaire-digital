const express = require('express');
const router = express.Router();
const reclamationController = require('../controllers/reclamationController');

router.get('/reclamations', reclamationController.listerMesReclamations);
router.get('/reclamations/ajouter', reclamationController.showAddForm);
router.post('/reclamations', reclamationController.ajouterReclamation);

module.exports = router;