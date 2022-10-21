import { Request, Response } from 'express'
import getUserByToken from '../helpers/getUserByToken'
import Message from '../models/Message'
import Chat from '../models/Chat'

export default class MessageController {
    
    public static async createMessage(req: Request, res: Response): Promise<Response> {
        const { chatId, text }: { chatId: string, text: string } = req.body
        //Getting sender user
        const userId = getUserByToken(req)
        //Getting current chat
        const chat = await Chat.findById(chatId)
        if(!chat) {
            return res.status(404).json({ message: 'chat not found'})
        }
        const newMessage = new Message({
            chatId: chat._id,
            userId,
            text
        })

        try {
            const data = await newMessage.save()
            return res.status(200).json({ data }) 
        } catch(err) {
            return res.status(500).json({ message: 'internal error'})
        }

    }

    public static async getMessages(req: Request, res: Response) {
        const chatId = req.params.chatId
        try {
            const messages = await Message.find({ chatId })
            return res.status(200).json({ messages })
        } catch(err) {
            return res.status(500).json({ message: 'internal error'})
        }
    }
}