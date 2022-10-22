import { useState } from 'react'
import { AiOutlineClose } from 'react-icons/ai'
import * as Styled from './styles'

export type NewChatProps = {
    setShowCreateNewChat: (showCreateNewChat: boolean) => void
    createChat: (username: string) => void
}

export function NewChat({ setShowCreateNewChat, createChat }: NewChatProps) {

    const [username, setUsername] = useState<string>('')

    function handleOnInputChange(e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) {
        setUsername(e.target.value)
    }

    function handleOnButtonClick() {
        if(username){
            createChat(username)
            setShowCreateNewChat(false)
        }
    }

    return (
        <>
            <Styled.BackPage />
            <Styled.NewChat>
                <input type="text" name="username" placeholder="Username" onChange={handleOnInputChange}/>
                <div className="button-container">
                    <button onClick={handleOnButtonClick}>Create</button>
                </div>
                <div className="close" onClick={() => setShowCreateNewChat(false)}>
                    <AiOutlineClose/>
                </div>
            </Styled.NewChat>
        </>
    )
}