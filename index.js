import express from 'express'
import bodyParser from "body-parser"
import mongoose from 'mongoose'
import "dotenv/config"
import bookRouter from './API/router/books'


const PORT = process.env.PORT

const url = process.env.DB_CONFIG;
mongoose.connect( url, { useNewUrlParser: true,  useUnifiedTopology: true}).then( () =>{
    console.log("connected to mongodb")
    const app = express()

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended:false}))
    
    app.use('/books', bookRouter)
    
    app.listen( PORT, ()=> {
        console.log(`server is running on ${PORT}...`)
    })
})






