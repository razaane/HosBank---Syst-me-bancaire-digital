const db = require('../config/connexion');
const Utilisateur = require('../models/Utilisateur');

async function findById(id) {
  const [rows] = await db.query('SELECT * FROM utilisateurs WHERE id = ? LIMIT 1', [id]);
  return rows[0] ? new Utilisateur(rows[0]) : null;
}

async function findByEmail(email) {
  const [rows] = await db.query(
    'SELECT * FROM utilisateurs WHERE email = ? LIMIT 1',
    [email]
  );
  return rows[0] ? new Utilisateur(rows[0]) : null;
}
async function createUser(userData) {
  const { nom, prenom, email, motDePasse, role, tokenVerification } = userData;
  const [result] = await db.query(
    `INSERT INTO utilisateurs (nom, prenom, email, mot_de_passe, role, token_verification)
     VALUES (?, ?, ?, ?, ?, ?)`,
    [nom, prenom, email, motDePasse, role || 'client', tokenVerification]
  );
  return result.insertId;
}

async function createClient(userId) {
  await db.query('INSERT INTO clients (id) VALUES (?)', [userId]);
}

async function verifyUserToken(token) {
  const [rows] = await db.query(
    'SELECT * FROM utilisateurs WHERE token_verification = ?',
    [token]
  );
  if (rows.length === 0) return null;

  const user = rows[0];
  await db.query(
    `UPDATE utilisateurs
     SET email_verifie = TRUE, actif = TRUE, token_verification = NULL
     WHERE id = ?`,
    [user.id]
  );
  return new Utilisateur(user);
}

async function updateTelephone(id, telephone) {
  await db.query('UPDATE utilisateurs SET telephone = ? WHERE id = ?', [telephone, id]);
}
async function updateEmail(id, email) {
  await db.query('UPDATE utilisateurs SET email = ? WHERE id = ?', [email, id]);
}
async function updatePassword(id, motDePasseHash) {
  await db.query('UPDATE utilisateurs SET mot_de_passe = ? WHERE id = ?', [motDePasseHash, id]);
}
module.exports = { findByEmail, createUser, verifyUserToken, createClient, findById, updateTelephone, updateEmail, updatePassword };

