import express from 'express'
import Auth from '../controller/authentication'
import ContactMessag from '../controller/contact';
import Article from '../controller/article'
import validation from '../helper/schemaValidation'
import Authorize from  '../middleware/authorization'
import Skill from '../controller/skills'
import Comment from '../controller/comments'
import Project from '../controller/project'
import Profile from '../controller/profile'


const router = express.Router()

//Authentication

router.post('/auth/signup', Auth.signup);
router.post('/auth/login', Auth.login);

// create contacts message
router.post('/newContact', validation.isValid(validation.schema.contact), ContactMessag.createContact )
router.get('/contacts', Authorize.isAdmin, ContactMessag.getContacts)

// articles router
router.post('/newArticle', Authorize.isAdmin, validation.isValid(validation.schema.article), Article.createArticle)
router.get('/blogs', Article.getAllBlogs)
router.get('/blogs/:id', Article.singleBlog)
router.delete('/blogs/:id', Authorize.isAdmin, Article.deleteBlog)
router.put('/blogs/:id/edit', Authorize.isAdmin, Article.updateBlog)

//blog's comments
router.post('/blog/:id/newComment', validation.isValid(validation.schema.comment), Comment.createComments);

// Skills router
router.post('/addSkills', Authorize.isAdmin, validation.isValid(validation.schema.skill), Skill.createSkills);
router.get('/skills', Skill.getSkills)
router.get('/skills/:id', Skill.singleSkill);
router.delete('/skills/:id/delete', Authorize.isAdmin, Skill.deleteSkills);
router.patch('/skills/:id/edit', Authorize.isAdmin, Skill.updatekills)

// create project
router.post('/newProject', Authorize.isAdmin, validation.isValid(validation.schema.project), Project.createProject)
router.get('/projects', Project.getProject)
router.delete('/projects/:id/delete', Authorize.isAdmin, Project.deleteProject)
router.patch('/projects/:id/edit', Authorize.isAdmin, Project.updateProject)

// user profile
router.get('/profile', Authorize.isAdmin, Profile.getProfile)
export default router