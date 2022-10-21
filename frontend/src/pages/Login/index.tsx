import { useState, useContext } from 'react'
import { AuthContext } from '../../contexts/AuthContext'
import * as Styled from './styles'
import ILogin from '../../types/LoginType'
import { AiOutlineUser } from 'react-icons/ai'
import { GiPadlock } from 'react-icons/gi'
import { useNavigate } from 'react-router-dom'

function Login() {
    const [ loginForm, setLoginForm ] = useState<ILogin>({ username: '', password: ''})
    const [ errorMessage, setErrorMessage ] = useState<string>('')

    const { login } = useContext(AuthContext)
    const navigate = useNavigate()
    
    function handleOnInputChange(e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) {
        setLoginForm({ ...loginForm, [e.target.name]: e.target.value })
    }

    async function handleOnSubmit(e: React.FormEvent<EventTarget>): Promise<void> {
        e.preventDefault()
        setErrorMessage('')
        const res = await login(loginForm)
        if(res === 'authenticated'){
            navigate('/')
        } else {
            console.log(res)
            setErrorMessage(res)
        }
        
    }

    return (
        <Styled.Container>
            <Styled.LoginContainer>
                <Styled.FormTitle><img src={require('../../images/logo.png')} alt="Logo" /></Styled.FormTitle>
                <Styled.LoginForm onSubmit={handleOnSubmit}>
                    <Styled.InputContainer>
                        <span className="label">Username</span>
                        <div>
                            <input name="username" type="text" onChange={handleOnInputChange}/>
                            <AiOutlineUser className='icon' />
                        </div> 
                    </Styled.InputContainer>
                    <Styled.InputContainer>
                        <span className="label">Password</span>
                        <div>
                            <input type="password" name="password" onChange={handleOnInputChange}/>
                            <GiPadlock className='icon' />
                        </div>
                    </Styled.InputContainer>
                    <button type='submit'>LOGIN</button>
                </Styled.LoginForm>
                { errorMessage ? <Styled.ErrorMessage>{errorMessage}!</Styled.ErrorMessage> : ''}
            </Styled.LoginContainer>
        </Styled.Container>
    )
}

export default Login