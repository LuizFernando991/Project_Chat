import { Request, Response } from 'express'
import getUserByToken from '../helpers/getUserByToken'
import Chat from '../models/Chat'
import User from '../models/User'

export default class ChatController {

    public static async createChat(req: Request, res: Response): Promise<Response> {

        const { receiverUser } : { receiverUser: string} = req.body
        const currentUserId = getUserByToken(req)
        if(currentUserId === 'invalid token') {
            return res.status(422).json({ message: 'invalid token'})
        }
        //Getting current User from Database
        const user = await User.findById(currentUserId)
        if(!user) {
            return res.status(500).json({ message: 'internal error'})
        }
        //Getting second user
        const secondUser = await User.findOne({ usename: receiverUser})
        if(!secondUser) {
            return res.status(404).json({ message: 'user not found'})
        }
        const NewChat = new Chat({
            members: [user._id, secondUser._id]
        })

        try {
            const data = await (await NewChat.save()).populate("members", ["name", "username", "imageProfile"])
            return res.status(200).json({ data })
        } catch(err) {
            return res.status(500).json({ message: 'internal error'})
        }
    }

    public static async getUserChats(req: Request, res: Response): Promise<Response> {
        //Getting current user ID
        const currentUserId = getUserByToken(req)
        if(currentUserId === 'invalid token') {
            return res.status(422).json({ message: 'invalid token'})
        }
        //Returning all chats
        try {
            const chats = await Chat.find({ members: {$in: [currentUserId]} }).populate("members", ["name", "username", "imageProfile"])
            return res.status(200).json({ chats })
        } catch(err) {
            return res.status(500).json({ message: 'internal error'})
        }
    }

    public static async getChat(req: Request, res: Response): Promise<Response> {
        const receiverUser  = req.params.receiverUser
        const currentUserId = getUserByToken(req)       
        if(currentUserId === 'invalid token') {
            return res.status(422).json({ message: 'invalid token'})
        }
        //Getting current User from Database
        const user = await User.findById(currentUserId)
        if(!user) {
            return res.status(500).json({ message: 'internal error'})
        }
        //Getting second user
        const secondUser = await User.findOne({ usename: receiverUser})
        if(!secondUser) {
            return res.status(404).json({ message: 'user not found'})
        }

        try {
            const chat = await Chat.findOne({ members: {$all: [user._id, secondUser._id]} })
            return res.status(200).json({ chat })
        }   catch(err) {
            return res.status(500).json({ message: 'internal error'})
        }
    }
}