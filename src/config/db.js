import mysql from 'mysql2/promise'


const pool = mysql.createPool({

  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,

  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,

})

try{

    const connection= await pool.getConnection()

    console.log(' Connected successfully')
  connection.release()

}catch(error){

console.log('connection failed ', error.message)
}

export default pool;