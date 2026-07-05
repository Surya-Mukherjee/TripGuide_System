import api from "./api.js";
export const loginApi=(credentials)=>{
    return api.post('/users/login',credentials)
}

export const logoutApi=()=>{
    return api.post('/users/logout')
}

export const registerApi=(formData)=>{
    return api.post('/users/register',formData)
}

export const passwordUpdateApi=(password)=>{
    return api.patch('/users/password-update',password)
}