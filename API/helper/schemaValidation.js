import joi from '@hapi/joi'
import { required } from 'joi';

export default {
    schema : {
        contact : joi.object().keys({
            name:joi.string().min(3).required(),
            email:joi.string().email().required(),
            content: joi.string().required()
        }),
        article: joi.object().keys({
          title:joi.string().min(5).required(),
          articleImage:joi.string(),
          description:joi.string().required()
        }),
        skill : joi.object().keys({
          name:joi.string().min(3).required(),
          skillImage:joi.string()
        }),
        comment: joi.object().keys({
          name:joi.string().required(),
          description:joi.string().required()
     }),
     project:joi.object().keys({
       title:joi.string().required(),
       hostedLink:joi.string(),
       projectImage:joi.string(),
       description:joi.string().required()
     })
    },
    
    isValid : (schema) => {
         return (req, res, next) => {
           joi.validate( req.body, schema, (err, results) => {
               //if there is validation error it will return validation error message
               if(err){
                 return res.status(400).json({status: 400, error: err.details[0].message});
               } 
                if(results){
                  return next()
               }
           }) 

             
         }
     }
}