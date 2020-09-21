import mongoose from 'mongoose';

const articlechema = mongoose.Schema({
    title:{ type:String},
    articleImage:{ type:String},
    description:{ type:String},
    created_at:{ type: Date, default: Date.now }
   
});

export default mongoose.model('Articles', articlechema)