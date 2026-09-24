const compteRepository = require('../repositories/compteRepository');

async function listerMesComptes(req, res) {
  try {
    const comptes = await compteRepository.findByClientId(req.session.userId);
    res.render('client/compte/liste', { comptes });
  } catch (err) {
    console.error(err);
    res.status(500).send('Erreur lors du chargement des comptes.');
  }
}

module.exports = { listerMesComptes };