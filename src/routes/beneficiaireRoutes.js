const express = require("express");
const router = express.Router();
const beneficiaireController =require("../controllers/beneficiaireController");

router.get('/beneficiaires', beneficiaireController.list);
router.get('/beneficiaires/ajouter', beneficiaireController.showAddForm);
router.post('/beneficiaires', beneficiaireController.add);
router.post('/beneficiaires/:id/supprimer', beneficiaireController.remove);

module.exports=router ;


