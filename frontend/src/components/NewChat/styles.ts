import styled from 'styled-components'

export const BackPage = styled.div`
    width: 100%;
    height: 100vh;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.4);
`

export const NewChat = styled.div`
    background-color: #fff;
    width: 300px;
    height: 120px;
    position: absolute;
    border-radius: 10px;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    input {
        padding-bottom: 10px;
        padding-top: 20px;
        border-bottom: 1px solid ${({ theme }) => theme.borderColor.focus};
    }

    .button-container {
        margin-top: 20px;

        button {
            border: none;
            background: none;
            font-weight: bold;
            font-size: 15px;
            cursor: pointer;
            color: ${({ theme }) => theme.colors.blue};
        }
    }

    .close {
        position: absolute;
        top: 10px;
        right: 10px;
        font-size: 25px;
        cursor: pointer;
        color: ${({ theme }) => theme.colors.blue};
    }

`