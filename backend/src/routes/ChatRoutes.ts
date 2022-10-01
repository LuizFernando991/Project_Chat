import express from 'express'
import ChatController from '../controllers/ChatController'

const router = express.Router()

router.post('/create', ChatController.createChat)
router.get('/getUserChats', ChatController.getUserChats)
router.get('/getChat/:receiverUser', ChatController.getChat)

export default router