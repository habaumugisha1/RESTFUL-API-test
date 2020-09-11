import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
    email:{ type:String, required:true, match:[/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g]},
    userRole:{ type:String, required:true},
    password:{ type:String, required:true, min:[6, 'Password should be more than or equel 6 char'],
    max: [12, 'Password should be less than or equel to 12 char']},
     
});

export default mongoose.model('Users', userSchema)
