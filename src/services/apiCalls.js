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
        return 'Finished'
    } catch (e){
        throw new Error(e.message)
    }
}