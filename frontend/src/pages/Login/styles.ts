import styled from 'styled-components'


export const Container = styled.div`
    min-height: 100vh;
    background-image: url(${require('../../images/bg-01.jpg')});
    background-size: cover;
`

export const LoginContainer = styled.div`
    width: 500px;
    height: 700px;
    padding: 55px;
    background-color: #fff;
    border-radius: 10px;
    overflow: hidden;
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    margin: auto;
    display: flex;
    align-items: center;
    flex-direction: column;
`

export const LoginForm = styled.form`
    width: 100%;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    button {
        font-weight: 600;
        width: 100%;
        height: 50px;
        border: none;
        cursor: pointer;
        margin-top: 20px;
        transition: all ease-in 0.2s;
        &:hover {
            color: #fff;
            background-color: ${({ theme }) => theme.backgroundColors.blue};
        }
    }
`

export const FormTitle = styled.span`
    img {
        width: 200px;
    }
`

export const InputContainer = styled.div`
    width: 100%;
    position: relative;
    transition: all ease 2s ;
    margin-bottom: 10px;

    .label {
        font-size: 17px;
        color: #333333;
        line-height: 1.5;
        padding-left: 7px;
        font-family: ${({ theme }) => theme.font.family.default};
        font-weight: 300;
    }

    div {
        position: relative;
    }

    .icon {
        color: #d9d9d9;
        font-size: 20px;
        position: absolute;
        top: 15px;
        left: 10px;
    }

    input {
        border-bottom: 2px solid #d9d9d9;
        font-size: 16px;
        color: #333333;
        line-height: 1.2;
        display: block;
        width: 100%;
        height: 55px;
        font-family: ${({ theme }) => theme.font.family.default};
        font-weight: 400;
        background: transparent;
        padding: 0 7px 0 43px;
    }

    input:focus {
        border-bottom: 2px solid black;;
    }

`

export const ErrorMessage = styled.p`
    color: red;
    font-weight: 500;
    margin-top: 20px;
`