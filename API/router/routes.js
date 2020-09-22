import express from 'express'
import Auth from '../controller/authentication'
import ContactMessag from '../controller/contact';
import Article from '../controller/article'
import validation from '../helper/schemaValidation'
import Authorize from  '../middleware/authorization'
import uploadImage from '../middleware/uploadImage'


const router = express.Router()

//Authentication

router.post('/auth/signup', Auth.signup);
router.post('/auth/login', Auth.login);

// create contacts message
router.post('/newContact', validation.isValid(validation.schema.contact), ContactMessag.createContact )

// articles router
router.post('/newArticle', Authorize.isAdmin, validation.isValid(validation.schema.article), Article.createArticle)
router.get('/blogs', Article.getAllBlogs)
router.get('/blogs/:id', Article.singleBlog)
router.delete('/blogs/:id', Authorize.isAdmin, Article.deleteBlog)
router.put('/blogs/:id/edit', Authorize.isAdmin, Article.updateBlog)

export default router