import 'dotenv/config'
import express, { Express } from 'express'
import * as swaggerUi from 'swagger-ui-express'
import fs from 'fs'
import * as YAML from 'yaml'
import * as bodyParser from 'body-parser';

import { accountController } from './controllers'
import { errorHandlerMiddleware } from './middlewares'

const swaggerDocument = YAML.parse(fs.readFileSync(`${__dirname}/../swagger/openapi.yaml`, 'utf8'))

const app: Express = express()
const port = process.env.PORT

app.use(bodyParser.json())

// Setup Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

// Import Controllers
app.use('/account', accountController)

// Error Handler
app.use(errorHandlerMiddleware)

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`)
})
