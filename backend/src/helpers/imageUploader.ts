import multer from 'multer'
import path from 'path'

//Destination to store post images

const imageStorage = multer.diskStorage({
    destination : (req, file, cb)=>{
        cb(null, `src/public/images`)
    },
    filename: (req, file, cb)=>{
        cb(null, Date.now()+String(Math.floor(Math.random()*10))+path.extname(file.originalname))
    },
})

const imageUploader = multer({
    storage: imageStorage,
    fileFilter(req, file, cb){
        if(!file.originalname.match(/\.(png|jpg|jpeg)$/)){
            return cb(new Error ('file not suported'))
        }
        cb(null, true)
    }
})

export default imageUploader