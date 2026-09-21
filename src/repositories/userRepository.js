import pool from '../config/db.js'


export async function findByEmail(email) {

    const [rows]=await pool.execute(

        'SELECT * FROM utilisateurs WHERE EMAIL = ? LIMIT 1',[email]
     )
     return rows[0] || null
    
}


export async function createUser (userData){

const { nom, prenom, email, motPass, roleUtilisateur, tokenVerification } = userData

const [result] = await pool.execute(

    `INSERT INTO utilisateurs (nom, prenom, email,
      motPass, roleUtilisateur, tokenVerification) 
      VALUES (?, ?, ?, ?, ?, ?)`,
    [nom, prenom, email, motPass, roleUtilisateur || 'client', tokenVerification]
  )
  return result.insertId;


}

export async function verifyUserToken(token) {
  const [rows] = await pool.execute(
    'SELECT * FROM utilisateurs WHERE tokenVerification = ?',
    [token]
  );
  
  if (rows.length === 0) return null;

  const user = rows[0]
  await pool.execute(
    `UPDATE utilisateurs 
     SET emailVerification = TRUE, actif = TRUE, tokenVerification = NULL 
     WHERE id = ?`,
    [user.id]
  );

  return user
}

// modulexports = {}