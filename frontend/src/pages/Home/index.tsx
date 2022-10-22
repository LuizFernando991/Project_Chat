import { io } from 'socket.io-client'
import { useContext, useEffect, useState, useRef } from 'react'
import { AuthContext } from '../../contexts/AuthContext'
import { getAPI } from '../../helpers/api'
import { Conversation } from '../../components/Conversation'
import { ChatBox } from '../../components/ChatBox'
import IChat from '../../types/ChatType'
import IMessage from '../../types/MessageType'
import * as Styled from './styles'

function Home() {

    const [chats, setChats] = useState<Array<IChat>>([])
    const [currentChat, setCurrentChat] = useState<IChat>()
    const [onlineUsers, setOnlineUsers] = useState<any>()
    const [receivedMessage, setReceivedMessage] = useState<IMessage>()

    const { user } = useContext(AuthContext)

    const socket = useRef<any>()

    const api = getAPI()

    useEffect(() => {
        api.get('/chat/getUserChats', { data: { id: user?.id}}).then(r => setChats(r.data.chats))
    }, [])

    useEffect(()=>{
        socket.current = io('http://localhost:8800')
        socket.current.emit('new-user-add', user?.id)
        socket.current.on('get-users', (users: any)=> {
            setOnlineUsers(users)
        })
    }, [user])

    useEffect(()=>{
        socket.current.on('receive-message', (data: any)=> {
            console.log(data)
            setReceivedMessage(data)
        })
    }, [])

    return (
        <Styled.Container>
            <Styled.ChatContainer>
                <Styled.LeftSideChat>
                    <Styled.ChatListContainer>
                        <h1>Chats</h1>
                        <Styled.ChatList>
                            {
                                chats.map((chat, index) => <div onClick={() => setCurrentChat(chat)} key={index}><Conversation  chat={chat} userId={user?.id}/></div>)
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
        </Styled.Container>
    )
}

export default Home 