import * as bcrypt from 'bcryptjs'

import DBConnection from '../utils/dbConnection'
import { CustomError } from '../common'

export class AccountService {
  static #instance: AccountService

  public static getInstance() {
    if (!AccountService.#instance) {
      AccountService.#instance = new AccountService()
    }
    return AccountService.#instance
  }

  public async insert(email: string, password: string) {
    try {
      // Hash Password
      const passwordHashed = bcrypt.hashSync(password)

      // Insert
      const result = await DBConnection.getInstance().query(
        'INSERT INTO app.account (email, password) SELECT CAST($1 AS VARCHAR), CAST($2 AS VARCHAR) WHERE NOT EXISTS (SELECT email FROM app.account WHERE email = $1)',
        [email, passwordHashed]
      )

      // Validator Email exists
      if (result.rowCount === 0) {
        throw new CustomError(400, { message: 'This email exists' })
      }
    } catch (error) {
      throw error
    }
  }
}
