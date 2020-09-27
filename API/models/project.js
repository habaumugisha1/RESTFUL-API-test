import { string } from "joi"
import schemaValidation from "../helper/schemaValidation"
import mongoose from 'mongoose'
const projectSchema = mongoose.Schema({
    title:{type:String},
    hostedLink:{ type:String},
    projectImage:{ type:String},
    description:{ type:String},
    created_at:{ type: Date, default: Date.now }

})

export default mongoose.model('Projects', projectSchema)