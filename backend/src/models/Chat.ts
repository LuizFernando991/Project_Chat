import mongoose from '../db/conn'
import { Schema, Document, ObjectId } from 'mongoose'
import User from './User'

export interface IChat extends Document {
    _id: ObjectId
    members: Array<{
        _id: ObjectId
    }>
}

const ChatSchema = new Schema({
    members: [{
        type: Schema.Types.ObjectId,
        ref: User
    }]
}, { timestamps: true})

export default mongoose.model<IChat>('User', ChatSchema)