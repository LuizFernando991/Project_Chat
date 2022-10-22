import { format } from 'timeago.js'
import IMessage from '../../types/MessageType'
import * as Styled from './styles'

export interface MessageProps {
    message: IMessage
    userId: string | undefined
}

export function Message({ message, userId }: MessageProps) {

    const isFromCurrentUser = message.senderId === userId

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