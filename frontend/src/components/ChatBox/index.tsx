import { useEffect, useState } from 'react'
import { getAPI } from '../../helpers/api'
import { Message } from '../Message'
import IChat from '../../types/ChatType'
import IMessage from '../../types/MessageType'
import IUser from '../../types/UserType'
import * as Styled from './styles'

export interface ChatBoxProps {
    user: IUser | null
    currentChat: IChat | undefined
}

export function ChatBox({ user, currentChat }: ChatBoxProps) {

    const [messages, setMessages] = useState<Array<IMessage>>([])

    const receivedUser = currentChat?.members.find(member => member._id != user?.id)

    useEffect(()=> {
        const api = getAPI()
        api.get(`message/${currentChat?._id}`).then(r => setMessages(r.data.messages))
    }, [currentChat])

    return (
        <Styled.Container>
            <Styled.ChatHeader>
                <img 
                    src={receivedUser?.imageProfile ? `${process.env.REACT_APP_API_KEY}/images/${receivedUser?.imageProfile}` 
                        : 
                    require('../../images/defaultImageProfile.jpg')} alt={receivedUser?.username}
                />
                <h3>{receivedUser?.name}</h3>
            </Styled.ChatHeader>
            <Styled.Border />
            <Styled.MessagesContainer>
                {
                    messages.map((mess, index) => <Message key={index} message={mess} senderId={user?.id}/>)
                }
            </Styled.MessagesContainer>
        </Styled.Container>
    )
}