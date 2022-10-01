import express from 'express'
import UserController from '../controllers/UserController'
import imageUploader from '../helpers/imageUploader'
import registerMiddleware from '../middlewares/registerMiddleware'
import loginMiddleware from '../middlewares/loginMiddleware'

const router = express.Router()

router.post('/register', imageUploader.single('image'), registerMiddleware, UserController.registerUser)
router.post('/login', loginMiddleware, UserController.login)

export default router