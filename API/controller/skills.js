import Skills from '../models/skill'
import cloudinary from 'cloudinary'
import cloudinaryConfig from '../middleware/cloudinary'

class Skill {
    static createSkills(req, res) {
        console.log("we are in skills controller")
        cloudinary.config(cloudinaryConfig)
        const file = req.files.skillImage
        cloudinary.uploader.upload(file.tempFilePath, async (results, err) =>{

          const my_skills = new Skills({
              name:req.body.name,
              skillImage : results.url,
              created_at: new Date()
          })
         await my_skills.save((err, data) => {
             
             return res.status(201).json({
                 status:201, message:"Skill successful created", data
             })
         })
         
        })
    }

    // getting skills
    static getSkills(req, res){
        Skills.find().exec().then((skills) => {
             Skills.estimatedDocumentCount({}, (err, c) =>{ console.log(c)
            return res.status(200).json({status:200, message:"This is the contacts", count:c, data:skills})
            }
            )
        })
    }

    // getting a single skill

    static async singleSkill(req, res){
        const skillId = req.params.id;
       await Skills.findById(skillId, (err, results) => {
           if(!results) return res.status(404).json({status:404, message:`No skill found with this id ${skillId}`})
           return res.status(200).json({status:200, results})
       })

    }
    // delete a skill by admin
    static async deleteSkills(req, res){
        const skillId = req.params.id;
        await Skills.findById(skillId, async(err, results) =>{
            if(!results) return res.status(404).json({status:404, message:"This skill is not found in database"})
            await results.remove({skillId:skillId}, (error, data) =>{
                return res.status(200).json({status:200, message:"Skill successful deleted", data})
            })
        })
    }

    // delete a skill by admin
    static async updatekills(req, res){
        const skillId = req.params.id;
        await Skills.findById(skillId, async (err, results) =>{
            if(!results) return res.status(404).json({status:404, message:"This skill is not found in database"});
            if(req.files === null){
                await Object.assign(results, {name:req.body.name}).save((error, data) =>{
                    if(error) return res.status(400).json({err:error.message})
                    return res.status(200).json({status:200, message:"Skill successful updated", data})
                })
            } else if(req.files.skillImage){
              
               cloudinary.config(cloudinaryConfig)
               let file = req.files.skillImage;
               cloudinary.uploader.upload(file.tempFilePath, async (image) => {
    
                    await Object.assign(results, {skillImage:image.url}).save((err, imageURL) =>{
                        return res.status(200).json({
                   status:200,
                    message:"Skill updated sucessfully!",
                    data:imageURL
                    })
                    })

               })
           }
        })
    }
}

export default Skill