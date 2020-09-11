import Joi from 'joi';

export const signupSchema = Joi.object().keys({
    email: Joi.string().email().required(),
    userRole: Joi.string().min(3).required(),
    password: Joi.string().min(5).max(10).regex(/^[a-zA-Z0-9]{6,16}$/).required()
})

export const loginSchema = Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().min(5).max(10).required()
})

// export default loginSchema, signupSchema;