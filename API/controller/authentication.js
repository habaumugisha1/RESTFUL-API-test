import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken';

import Users from '../models/userModal';
import {loginSchema, signupSchema} from '../helper/validation'


class Auth{
    static signup(req, res){
        const {email, userRole, password} = req.body;

        const validation = signupSchema.validate(req.body)
        if(validation.error){
            res.status(400).json(validation.error.details[0].message);
        } else{

            Users.find({email:req.body.email}).then( user => {
                if(user.length>=1){
                    return res.status(409).json({
                        message:"This email already used!"
                    })
                } else {
    
                      bcrypt.hash(req.body.password, 10, (err, hash) =>{
                        if(err){
                                    return res.status(500).json({
                                        status:500,
                                        error:err.message
                                    });
                                } 
                        else {
                            const user = new Users({
                                email: req.body.email,
                                userRole: req.body.userRole,
                                password: hash 
                            })
                            user.save().then((result) =>{
                                jwt.sign({
                                    email:req.body.email,
                                    userRole:req.body.userRole
                                }, process.env.SECRET_KEY, (err,token) =>{
                                    if(err) return res.status(500).json({error:err.messsage});
                                    return res.status(201).json({
                                        status:201,
                                        message:"User successful created!",
                                        user:result,
                                        token
                                    });
                                })
                            }).catch( err => {
                                console.log(err.message);
                                return res.status(500).json({
                                    error:err.message
                                });
                            })
            
                         }
                    })
                }
            }).catch( err => {
                console.log(err.message);
                return res.status(500).json({
                    error:err.message
                });
            })
        }

    }
    

    static login(req, res){
        // finding user if exist
        const {email, password} = req.body;
       const validation =  loginSchema.validate(req.body);
   if(validation.error){
   res.status(400).json(validation.error.details[0].message);
   } else{
        Users.find({email:req.body.email}).then( user =>{
            if(user.length<1) {
                return res.status(404).json({message:`You don't have account with this ${req.body.email}`})
            } else {
                bcrypt.compare(req.body.password, user[0].password, (err, result) => {
                    if(err){
                        return res.status(401).json({
                            status:401,
                            message:err.message
                        })
                     }
                     if(!result) {
                        return res.status(401).json({
                            message:"Pssword incorrect!"
                        })
                     }
                    if(result) {
                        jwt.sign({
                            userId:user[0]._id,
                            email:user[0].email,
                            role: user[0].userRole
                        },
                        process.env.SECRET_KEY, 
                        (err, data) => {
                            if(err){
                                return res.status(500).json({
                                    error:err.message
                                })
                            } else {
                                res.status(200).json({
                                    message: "Log In successful",
                                    token :data
                                })
                            }
                        })
                    }
                })
            }
        }).catch( err => {
            return res.status(500).json({error: err.message})
        })
      }
    }
}

export default Auth;