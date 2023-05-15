/// <reference types="@types/jest" />;
import events from 'events'
import { VideoService } from '../../../src/services/video'

jest.mock('../../../src/utils', () => ({
  DBConnection: {
    getInstance: jest.fn(() => ({
      query: jest.fn((sql: string, arg: any[]) => {
        switch (sql) {
          case 'INSERT INTO app.video (id, email, title, description, create_at) SELECT CAST($1 AS VARCHAR), CAST($2 AS VARCHAR), CAST($3 AS TEXT), CAST($4 AS TEXT), CAST($5 AS TIMESTAMP) WHERE NOT EXISTS (SELECT id FROM app.video WHERE id = $1)':
            if (arg[1] === 'admin@gmail.com') {
              return {
                rowCount: 1
              }
            }
            return {
              rowCount: 0
            }
          case 'SELECT id, email, title, description  FROM app.video ORDER BY create_at DESC LIMIT $1 OFFSET $2':
            return {
              rows: []
            }
          default:
            break
        }
      })
    }))
  },
  eventEmitter: new events.EventEmitter()
}))

global.fetch = jest.fn((url) => {
  if (
    url === `https://www.googleapis.com/youtube/v3/videos?id=bWu9O8jHEuE&key=${process.env.GOOGLE_API_KEY}&part=snippet`
  ) {
    return Promise.resolve({
      json: () => ({
        items: [
          {
            snippet: {
              title: 'video title',
              description: 'video description'
            }
          }
        ]
      })
    })
  }
  return Promise.resolve({
    json: () => ({
      items: []
    })
  })
}) as any

describe('Unit Test - Video Service', () => {
  test('VideoService should be defined', async () => {
    const videoService = new VideoService()
    expect(videoService).toBeDefined()
  })

  test('getInstance function should be defined', async () => {
    expect(VideoService.getInstance()).toBeDefined()
  })

  describe('select function', () => {
    test('should return data', async () => {
      expect(await VideoService.getInstance().select(1, 0)).toEqual([])
    })
  })

  describe('insert function', () => {
    test('should return data', async () => {
      const url = 'https://www.youtube.com/watch?v=bWu9O8jHEuE'
      const email = 'admin@gmail.com'
      process.env.GOOGLE_API_KEY = 'GOOGLE_API_KEY'
      expect(await VideoService.getInstance().insert(url, email)).toEqual(undefined)
    })

    test('should throw error with Youtube video does not exist', async () => {
      const url = 'https://www.youtube.com/watch?v=not-exist'
      const email = 'admin@gmail.com'

      let err
      try {
        await VideoService.getInstance().insert(url, email)
      } catch (error) {
        err = error
      }
      expect(err).toBeDefined()
    })

    test('should throw error with Video exists', async () => {
      const url = 'https://www.youtube.com/watch?v=bWu9O8jHEuE'
      const email = 'no-account@gmail.com'

      let err
      try {
        await VideoService.getInstance().insert(url, email)
      } catch (error) {
        err = error
      }
      expect(err).toBeDefined()
    })
  })
})
