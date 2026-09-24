const express = require('express');
const router = express.Router();
const compteController = require('../controllers/compteController');

router.get('/comptes', compteController.listerMesComptes);
router.get('/comptes/epargne', compteController.showEpargneForm);
router.post('/comptes/epargne', compteController.demanderEpargne);
router.get('/rib', compteController.consulterRib);

module.exports = router;