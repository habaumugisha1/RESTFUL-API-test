import express from 'express'
import Articles from '../models/article'
import cloudinary from 'cloudinary'
import Comments from '../models/comment'


import cloudinaConfig from '../middleware/cloudinary'


 class Article{

   static async createArticle(req, res){
    
    cloudinary.config(cloudinaConfig)

    const file = req.files.articleImage
   cloudinary.uploader.upload(file.tempFilePath, async (results, err) => {
        
      if(err) {
        console.log(err + "  check error here")
        return res.status(400).json({error:err.message})
      }
     
  

  console.log(" This is a link of file uploaded  ....." + results.url)

      const article  = new Articles ({
        title:req.body.title,
        articleImage:results.url,
        description:req.body.description,
        created_at: new Date()
      
        });

      await article.save((err, data)=>{
          if(err){
           console.log(err.message + " which errors")
          }
          return res.status(201).json({
            status:201,
            message: "successfully created article.",
            data
            })
        })

     })

        
    

   

     
   }
//getting all blog
   static getAllBlogs(req, res){
     Articles.find().exec().then((blogs) => {
      return res.status(200).json({
        status:200,
        message:"The blogs fetched",
        data:blogs
      })
     })
   }
//single Blog
   static singleBlog(req, res){
     const articleId = req.params.id;
     Articles.findById(req.params.id, async (err, results) =>{
       if(!results) return res.status(404).json({status:404, message:`No article found with this id ${articleId}`});
       const count = [];
       await Comments.find({articleId:results._id}, (err, comment) => {
        //  Comments.estimatedDocumentCount({}, (count))
           count.push(comment);
           console.log(count)
       res.status(200).json({status:200, results, comments:{number:count[0].length,comment}})
       })
     })
    
     
   }

// delete a single article
   static async deleteBlog(req, res){
     const articleId = req.params.id
     await Articles.findById(req.params.id, async (err, results) =>{
       if(!results) return res.status(404).json({status:404, message:`No article found with this id ${articleId}`})
      
       if(err) return res.status(400).json({status:400, message:err.message})
      await results.remove({articleId:articleId}, (err, data) =>{
         
         if(err) return res.status(400).json({errors:"err.message"})
         return res.status(200).json({status:200, message:"Article deleted sucessfully!",data})
       })
      
     }) 
   }
//updating a single blog
   static async updateBlog(req, res){
     const articleId = req.params.id
     await Articles.findById(req.params.id, async (err, results) =>{
          if(!results) return res.status(404).json({status:404, message:`No article found with this id ${articleId}`})
          
          if(err) return res.status(400).json({status:400, message:err.message});
          if(req.files===null){
            await Object.assign(results, {title:req.body.title, description:req.body.description}).save({articleId:articleId}, (err, data) =>{
            
              if(err) return res.status(400).json({errors:err.message})
              return res.status(200).json({status:200, message:"Article updated sucessfully!",data})
              
          })
  
          } else if (req.files.articleImage){

              cloudinary.config(cloudinaConfig)
                const file = req.files.articleImage
                cloudinary.uploader.upload(file.tempFilePath, async (image) => {
                
                if(err) {
                    console.log(err.message + "  check error here")
                    return res.status(400).json({error:err.message})
                }
                await Object.assign(results, {articleImage:image.url}).save({articleId:articleId}, (err, imageURL) => {
                 return res.status(200).json({
                   status:200,
                    message:"Article updated sucessfully!",
                    data:image.url
                    })
                })
            })
          }
     })
      
   }

 }

 export default Article