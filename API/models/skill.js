import mongoose from 'mongoose';

const skillSchema = mongoose.Schema({
    name:{ type:String},
    skillImage:{ type:String},
    created_at:{ type: Date, default: Date.now }
   
});

export default mongoose.model('Skills', skillSchema)