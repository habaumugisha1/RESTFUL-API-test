import mongoose from 'mongoose';

const bookSchema = mongoose.Schema({
    name:String,
    author:String  
});

export default mongoose.model('Book', bookSchema)