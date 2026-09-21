const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcrypt');
const { createUser, verifyUserToken, findByEmail } = require('../repositories/userRepository');

async function register(formData) {
  const tokenVerification = uuidv4();
  const motDePasse = await bcrypt.hash(formData.motPass, 10);

  const userData = {
    nom: formData.nom,
    prenom: formData.prenom,
    email: formData.email,
    motDePasse,
    role: 'client',
    tokenVerification
  };

  return await createUser(userData);
}

async function login(formData) {
  const { email, motPass } = formData;

  const user = await findByEmail(email);
  if (!user) throw new Error('Email ou mot de passe invalide.');

  const isMatch = await bcrypt.compare(motPass, user.motDePasse);
  if (!isMatch) throw new Error('Email ou mot de passe invalide.');

  return user;
}

async function verifyEmail(token) {
  if (!token) throw new Error('Token de vérification manquant.');

  const user = await verifyUserToken(token);
  if (!user) throw new Error('Token de vérification invalide ou expiré.');

  return user;
}

module.exports = { register, login, verifyEmail };