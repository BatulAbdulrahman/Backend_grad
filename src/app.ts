import express, {Application} from 'express'
export const app: Application = express()

app.use('/', (req, res)=>{
    res.send({msg:"hello Batul"})
})