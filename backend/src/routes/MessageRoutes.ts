import express from 'express'
import MessageController from '../controllers/MessageController'

const router = express.Router()

router.post('/addmessage', MessageController.createMessage)
router.get('/:chatId', MessageController.getMessages)


export default router