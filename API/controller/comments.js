import article from '../models/article'
import Articles from '../models/article'
import Comments from '../models/comment'

class Comment {
static async createComments(req, res){
    let articleId = req.params.id
    await Articles.findById(req.params.id, (err, article) => {
        if(!article) return res.status(404).json({status:404, message:"You can't comment unexist blog. Please try again!"})
        const comment = new Comments({
            name:req.body.name,
            articleId:article._id,
            description:req.body.description,
            created_at:new Date()
        })
        console.log(articleId)
        comment.save().then( (results) =>{
       res.status(201).json({
           status:201, 
            message:"Thank you for commenting on this blog",
            article:article, 
            comment:results
            })

        }).catch((err) => console.log(err.message))
    })
    
}
}

export default Comment