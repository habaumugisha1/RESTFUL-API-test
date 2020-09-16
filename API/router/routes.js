import express from 'express'
import Auth from '../controller/authentication'
import ContactMessag from '../controller/contact';
import validation from '../helper/schemaValidation'


const router = express.Router()

//Authentication

router.post('/auth/signup', Auth.signup);
router.post('/auth/login', Auth.login);

// create contacts message
router.post('/newContact', validation.isValid(validation.schema.contact), ContactMessag.createContact )

export default router