const express = require('express');
const router = express.Router();
const virementController = require('../controllers/virementController');

router.get('/virements', virementController.list);
router.get('/virements/effectuer', virementController.showAddForm);
router.post('/virements', virementController.add);

module.exports = router;