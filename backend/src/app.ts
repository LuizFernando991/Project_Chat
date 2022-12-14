import express, { Application } from 'express'
import cors from 'cors'
import UserRoutes from './routes/UserRoutes'
import ChatRoutes from './routes/ChatRoutes'
import MessageRoutes from './routes/MessageRoutes'
import './socket'

const app : Application = express()

//Config JSON response
app.use(express.urlencoded({
    extended: true
})) 
app.use(express.json())
//Solve CORS
app.use(cors({ credentials : true, origin : 'http://localhost:3000'}))
//Public folder
app.use(express.static(__dirname + '/public'))
//Routes
app.use('/user', UserRoutes)
app.use('/chat', ChatRoutes)
app.use('/message', MessageRoutes)
//Init server
app.listen(5050, ()=>{
    console.log('server on')
})