const express = require('express');
const router = express.Router();
const profilController = require('../controllers/profilController');

router.get('/profil', profilController.showProfil);
router.post('/profil/telephone', profilController.updateTelephone);
router.post('/profil/email', profilController.updateEmail);
router.post('/profil/mot-de-passe', profilController.updatePassword);

module.exports = router;