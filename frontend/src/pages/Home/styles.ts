import styled from 'styled-components'

export const Container = styled.main`
    min-height: 100vh;
    width: 100%;
    background-image: url(${require('../../images/bg-01.jpg')});
    background-size: cover;
`

export const ChatContainer = styled.section`
    position: absolute;
    width: 80%;
    height: 700px;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    margin: auto;
    display: grid;
    grid-template-columns: 25% auto;
    gap: 1rem;
`
export const LeftSideChat = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding: 10px;
    background-color: #fff;
    border-radius: 20px;
`

export const RightSideChat = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
    background-color: #fff;
    border-radius: 20px;
`
export const ChatListContainer = styled.div`
    h1 {
        margin-top: 20px;
        margin-bottom: 20px;
        margin-left: 10px;
    }
`

export const ChatList = styled.div``