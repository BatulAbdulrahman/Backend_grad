import { CORS_ORIGIN, PUBLIC_PATH } from './config'
import express, {Application} from 'express'
import { applyRoutes } from './Routes'
import cors from 'cors'

export const app: Application = express()


app.use(cors({
    origin: CORS_ORIGIN,
    methods: [ 'GET', 'POST', 'PATCH', 'DELETE' ],
    credentials: true
}))

app.use(express.static(PUBLIC_PATH))
app.use(express.urlencoded({extended:true})) // it is accepts input 
app.use(express.json());
app.use(applyRoutes())