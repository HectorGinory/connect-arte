import axios from 'axios';
import jwt_decode from 'jwt-decode';

const url = 'http://localhost:3000/'

export const registerUsers = async (credentials) => {
    try {
        await axios.post(`${url}user`,credentials)
        const login = {
            "email": credentials.email,
            "password": credentials.password
        }
        return await logInUsers(login)
    } catch (e){
        throw new Error(e.message)
    }
}

export const logInUsers = async (credentials) => {
    const res = await axios.post(`${url}user/login`, credentials)
    const data = {
            "user": jwt_decode(res.data.token),
            "token": res.data.token
    }
    return data
}

export const getUserByUserName = async (userName) => {
    const res = await axios.get(`${url}user/${userName}`)
    return res.data
}

export const getContriesList = async() => {
    const res = await axios.get('https://restcountries.com/v3.1/all?fields=name')
    return res.data
}