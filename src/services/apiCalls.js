import axios from 'axios';
import jwt_decode from 'jwt-decode';

const url = 'http://localhost:3000/'
// const url = 'https://backend-connect-arte.vercel.app/'


const config = (token) => {
    const config = {
        headers: { 
          "authorization": `Bearer ${token}`,  
        }
    };
    return config
}

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

export const getUserByUserName = async (username) => {
    const res = await axios.get(`${url}user/${username}`)
    return res.data
}

export const getUsersByInterests = async (criteria) => {
    const res = await axios.get(`${url}user/byKeyWords?criteria=${criteria}`)
    return res.data
}
export const getUsersByRegExp = async (criteria) => {
    const res = await axios.get(`${url}user/regExp/${criteria}`)
    return res.data
}
export const editInfoByUserName = async (username, credentials, token) => {
    const res = await axios.put(`${url}user/info/${username}`, credentials, config(token))
    return res.data
}
export const editEducationByUserName = async (username, credentials) => {
    const res = await axios.put(`${url}user/education/${username}`, credentials)
    return res.data
}
export const removeEducationByUserName = async(username, credentials) => {
    const res = await axios.post(`${url}user/educationDelete/${username}`, credentials)
    return res.data
}

export const editExperienceByUserName = async (username, credentials) => {
    const res = await axios.put(`${url}user/experience/${username}`, credentials)
    return res.data
}
export const removeExperienceByUserName = async(username, credentials) => {
    const res = await axios.post(`${url}user/experienceDelete/${username}`, credentials)
    return res.data
}


export const createVacancie = async(credentials) => {
    const res = await axios.post(`${url}vacancies`, credentials)
    return res
}

export const getVacancies = async(pageNumber, pageSize, criteria) => {
    const res = await axios.get(`${url}vacancies?pageNumber=${pageNumber}&pageSize=${pageSize}&criteria=${criteria}`,)
    return res
}

export const getVacancieById = async(id) => {
    const res = await axios.get(`${url}vacancies/${id}`)
    return res
}

export const applyVacancie = async(id, credentials) => {
    const res = await axios.post(`${url}vacancies/apply/${id}`, credentials)
    return res
}
export const removeVacancieById = async(id) => {
    const res = await axios.delete(`${url}vacancies/delete/${id}`)
    return res
}
export const getJobVacanciesByUserId = async(userId) => {
    const res = await axios.get(`${url}vacancies/user/${userId}`)
    return res
}

export const getContriesList = async() => {
    const res = await axios.get('https://restcountries.com/v3.1/all?fields=name')
    return res.data
}