import multer from 'multer'

// making a structure of image that will be stored
const storage = multer.diskStorage({
    // making folder where the images will be stored
    destination: (req, file, cb) => {
      cb(null, './images/')
    }, 
    // making the name of image
    filename: (req, file, cb) => {
      cb(null, new Date().toISOString() + file.originalname)
    }
})

// accepting only images
const fileFilter = (req, file, cb) =>{
   if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/jpg'){
    // accept all kind of images
    cb(null, true)
   } else {
    // reject none image
    cb(null, false);
   }
}
const upload = multer({
    storage:storage,
     limits:{
        fileSize: 1024 * 1024 * 3
    },
    fileFilter:fileFilter
});

export default upload;