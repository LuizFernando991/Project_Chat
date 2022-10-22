import { useEffect, useRef, useState } from 'react'
import { getAPI } from '../../helpers/api'
import { Message } from '../Message'
import { BiSend } from 'react-icons/bi'
import IChat from '../../types/ChatType'
import IMessage from '../../types/MessageType'
import IUser from '../../types/UserType'
import * as Styled from './styles'

export interface ChatBoxProps {
    user: IUser | null
    currentChat: IChat | null
    socket: any
    receivedMessage: IMessage | null
}

export function ChatBox({ user, currentChat, socket, receivedMessage }: ChatBoxProps) {

    const [messages, setMessages] = useState<Array<IMessage>>([])
    const [newMessage, setNewMessage] = useState<string>('')
    const scroll = useRef<HTMLDivElement | null>(null)

    const receivedUser = currentChat?.members.find(member => member._id != user?.id)

    const api = getAPI()
    
    useEffect(()=> {
        api.get(`message/${currentChat?._id}`).then(r => setMessages(r.data.messages))
    }, [currentChat])

    useEffect(()=> {
        if(receivedMessage){
            setMessages([...messages, receivedMessage])
        }
    }, [receivedMessage])

    useEffect(() => {
        scroll.current?.scrollIntoView({ behavior: 'smooth' })
    }, [messages])


    function handleOnInputChange(e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) {
        setNewMessage(e.target.value)
    }

    async function handleOnSubmit(e: React.FormEvent<EventTarget>): Promise<void> {
        e.preventDefault()
        if(!currentChat) {
            return
        }
        const message = {
            chatId: currentChat?._id,
            text: newMessage
        }
        setNewMessage('')
        const res = await api.post('/message/addmessage', message)
        setMessages((messages) => [...messages, res.data.data])
        socket.current.emit('send-message', { receiverId: receivedUser?._id, message: res.data.data})
        
    }

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
                    messages.map((mess, index) => <div key={index} ref={scroll}><Message   message={mess} userId={user?.id}/></div>)
                }
            </Styled.MessagesContainer>
            <Styled.ChatSender>
                <form onSubmit={handleOnSubmit}>
                    <div>
                        <input value={newMessage} onChange={handleOnInputChange} type="text" placeholder='Type a message'/>
                        <button type="submit"><BiSend /></button>
                    </div>
                </form>
            </Styled.ChatSender>
        </Styled.Container>
    )
}