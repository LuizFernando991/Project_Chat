import { Request, Response } from 'express'
import User from '../models/User'
import bcrypt from 'bcrypt'
import createToken from '../helpers/createToken'

export default class UserController {
    public static async registerUser(req: Request, res: Response): Promise<Response> {
        const { name, username, password } : { name: string, username: string, password: string} = req.body
        //Checking if username is already used
        const checkUsername = await User.findOne({ username })
        if(checkUsername) {
            return res.status(422).json({ message : 'username is already used'})
        }
        const image = req.file
        let imageName = ''
        if(image) {
            imageName = image.filename
        }
        //Encrypting password
        const salt = await bcrypt.genSalt(12)
        const passwordHash = await bcrypt.hash(password.trim(), salt)
        //Create new User
        const user = new User({
            name,
            username,
            password: passwordHash,
            imageProfile: imageName,
        })
        try {
            const data = await user.save()
            return createToken(data, req, res)
        } catch(err) {
            return res.status(500).json({ message : 'internal error'})
        }

    }
    public static async login(req: Request, res: Response): Promise<Response> {
        const { username, password }: {username: string, password: string} = req.body
        //Get user from database
        const user = await User.findOne({ username })
        if(!user){
            return res.status(422).json({message : 'user not found'})
        }
        //Verify password
        const checkPassword = await bcrypt.compare(password, user.password)
        if(!checkPassword){
            return res.status(422).json({message : 'wrong password'})
        }
        return createToken(user, req, res)
    }
}