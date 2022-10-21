import { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../contexts/AuthContext'
import { getAPI } from '../../helpers/api'
import { Conversation } from '../../components/Conversation'
import { ChatBox } from '../../components/ChatBox'
import IChat from '../../types/ChatType'
import * as Styled from './styles'

function Home() {

    const [chats, setChats] = useState<Array<IChat>>([])
    const [currentChat, setCurrentChat] = useState<IChat>()

    const { user } = useContext(AuthContext)

    const api = getAPI()

    useEffect(() => {
        api.get('/chat/getUserChats', { data: { id: user?.id}}).then(r => setChats(r.data.chats))
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
                        currentChat ? <ChatBox user={user} currentChat={currentChat}/> : ''
                    }
                </Styled.RightSideChat>
            </Styled.ChatContainer>
        </Styled.Container>
    )
}

export default Home 