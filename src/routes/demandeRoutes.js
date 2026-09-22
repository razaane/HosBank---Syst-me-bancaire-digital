const express = require('express');
const router = express.Router();
const demandeController = require('../controllers/demandeController');

router.get('/demandes', demandeController.listerMesDemandes);
router.get('/demandes/carte-virtuelle', demandeController.showCarteVirtuelleForm);
router.post('/demandes/carte-virtuelle', demandeController.demanderCarteVirtuelle);

module.exports = router;