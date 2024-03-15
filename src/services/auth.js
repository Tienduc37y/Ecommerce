import axios from "axios";

export const register = async (infoUser) => {
    const response = await axios.post(`/auth/local/register`, infoUser);
    return response.data;
}

export const login = async (infoUser) => {
    const response = await axios.post(`/auth/local`, infoUser);
    return response.data;
}
export const getMeWithToken = async (token) => {
    const response = await axios.get(`/users/me?populate=role`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return response.data;
}

export const getMe = async () => {
    const response = await axios.get(`/users/me?populate=role`);
    return response.data;
}

export const updateMe = async (newInfo) => {
    const response = await axios.put(`/users/me`, newInfo);
    return response.data;
}
