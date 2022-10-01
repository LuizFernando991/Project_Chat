import mongoose from '../db/conn'
import { Schema, Document, ObjectId } from 'mongoose'
import User from './User'
import Chat from './Chat'

export interface IMessage extends Document {
    chatId: ObjectId
    senderId: ObjectId
    text: string
}

const MessageSchema = new Schema({
    chatId: {
        type: Schema.Types.ObjectId,
        ref: Chat
    },
    senderId: {
        type: Schema.Types.ObjectId,
        ref: User
    },
    text: {
        type: String,
    }
}, { timestamps: true})

export default mongoose.model<IMessage>('Message', MessageSchema)