const bcrypt = require('bcrypt');
const userRepository = require('../repositories/userRepository');

async function modifierTelephone(userId, telephone) {
  await userRepository.updateTelephone(userId, telephone);
}
async function modifierEmail(userId, email) {
  await userRepository.updateEmail(userId, email);
}
async function modifierMotDePasse(userId, ancienMotDePasse, nouveauMotDePasse) {
  const user = await userRepository.findById(userId);
  const isMatch = await bcrypt.compare(ancienMotDePasse, user.motDePasse);
  if (!isMatch) throw new Error('Ancien mot de passe incorrect.');
  const hash = await bcrypt.hash(nouveauMotDePasse, 10);
  await userRepository.updatePassword(userId, hash);
}
module.exports = { modifierTelephone, modifierEmail, modifierMotDePasse };