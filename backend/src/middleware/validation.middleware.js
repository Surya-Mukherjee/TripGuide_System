import { ZodError } from "zod";
import { apiResponse } from "../utilities/apiResponse.js";

const validate=(scheme)=>{
    return (req,res,next)=>{
    try{
        req.body= scheme.parse(req.body)
    }catch(err){
        if(err instanceof ZodError){
            return res.json(
                new apiResponse(400,err.errors,"Invalid request")
            )
        }
    }
}
}
export {validate}