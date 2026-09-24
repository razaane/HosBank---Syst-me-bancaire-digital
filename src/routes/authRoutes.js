const express = require('express');
const router = express.Router();
const { registerController, loginController, verifyEmailController } = require('../controllers/authController');

router.get('/register', (req, res) => res.render('auth/register'));
router.get('/login', (req, res) => res.render('auth/login', { verified: req.query.verified }));
router.post('/register', registerController);
router.post('/login', loginController);
router.get('/verify/:token', verifyEmailController);
router.get('/logout', (req, res) => {
  req.session.destroy(() => {
    res.redirect('/login');
  });
});

module.exports = router;