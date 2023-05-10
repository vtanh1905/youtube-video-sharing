import { Pool } from 'pg'

export default class DBConnection {
  static #pool: Pool

  public static getInstance() {
    if (!DBConnection.#pool) {
      DBConnection.#pool = new Pool({
        connectionString: process.env.DATABASE_URL
      })
    }
    return DBConnection.#pool
  }
}
