const { Pool } = require('pg')
const fs = require('fs')
const dotenv = require('dotenv');

dotenv.config({ path: `${__dirname}/../../.env` })

async function main() {
  try {
    console.log('Initialize Database: Start')
    const pool = new Pool({
      connectionString: process.env.DATABASE_URL,
      ssl: process.env.DATABASE_SSL === 'true' ? true : false 
    })

    // Drop Schema
    await pool.query('DROP SCHEMA IF EXISTS app cascade;')

    // Run file schemas.sql
    const schemasSQL = fs.readFileSync(__dirname + '/schemas.sql').toString()
    await pool.query(schemasSQL)

    // Run file seeds.sql if environment is not equal to production
    if (process.env.NODE_ENV !== 'production') {
      const seedsSQL = fs.readFileSync(__dirname + '/seeds.sql').toString()
      await pool.query(seedsSQL)
    }

    await pool.end()
    console.log('Initialize Database: Complete')
  } catch (error) {
    throw error
  }
}

main()
