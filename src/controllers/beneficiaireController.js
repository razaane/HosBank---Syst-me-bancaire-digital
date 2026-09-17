// const beneficiaireService = require('../services/beneficiaireService');

// async function list(req, res) {
//   try {
//     const clientId = req.session.userId; // à adapter selon comment tu stockes l'utilisateur connecté
//     const beneficiaires = await beneficiaireService.listerBeneficiaires(clientId);
//     res.render('client/beneficiaires', { beneficiaires });
//   } catch (err) {
//     res.status(500).send('Erreur lors du chargement des bénéficiaires.');
//   }
// }

// async function add(req, res) {
//   try {
//     const clientId = req.session.userId;
//     const { nom, rib, banque } = req.body;

//     await beneficiaireService.ajouterBeneficiaire({ clientId, nom, rib, banque });
//     res.redirect('/beneficiaires');
//   } catch (err) {
//     res.status(400).send(err.message);
//   }
// }

// async function remove(req, res) {
//   try {
//     const { id } = req.params;
//     await beneficiaireService.supprimerBeneficiaire(id);
//     res.redirect('/beneficiaires');
//   } catch (err) {
//     res.status(500).send('Erreur lors de la suppression.');
//   }
// }

// module.exports = { list, add, remove };