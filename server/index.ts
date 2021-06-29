import express, { Response } from 'express'
import session from 'express-session'
import bodyParser from 'body-parser'
import { createApi } from './api'

function createServer() {
  const app = express()

  app.use(bodyParser.json())

  app.use(
    session({
      secret: 'shopping',
      resave: false,
      saveUninitialized: false,
      cookie: {
        maxAge: 24 /* hour */ * 60 /* min */ * 60 /* s */ * 1000 /* ms */,
      },
    })
  )

  app.get('/test', (_req, res: Response) => {
    res.send('sample')
  })

  app.use('/api', createApi())

  return app
}

export default createServer()
