const db = require('../config/connexion');
const Utilisateur = require('../models/Utilisateur');

async function findByEmail(email) {
  const [rows] = await db.query(
    'SELECT * FROM utilisateurs WHERE email = ? LIMIT 1',
    [email]
  );
  return rows[0] ? new Utilisateur(rows[0]) : null;
}
async function findById(id) {
  const [rows] = await db.query('SELECT * FROM utilisateurs WHERE id = ? LIMIT 1', [id]);
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
  if (rows.length === 0) return null

  const user = rows[0]
  await db.query(
    `UPDATE utilisateurs
     SET email_verifie = TRUE, actif = TRUE, token_verification = NULL
     WHERE id = ?`,
    [user.id]
  );
  return new Utilisateur(user)
} 


async function findAll() 
    {

  const [rows] = await db.query(
    'SELECT * FROM utilisateurs ORDER BY nom')

  
  return rows.map(row => new Utilisateur(row));
}


async function updateUser(id, { nom, prenom, email, telephone }) {
  await db.query(
    'UPDATE utilisateurs SET nom = ?, prenom = ?, email = ?, telephone = ? WHERE id = ?',[nom, prenom, email, telephone, id])
  }


async function toggleActif(id) {

  await db.query('UPDATE utilisateurs SET actif = NOT actif WHERE id = ?', [id])
}


async function createChargeClient(userId, matricule) {


  await db.query('INSERT INTO charge_clients (id, matricule) VALUES (?, ?)', [userId, matricule])

}

async function assignerClientACharge(clientId, chargeClientId) {
 
await db.query('UPDATE clients SET charge_client_id = ? WHERE id = ?', [chargeClientId, clientId])

}

async function findAllChargeClients() {
  const [rows] = await db.query(`
    SELECT u.id, u.nom, u.prenom, c.matricule 
    FROM utilisateurs u 
    JOIN charge_clients c ON u.id = c.id 
    WHERE u.actif = TRUE
  `);
  return rows
}

async function updateRole(userId, newRole) {
  await db.query('UPDATE utilisateurs SET role = ? WHERE id = ?', [newRole, userId]);

}


async function findAllClients() {
  const [rows] = await db.query(`
    SELECT u.id, u.nom, u.prenom, u.email, u.actif, c.charge_client_id
    FROM utilisateurs u
    JOIN clients c ON c.id = u.id
    ORDER BY u.nom
  `)
  return rows
}

module.exports = { 
  findByEmail,findById , createUser,createClient,verifyUserToken,findAll,updateUser,toggleActif,createChargeClient,assignerClientACharge,findAllChargeClients,updateRole,findAllClients}