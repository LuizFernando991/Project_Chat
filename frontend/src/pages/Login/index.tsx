import { useState, useContext, useEffect } from 'react'
import { AuthContext } from '../../contexts/AuthContext'
import { AiOutlineUser } from 'react-icons/ai'
import { GiPadlock } from 'react-icons/gi'
import { Link, useNavigate } from 'react-router-dom'
import ILogin from '../../types/LoginType'
import * as Styled from './styles'

function Login() {
    const [ loginForm, setLoginForm ] = useState<ILogin>({ username: '', password: ''})
    const [ errorMessage, setErrorMessage ] = useState<string>('')

    const { login, isAuthenticated } = useContext(AuthContext)
    const navigate = useNavigate()

    useEffect(()=>{
        if(isAuthenticated){
            navigate('/')
        }
    }, [isAuthenticated])
    
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
                <Styled.RegisterLink>
                    <Link to='/register'>Register</Link>
                </Styled.RegisterLink>
            </Styled.LoginContainer>
        </Styled.Container>
    )
}

export default Login