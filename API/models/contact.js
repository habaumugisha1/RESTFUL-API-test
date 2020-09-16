import mongoose from 'mongoose';

const contactSchema = mongoose.Schema({
    name:{ type:String},
    email:{ type:String},
    content:{ type:String},
    created_at:{ type: Date, default: Date.now }
   
});

export default mongoose.model('Contacts', contactSchema)