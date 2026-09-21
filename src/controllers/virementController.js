const virementService = require('../services/virementService');
const db = require('../config/connexion');

async function list(req, res) {
  try {
    const [comptes] = await db.query('SELECT id FROM comptes_bancaires WHERE client_id = ? LIMIT 1', [req.session.userId]);
    if (comptes.length === 0) return res.status(404).send('Aucun compte trouvé pour ce client.');
    const compteId = comptes[0].id;

    const virements = await virementService.listerVirements(compteId);
    res.render('client/virement/liste', { virements });
  } catch (err) {
    console.error(err);
    res.status(500).send('Erreur lors du chargement des virements.');
  }
}

async function showAddForm(req, res) {
  res.render('client/virement/effectuer');
}

async function add(req, res) {
  try {
    const [comptes] = await db.query('SELECT id FROM comptes_bancaires WHERE client_id = ? LIMIT 1', [req.session.userId]);
    if (comptes.length === 0) return res.status(404).send('Aucun compte trouvé pour ce client.');
    const compteId = comptes[0].id;

    const { beneficiaireId, montant, motif } = req.body;
    await virementService.ajouterVirement({ compteId, beneficiaireId, montant, motif });
    res.redirect('/virements');
  } catch (err) {
    res.status(400).send(err.message);
  }
}

module.exports = { list, showAddForm, add };