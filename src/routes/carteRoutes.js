const express = require('express');
const router = express.Router();
const carteController = require('../controllers/carteController');

router.get('/cartes', carteController.listerMesCartes);

module.exports = router;