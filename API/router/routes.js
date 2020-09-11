import express from 'express'
import Auth from '../controller/authentication'

const router = express.Router()

//Authentication

router.post('/auth/signup', Auth.signup);
router.post('/auth/login', Auth.login);

export default router