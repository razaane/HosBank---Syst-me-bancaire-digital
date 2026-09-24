const userRepository = require('../repositories/userRepository');
const profilService = require('../services/profilService');

async function showProfil(req, res) {
  try {
    const user = await userRepository.findById(req.session.userId);
    res.render('client/profil', { user, active: 'profil', message: null, error: null });
  } catch (err) {
    console.error(err);
    res.status(500).send('Erreur lors du chargement du profil.');
  }
}

async function updateTelephone(req, res) {
  try {
    await profilService.modifierTelephone(req.session.userId, req.body.telephone);
    res.redirect('/profil');
  } catch (err) {
    res.status(400).send(err.message);
  }
}

async function updateEmail(req, res) {
  try {
    await profilService.modifierEmail(req.session.userId, req.body.email);
    res.redirect('/profil');
  } catch (err) {
    res.status(400).send(err.message);
  }
}

async function updatePassword(req, res) {
  try {
    const { ancienMotDePasse, nouveauMotDePasse } = req.body;
    await profilService.modifierMotDePasse(req.session.userId, ancienMotDePasse, nouveauMotDePasse);
    res.redirect('/profil');
  } catch (err) {
    res.status(400).send(err.message);
  }
}

module.exports = { showProfil, updateTelephone, updateEmail, updatePassword };