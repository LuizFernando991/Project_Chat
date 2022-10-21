import axios, { HeadersDefaults } from 'axios'
import Cookies from 'js-cookie'

interface IHeaderProperties extends HeadersDefaults {
    Authorization: string
}

export function getAPI() {
    const token = Cookies.get('token')
    const api = axios.create({
        baseURL: process.env.REACT_APP_API_KEY,
    })

    if (token) {
        api.defaults.headers = { Authorization: `Bearer ${token}` } as IHeaderProperties
    }
    return api
}