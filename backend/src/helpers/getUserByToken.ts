import { Request } from 'express'
import jwt from 'jsonwebtoken'

interface IJwtPayload{
    id : string
}

export default function getUserByToken (req: Request): string {
    const authHeader = req.headers.authorization
    const token = authHeader?.split(" ")[1]
    if(!token) {
        return 'invalid token'
    }
    const { id } = jwt.verify(token, 'secret') as IJwtPayload
    return id
}
