import api from "./api.js";
const login=(data)=>{
    return axios.post('/users/login',data)
}

export default login