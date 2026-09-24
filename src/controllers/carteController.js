const carteRepository = require('../repositories/carteRepository');

async function listerMesCartes(req, res) {
  try {
    const cartes = await carteRepository.findByClientId(req.session.userId);
    res.render('client/carte/liste', { cartes });
  } catch (err) {
    console.error(err);
    res.status(500).send('Erreur lors du chargement des cartes.');
  }
}

module.exports = { listerMesCartes };