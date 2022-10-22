import { useState, useContext, useEffect } from 'react' 
import { useNavigate, Link } from 'react-router-dom'
import { AuthContext } from '../../contexts/AuthContext'
import { AiOutlineUser } from 'react-icons/ai'
import { GiPadlock } from 'react-icons/gi'
import IRegister from '../../types/RegisterType' 
import * as Styled from './styles'

function Register() {
    const [ registerForm, setLoginForm ] = useState<IRegister>({ username: '', password: '', name: ''})
    const [ errorMessage, setErrorMessage ] = useState<string>('')

    const { registerUser, isAuthenticated } = useContext(AuthContext)
    const navigate = useNavigate()

    useEffect(()=>{
        if( isAuthenticated ){
            navigate('/')
        }
    }, [isAuthenticated])

    function handleOnInputChange(e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) {
        setLoginForm({ ...registerForm, [e.target.name]: e.target.value })
    }

    function handleOnImageChange(e: React.ChangeEvent<HTMLInputElement>) {
        if (!e.target.files) {
            return
        }
        setLoginForm({...registerForm, [e.target.name]: e.target.files[0]})
    }

    async function handleOnSubmit(e: React.FormEvent<EventTarget>): Promise<void> {
        e.preventDefault()
        setErrorMessage('')
        const res = await registerUser(registerForm)
        if(res === 'authenticated'){
            navigate('/')
        } else {
            console.log(res)
            setErrorMessage(res)
        }
        
    }
    return (    
        <Styled.Container>
            <Styled.RegisterContainer>
                <Styled.FormTitle>
                    {registerForm.image ?
                        <label htmlFor="image"><img src={URL.createObjectURL(registerForm.image)} alt="UserImage" /></label>
                            : 
                        <label htmlFor="image"><img src={require('../../images/defaultImageProfile.jpg')} alt="UserImage" /></label>
                    }
                    <input onChange={handleOnImageChange} className="image-imput" type="file" name="image" id="image"/>
                </Styled.FormTitle>
                <Styled.RegisterForm onSubmit={handleOnSubmit}>
                    <Styled.InputContainer>
                        <span className="label">Name</span>
                        <div>
                            <input type="text" name="name" onChange={handleOnInputChange}/>
                            <AiOutlineUser className='icon' />
                        </div> 
                    </Styled.InputContainer>
                    <Styled.InputContainer>
                        <span className="label">Username</span>
                        <div>
                            <input type="username" name="username" onChange={handleOnInputChange}/>
                            <AiOutlineUser className='icon' />
                        </div>
                    </Styled.InputContainer>
                    <Styled.InputContainer>
                        <span className="label">Password</span>
                        <div>
                            <input type="password" name="password" onChange={handleOnInputChange}/>
                            <GiPadlock className='icon'/>
                        </div>
                    </Styled.InputContainer>
                    <button type='submit'>Register</button>
                </Styled.RegisterForm>
                { errorMessage ? <Styled.ErrorMessage>{errorMessage}!</Styled.ErrorMessage> : ''}
                <Styled.LoginLink>
                    <Link to='/login'>Login</Link>
                </Styled.LoginLink>
            </Styled.RegisterContainer>
        </Styled.Container>
    )
}

export default Register