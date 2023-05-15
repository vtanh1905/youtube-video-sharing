/// <reference types="@types/jest" />;
import * as dotenv from 'dotenv'
import * as jwt from 'jsonwebtoken'

import { VideoService } from '../../../src/services'
import { DBConnection } from '../../../src/utils'

dotenv.config({ path: `${__dirname}/../../../../.env` })

describe('Integration Test - VideoService', () => {
  describe('select function', () => {
    test('should be successful', async () => {
      const result = await VideoService.getInstance().select(3, 0)
      expect(result.length).toEqual(3)
    })
  })

  describe('insert function', () => {
    const videoId = 'HHkanUBpDBw'
    test('should be successful', async () => {
      await VideoService.getInstance().insert(`https://www.youtube.com/watch?v=${videoId}`, 'admin@gmail.com')
    })

    test('should be fail because Youtube video does not exist', async () => {
      let err
      try {
        await VideoService.getInstance().insert(`https://www.youtube.com/watch?v=123456`, 'admin@gmail.com')
      } catch (error) {
        err = error
      }
      expect(err).toBeDefined()
    })

    test('should be fail because Youtube Video exists', async () => {
      let err
      try {
        await VideoService.getInstance().insert(`https://www.youtube.com/watch?v=${videoId}`, 'admin@gmail.com')
      } catch (error) {
        err = error
      }
      expect(err).toBeDefined()
    })

    afterAll(async() => {
      await DBConnection.getInstance().query('DELETE FROM app.video WHERE id=$1', [videoId])
    })
  })

  afterAll(() => {
    DBConnection.getInstance().end()
  })
})
