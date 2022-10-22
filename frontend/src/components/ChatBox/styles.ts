import styled from 'styled-components'

export const Container = styled.div`
    width: 100%;
    height: 100%;
`

export const ChatHeader = styled.div`
    padding: 20px 25px;
    width: 100%;
    display: flex;
    align-items: center;
    img {
        width: 50px;
        border-radius: 50px;
    }
    h3 {
        margin-left: 10px;
    }
`
export const Border = styled.div`
    width: 95%;
    height: 1px;
    margin: 0 auto;
    background-color: ${({ theme }) => theme.borderColor.default};
`

export const MessagesContainer = styled.div`
    width: 95%;
    height: 500px;
    margin: 10px auto;
    overflow: auto;
    ::-webkit-scrollbar {
        display: none;
    }
`
export const ChatSender = styled.div`
    width: 100%;

    div {
        width: 80%;
        margin: 0 auto;
        padding: 5px;
        position: relative;
        border: 1px solid ${({ theme }) => theme.borderColor.focus};
        border-radius: 15px;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    input {
        width: 100%;
        color: ${({ theme }) => theme.colors.black};
        font-weight: 600;
        font-size: 12px;
        padding: 10px 50px 10px 10px;
    }

    button {
        background: none;
        border: none;
        height: 25px;
        font-size: 25px;
        right: 0;
        margin-right: 5px;
        color: ${({ theme }) => theme.colors.blue};
        cursor: pointer;
    }
`