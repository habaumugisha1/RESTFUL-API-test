import express from 'express'
import bodyParser from "body-parser"
import mongoose from 'mongoose'
import { Mockgoose } from 'mockgoose'
import fileupload from 'express-fileupload'
import swaggerUi from 'swagger-ui-express'
import swaggerDocument from './swagger.json'
import "dotenv/config"
import myRouter from './API/router/routes'


const app = express()
const PORT = process.env.PORT

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}))

app.use(fileupload({useTempFiles:true}))

// configuring swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

const url = process.env.DB_CONFIG;
app.use('/api/v1', myRouter)

if(process.env.NODE_ENV === 'test'){
const mockgoose = new Mockgoose(mongoose);
mockgoose.prepareStorage().then(() => {
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




