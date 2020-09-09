import express from 'express'
import Books from '../controller/books'

const router = express.Router()

router.get('/home', Books.getBooks)
router.post('/create', Books.createBook)

export default router