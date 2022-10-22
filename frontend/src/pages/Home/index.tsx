import { io, Socket } from 'socket.io-client'
import { useContext, useEffect, useState, useRef } from 'react'
import { AuthContext } from '../../contexts/AuthContext'
import { getAPI } from '../../helpers/api'
import { Conversation } from '../../components/Conversation'
import { ChatBox } from '../../components/ChatBox'
import IChat from '../../types/ChatType'
import IMessage from '../../types/MessageType'
import * as Styled from './styles'
import { AiOutlinePlusCircle } from 'react-icons/ai'
import { NewChat } from '../../components/NewChat'

function Home() {

    const [chats, setChats] = useState<Array<IChat>>([])
    const [currentChat, setCurrentChat] = useState<IChat>()
    const [onlineUsers, setOnlineUsers] = useState<Array<{ userId: string, socketId: string} >| null>(null)
    const [receivedMessage, setReceivedMessage] = useState<IMessage | null>(null)
    const [showCreateNewChat, setShowCreateNewChat] = useState<boolean>(false)

    const { user } = useContext(AuthContext)

    const socket = useRef<any>(null)

    const api = getAPI()

    useEffect(() => {
        api.get('/chat/getUserChats', { data: { id: user?.id}}).then(r => setChats(r.data.chats))
    }, [])

    useEffect(()=>{
        socket.current = io('http://localhost:8800')
        socket.current.emit('new-user-add', user?.id)
        socket.current.on('get-users', (users: Array<{ userId: string, socketId: string}>)=> {
            setOnlineUsers(users)
        })
        return ()=> socket.current.on('disconect')
    }, [])

    useEffect(()=>{
        socket.current.on('receive-message', (data: IMessage)=> {
            setReceivedMessage(data)
        })
    }, [])

    async function createNewChat(username: string) {
        const res = await api.post('/chat/create', { receiverUser: username })
        console.log(res)
        setChats([...chats, res.data.data])
    }

    return (
        <Styled.Container>
            <Styled.ChatContainer>
                <Styled.LeftSideChat>
                    <Styled.ChatListContainer>
                        <Styled.NewChat onClick={() => setShowCreateNewChat(true)}>
                            <img src={require('../../images/logo.png')} alt="Logo" />
                            <span>New Chat <AiOutlinePlusCircle/></span>
                        </Styled.NewChat>
                        <Styled.ChatList>
                            {
                                chats.map((chat, index) => <div onClick={() => setCurrentChat(chat)} key={index}><Conversation onlineUsers={onlineUsers}  chat={chat} userId={user?.id}/></div>)
                            }
                        </Styled.ChatList>
                    </Styled.ChatListContainer>
                </Styled.LeftSideChat>
                <Styled.RightSideChat>
                    {
                        currentChat ? <ChatBox receivedMessage={receivedMessage} socket={socket} user={user} currentChat={currentChat}/> : ''
                    }
                </Styled.RightSideChat>
            </Styled.ChatContainer>
            {
                showCreateNewChat ? <NewChat setShowCreateNewChat={setShowCreateNewChat} createChat={createNewChat}/> : ''
            }
            
        </Styled.Container>
    )
}

export default Home 