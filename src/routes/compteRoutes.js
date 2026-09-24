const express = require('express');
const router = express.Router();
const compteController = require('../controllers/compteController');

router.get('/comptes', compteController.listerMesComptes);

module.exports = router;