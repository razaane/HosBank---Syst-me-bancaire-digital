const express = require('express');
const router = express.Router();
const demandeController = require('../controllers/demandeController');

router.get('/demandes', demandeController.listerMesDemandes);
router.get('/demandes/carte-virtuelle', demandeController.showCarteVirtuelleForm);
router.post('/demandes/carte-virtuelle', demandeController.demanderCarteVirtuelle);
router.get('/demandes/opposition-carte',demandeController.showOppositionForm);
router.post('/demandes/opposition-carte',demandeController.opposerCarte);
module.exports = router;