const crypto = require('crypto')
const bcrypt = require('bcrypt')

const { createUser, verifyUserToken, findByEmail, createClient, countUsers } = require('../repositories/userRepository')

async function register(formData) {
  const tokenVerification = crypto.randomUUID()
  
  const count = await countUsers()
  const role = count == 0 ? 'admin' : 'client'

  const motDePasse = await bcrypt.hash(formData.motPass, 10)


  const userData = {
    nom: formData.nom,
    prenom: formData.prenom,
    email: formData.email,
    motDePasse,
    role: role,
    tokenVerification
  };

  const userId = await createUser(userData)

  if (role === 'client') {
    await createClient(userId)
  }

  return userId
}

async function login(formData) {
  const { email, motPass } = formData

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