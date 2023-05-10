import 'dotenv/config'
import express, { Express, Request, Response } from 'express'
import * as swaggerUi from 'swagger-ui-express'
import fs from 'fs';
import * as YAML from 'yaml'

const swaggerDocument = YAML.parse(fs.readFileSync(`${__dirname}/../swagger/openapi.yaml`, 'utf8'))

const app: Express = express()
const port = process.env.PORT

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

app.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript Server')
})

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`)
})
