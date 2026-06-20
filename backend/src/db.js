const mysql = require('mysql2/promise')

const config = {
  host: process.env.DB_HOST || '127.0.0.1',
  port: Number(process.env.DB_PORT || 3306),
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'vve_meander1',
  connectionLimit: 10,
}

let pool

function getPool() {
  if (!pool) {
    pool = mysql.createPool(config)
  }
  return pool
}

async function query(sql, params = []) {
  const [rows] = await getPool().execute(sql, params)
  return rows
}

module.exports = { getPool, query }
