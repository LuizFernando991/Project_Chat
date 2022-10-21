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