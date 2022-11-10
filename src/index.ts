import 'dotenv/config'
import {knex}        from '../knexfile'
import { Model } from 'objection'
import {app} from './app'
import {SERVER_PORT} from './config'
const start = async () => {
    Model.knex(knex) //model connected to database
app.listen(SERVER_PORT, () => console.log(`Server listening at http://localhost:${SERVER_PORT}`))
}
// Running the App
start().catch(err => console.log(err))