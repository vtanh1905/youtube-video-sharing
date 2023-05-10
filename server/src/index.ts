import 'dotenv/config'
import express, { Express, NextFunction, Request, Response } from 'express'
import * as swaggerUi from 'swagger-ui-express'
import fs from 'fs'
import * as YAML from 'yaml'

import { accountController } from './controllers'

const swaggerDocument = YAML.parse(fs.readFileSync(`${__dirname}/../swagger/openapi.yaml`, 'utf8'))

const app: Express = express()
const port = process.env.PORT

// Setup Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

// Import Controllers
app.use('/account', accountController)

// Error Handler
app.use((error: any, req: Request, res: Response, next: NextFunction) => {
  if (res.headersSent) {
    return next(error)
  }
  res.status(error.status || 500).json({ error })
  res.end()
})

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`)
})
