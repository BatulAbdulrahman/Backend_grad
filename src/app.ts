import { PUBLIC_PATH } from './config'
import express, {Application} from 'express'
import { applyRoutes } from './Routes'

export const app: Application = express()

app.use(express.static(PUBLIC_PATH))
app.use(applyRoutes())