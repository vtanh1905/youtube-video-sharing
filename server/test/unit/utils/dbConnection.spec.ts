/// <reference types="@types/jest" />;
import { DBConnection } from '../../../src/utils'

describe('Unit Test - DBConnection utils', () => {
  test('DBConnection should be define', () => {
    const dbConnection = new DBConnection()
    expect(dbConnection).toBeDefined()
    expect(DBConnection.getInstance()).toBeDefined()
  })
})
