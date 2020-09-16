import express from 'express'
import bodyParser from "body-parser"
import mongoose from 'mongoose'
import "dotenv/config"
import myRouter from './API/router/routes'


const app = express()
const PORT = process.env.PORT
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}))

const url = process.env.DB_CONFIG;
app.use('/api/v1', myRouter)

mongoose.connect( url, { useNewUrlParser: true,  useUnifiedTopology: true}).then( () =>{
    console.log("connected to mongodb")
    
});

app.listen( PORT, ()=> {
    console.log(`server is running on ${PORT}...`)
})

export default app;




