import 'dotenv/config'
import {app} from './app'
import {SERVER_PORT} from './config'
const start = async () => {
app.listen(SERVER_PORT, () => console.log(`Server listening at http://localhost:${SERVER_PORT}`))
}
// Running the App
start().catch(err => console.log(err))