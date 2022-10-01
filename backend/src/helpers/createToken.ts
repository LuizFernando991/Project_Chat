import jwt from 'jsonwebtoken'
import { Request, Response } from 'express'
import { IUser } from '../models/User'

export default async function createToken (user: IUser, req: Request, res: Response): Promise<Response> {
    const token = jwt.sign({
        id: user._id
    }, 'secret')
    const resUser = {
        name: user.name,
        _id: user._id,
        username: user.username,
        imageProfile: user.imageProfile
    }
    
    return res.status(200).json({
        message: 'authenticated',
        token,
        user: resUser
    })
}