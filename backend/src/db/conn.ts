import mongoose from 'mongoose'

async function main(): Promise<void> {
    await mongoose.connect('mongodb://localhost:27017/chat')
    console.log('Connected database')
}

main().catch(err => console.log(err))

export default mongoose