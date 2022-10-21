/* eslint-disable @typescript-eslint/no-explicit-any */
import Cookies from 'js-cookie'
import React, { createContext, useEffect, useState } from 'react'
import { getAPI } from '../helpers/api'
import { getUserLocalStorage, setUserLocalStorage } from '../helpers/storage'
import ILogin from '../types/LoginType'
import IRegister from '../types/RegisterType'
import IUser from '../types/UserType'

type AuthContextType = {
    isAuthenticated: boolean
    login: (userForm: ILogin) => Promise<string>
    registerUser: (registerForm: IRegister) => Promise<string>
    logout: () => void
}

export const AuthContext = createContext({} as AuthContextType)

export function AuthProvider({ children } : { children: React.ReactNode }) {
    const [user, setUser] = useState<IUser | null>(null)
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false)

    useEffect(() => {
        const user = getUserLocalStorage()
        if (user) {
            setIsAuthenticated(true)
            setUser(user)
        }
    }, [])

    async function login(userForm: ILogin): Promise<string> {
        try {
            const resData = await getAPI().post('/user/login', userForm)
            Cookies.set('token', resData.data.token)
            const user = {
                name: resData.data.user.name,
                id: resData.data.user._id,
                username: resData.data.user.username,
                imageProfile: resData.data.user.imageProfile,
            }
            if (user.id) {
                setUserLocalStorage(user)
                setUser(user)
                setIsAuthenticated(true)
            } else {
                return 'something went wrong!'
            }
            return 'authenticated'
        } catch (err: any) {
            return `${err.response.data.message}`
        }
    }

    async function logout() {
        Cookies.remove('token')
        setUser(null)
        setUserLocalStorage(null)
        setIsAuthenticated(false)
    }

    async function registerUser(registerForm: IRegister): Promise<string> {
        const formData = new FormData()
        formData.append('name', registerForm.name)
        formData.append('username', registerForm.username)
        formData.append('password', registerForm.password)
        if( registerForm.image) {
            formData.append('image', registerForm.image)
        }

        try {
            const resData = await getAPI().post('/user/register', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })
            Cookies.set('token', resData.data.token)
            const user = {
                name: resData.data.user.name,
                id: resData.data.user._id,
                username: resData.data.user.username,
                imageProfile: resData.data.user.imageProfile,
            }
            if (user.id) {
                setUserLocalStorage(user)
                setUser(user)
                setIsAuthenticated(true)
            } else {
                return 'something went wrong!'
            }
            return 'authenticated'
        } catch (err: any) {
            return `${err.response.data.message}`
        }
    }

    return (
        <AuthContext.Provider value={{login, registerUser, logout, isAuthenticated}}>
            {children}
        </AuthContext.Provider>
    )
}