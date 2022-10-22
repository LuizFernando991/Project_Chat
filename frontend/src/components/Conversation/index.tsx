import IChat from '../../types/ChatType'
import * as Styled from './styles'

interface ConversationProps {
    chat: IChat
    userId: string | undefined
    onlineUsers: Array<{ userId: string, socketId: string}> | null
}

export function Conversation({ chat, userId, onlineUsers }: ConversationProps) {

    const user = chat.members.find(member => member._id != userId)

    const isOnline = onlineUsers?.some((e) => e.userId === user?._id) || false

    return (
        <Styled.Container isOnline={isOnline}>
            <div>
                <div className='online-dot' />
                <img 
                    src={user?.imageProfile ? `${process.env.REACT_APP_API_KEY}/images/${user?.imageProfile}` 
                        : 
                    require('../../images/defaultImageProfile.jpg')} alt={user?.username}
                />
            </div>
            <Styled.ConversationInfo>
                <h4>{user?.name}</h4>
                <p>{user?.username}</p>
            </Styled.ConversationInfo>
        </Styled.Container>
    )
}