const express = require("express")
const router = express.Router()
const beneficiaireController =require("../controllers/beneficiaireController")
const authMiddleware=require("../middlewares/authmiddleware")
router.get('/beneficiaires',authMiddleware, beneficiaireController.list)
router.get('/beneficiaires/ajouter',authMiddleware, beneficiaireController.showAddForm)
router.post('/beneficiaires',authMiddleware,beneficiaireController.add)
router.post('/beneficiaires/:id/supprimer',authMiddleware, beneficiaireController.remove)
module.exports=router;


