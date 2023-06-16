import axios from "axios";
import jwt_decode from "jwt-decode";

const url = "http://localhost:3000/";
// const url = 'https://backend-connect-arte.vercel.app/'

const config = (token) => {
  const config = {
    headers: {
      authorization: `Bearer ${token}`,
    },
  };
  return config;
};

const logIn = (token) => {
  const data = {
    user: jwt_decode(token),
    token: token,
  };
  return data;
};

export const registerUsers = async (credentials) => {
  try {
    const res = await axios.post(`${url}user`, credentials);
    return logIn(res.data.token);
  } catch (e) {
    throw new Error(e.message);
  }
};

export const logInUsers = async (credentials) => {
  const res = await axios.post(`${url}user/login`, credentials);
  return logIn(res.data.token);
};

export const getUserByUserName = async (username, token) => {
  const res = await axios.get(`${url}user/${username}`, config(token));
  return res.data;
};

export const getUsersByInterests = async (criteria, token) => {
  const res = await axios.get(`${url}user/byKeyWords?criteria=${criteria}`, config(token));
  return res.data;
};
export const getUsersByRegExp = async (criteria, token) => {
  const res = await axios.get(`${url}user/regExp/${criteria}`, config(token));
  return res.data;
};
export const editInfoByUserName = async (username, credentials, token) => {
  const res = await axios.put(
    `${url}user/info/${username}`,
    credentials,
    config(token)
  );
  return res.data;
};
export const editEducationByUserName = async (username, credentials, token) => {
  const res = await axios.put(`${url}user/education/${username}`, credentials, config(token));
  return res.data;
};
export const removeEducationByUserName = async (username, credentials, token) => {
  const res = await axios.post(
    `${url}user/educationDelete/${username}`,
    credentials, config(token)
  );
  return res.data;
};

export const editExperienceByUserName = async (username, credentials, token) => {
  const res = await axios.put(`${url}user/experience/${username}`, credentials, config(token));
  return res.data;
};
export const removeExperienceByUserName = async (username, credentials, token) => {
  const res = await axios.post(
    `${url}user/experienceDelete/${username}`,
    credentials, config(token)
  );
  return res.data;
};

export const createVacancie = async (credentials) => {
  const res = await axios.post(`${url}vacancies`, credentials);
  return res;
};

export const getVacancies = async (pageNumber, pageSize, criteria, token) => {
  const res = await axios.get(
    `${url}vacancies?pageNumber=${pageNumber}&pageSize=${pageSize}&criteria=${criteria}`,
    config(token)
  );
  return res;
};

export const getVacancieById = async (id, token) => {
  const res = await axios.get(`${url}vacancies/${id}`, config(token));
  return res;
};

export const applyVacancie = async (id, credentials, token) => {
  const res = await axios.post(`${url}vacancies/apply/${id}`, credentials, config(token));
  return res;
};
export const removeVacancieById = async (id) => {
  const res = await axios.delete(`${url}vacancies/delete/${id}`);
  return res;
};
export const getJobVacanciesByUserId = async (userId) => {
  const res = await axios.get(`${url}vacancies/user/${userId}`);
  return res;
};

export const getContriesList = async () => {
  const res = await axios.get("https://restcountries.com/v3.1/all?fields=name");
  return res.data;
};
