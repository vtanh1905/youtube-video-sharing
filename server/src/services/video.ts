import { DBConnection } from '../utils'

import { CustomError } from '../common'
import { eventEmitter } from '../utils'

export class VideoService {
  static #instance: VideoService

  public static getInstance() {
    if (!VideoService.#instance) {
      VideoService.#instance = new VideoService()
    }
    return VideoService.#instance
  }

  public async insert(url: string, email: string) {
    try {
      // Get VideoId
      const videoId = url.split('v=')[1]

      // Get Data of Youtube Video
      const req = await fetch(
        `https://www.googleapis.com/youtube/v3/videos?id=${videoId}&key=${process.env.GOOGLE_API_KEY}&part=snippet`
      )
      const video = await req.json()

      // Validator youtube video exists
      if (video.items.length === 0) {
        throw new CustomError(404, { message: 'Youtube video does not exist' })
      }
      const { title, description } = video.items[0].snippet

      // Insert
      const result = await DBConnection.getInstance().query(
        'INSERT INTO app.video (id, email, title, description, create_at) SELECT CAST($1 AS VARCHAR), CAST($2 AS VARCHAR), CAST($3 AS TEXT), CAST($4 AS TEXT), CAST($5 AS TIMESTAMP) WHERE NOT EXISTS (SELECT id FROM app.video WHERE id = $1)',
        [videoId, email, title, description, new Date()]
      )

      // Validator Video exists
      if (result.rowCount === 0) {
        throw new CustomError(400, { message: 'Video exists' })
      }

      // Emit Event New Video
      eventEmitter.emit('NEW_VIDEO', {
        id: videoId,
        title,
        email,
        description
      })
    } catch (error) {
      throw error
    }
  }

  public async select(limit: number, offset: number) {
    try {
      const result = await DBConnection.getInstance().query(
        'SELECT id, email, title, description  FROM app.video ORDER BY create_at DESC LIMIT $1 OFFSET $2',
        [limit, offset]
      )

      return result.rows
    } catch (error) {
      throw error
    }
  }
}
