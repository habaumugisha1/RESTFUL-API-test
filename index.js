import express from 'express'
import bodyParser from "body-parser"
import mongoose from 'mongoose'
import { Mockngoose } from 'mongoose'
import fileupload from 'express-fileupload'
import "dotenv/config"
import myRouter from './API/router/routes'


const app = express()
const PORT = process.env.PORT

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}))

app.use(fileupload({useTempFiles:true}))

const url = process.env.DB_CONFIG;
app.use('/api/v1', myRouter)

if(process.env.NODE_ENV === 'test'){
const Mockngoose = new Mockngoose(mongoose);
mockngoose.prepareStorage().then(() => {
    mongoose.connect( url, { useNewUrlParser: true,  useUnifiedTopology: true}).then( () =>{
    console.log("connected to mongodb")
});
})
} else{
mongoose.connect( url, { useNewUrlParser: true,  useUnifiedTopology: true}).then( () =>{
    console.log("connected to mongodb cool")
    
});
}


app.listen( PORT, ()=> {
    console.log(`server is running on ${PORT}...`)
})

export default app;




