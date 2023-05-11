import DBConnection from '../utils/dbConnection'

import { CustomError } from '../common'

export class VideoService {
  static #instance: VideoService

  public static getInstance() {
    if (!VideoService.#instance) {
      VideoService.#instance = new VideoService()
    }
    return VideoService.#instance
  }

  public async insert(url: string, description: string, email: string) {
    try {
      // Get VideoId
      const videoId = url.split('v=')[1]

      // Validator youtube video exists
      const req = await fetch(`https://img.youtube.com/vi/${videoId}/mqdefault.jpg`)
      if (req.status !== 200) {
        throw new CustomError(404, { message: 'Youtube video does not exist' })
      }

      // Insert
      const result = await DBConnection.getInstance().query(
        'INSERT INTO app.video (id, description, email) SELECT CAST($1 AS VARCHAR), CAST($2 AS VARCHAR), CAST($3 AS VARCHAR) WHERE NOT EXISTS (SELECT id FROM app.video WHERE id = $1)',
        [videoId, description, email]
      )

      // Validator Video exists
      if (result.rowCount === 0) {
        throw new CustomError(400, { message: 'Video exists' })
      }
    } catch (error) {
      throw error
    }
  }

  public async select(limit: number, offset: number) {
    try {
      const result = await DBConnection.getInstance().query('SELECT * FROM app.video LIMIT $1 OFFSET $2', [
        limit,
        offset
      ])

      return result.rows
    } catch (error) {
      throw error
    }
  }
}
