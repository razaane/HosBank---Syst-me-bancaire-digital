const express = require("express");
const router = express.Router();
const beneficiaireController =require("../controllers/beneficiaireController");

router.get('/beneficiaire',beneficiaireController.list);
router.post('/beneficiaire',beneficiaireController.add);
router.post('/beneficiaire/:id/supprimer',beneficiaireController.remove);

module.exports=router ;


