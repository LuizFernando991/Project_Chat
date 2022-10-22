import { format } from 'timeago.js'
import IMessage from '../../types/MessageType'
import * as Styled from './styles'

export interface MessageProps {
    message: IMessage
    senderId: string | undefined
}

export function Message({ message, senderId }: MessageProps) {

    const isFromCurrentUser = message._id === senderId

    return (
        <Styled.Container isFromCurrentUser={isFromCurrentUser}>
            <Styled.Message isFromCurrentUser={isFromCurrentUser}>
                <p>{message.text}</p>
                <div>
                    <span>{format(message.createdAt)}</span>
                </div>
            </Styled.Message>
        </Styled.Container>
    )
}