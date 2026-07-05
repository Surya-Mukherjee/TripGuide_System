import api from "./api.js"
export const getCurrentUser=()=>{
    return api.get('/users/profile')
}

export const update=(data)=>{
    return api.patch('/users/profile/update',data)
}

export const deleteProfile= ()=>{
   return api.delete('/users/profile/delete')
}