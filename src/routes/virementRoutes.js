const express = require('express');
const router = express.Router();

const virementController = require("../controllers/virementController");
//yzzjjakja
router.get("/virement",virementController.list);
router.get("/virement/effectuer",virementController.showAddForm);
router.add("/virement",virementController.add);

module.exports = router;