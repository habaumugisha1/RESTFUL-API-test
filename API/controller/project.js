import cloudinary from 'cloudinary'
import Projects from '../models/project'
import cloudinaryConfig from '../middleware/cloudinary'

class Project{
static async createProject(req, res){
   const project =  await Projects.find({title:req.body.title})

        if(project.length >=1 ) return res.status(409).json({status:409, message:"This project is already exist"});
        if(project.length == 0) {
            const file = req.files.projectImage;
            cloudinary.config(cloudinaryConfig)
            cloudinary.uploader.upload(file.tempFilePath, async (results) => {
                const newProject = new Projects({
                    title:req.body.title,
                    hostedLink:req.body.hostedLink,
                    projectImage:results.url,
                    description:req.body.description,
                    created_at: new Date()
                });
                await newProject.save((err, data) => {
                    return res.status(201).json({
                 status:201, message:"project successful created", data
             })
                })
                
            })
        }
      
}

static getProject(req, res){
    Projects.find().exec().then( project =>{
        res.status(200).json({status:200, project})
    })
}

static async deleteProject(req, res){
    let projectId = req.params.id;
    await Projects.findById(projectId, async (err, project) => {
    if(!project) return res.status(404).json({status:404, message:"This project not found!"})
    await project.remove({projectId:projectId}, (err, data) => {
        return res.status(200).json({status:200, message:"Project successful deleted", data})
    })
 });
}

static async updateProject (req, res) {
    let projectId = req.params.id;
    await Projects.findById(projectId, async (err, project) => {
        if(!project) return res.status(404).json({status:404, message:"This project not found!"})
        if(req.files === null){
            await Object.assign(project, {title:req.body.title,hostedLink:req.body.hostedLink, description:req.body.description}).save((error, data) =>{
                    if(error) return res.status(400).json({err:error.message})
                    return res.status(200).json({status:200, message:"Project successful updated", data})
                })
        } else if(req.files.projectImage){
           cloudinary.config(cloudinaryConfig)
           const file = req.files.projectImage;
           cloudinary.uploader.upload(file.tempFilePath, async (image) => {
            await Object.assign(project, {projectImage:image.url}).save((err, imageURL) =>{
                return res.status(200).json({status:200, message:"Project successful updated", imageURL})
      })
           })
        }
    })
}

}

export default Project