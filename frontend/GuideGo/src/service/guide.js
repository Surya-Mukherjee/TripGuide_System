import api from "./api.js"

export const guide=(params)=>{
    return api.get("/guides",{
        params
    })
}