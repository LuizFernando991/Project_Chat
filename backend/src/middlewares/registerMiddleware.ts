import { Response, Request, NextFunction } from 'express'

export default function registerMiddleware(req: Request, res: Response, next: NextFunction) {
    const { name, username, password } = req.body
    // Validade if all data is not empty
    if(!name){
        return res.status(422).json({ message : 'name is required'})
    }
    if(!username){
        return res.status(422).json({ message : 'username is required'})
    }
    if(!password){
        return res.status(422).json({ message : 'password is required'})
    }
    next()
}