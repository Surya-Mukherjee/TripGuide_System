import { ZodError } from "zod";
import { apiResponse } from "../utilities/apiResponse.js";
import { apiError } from "../utilities/apiError.js";

const validate=(scheme)=>{
    return (req,res,next)=>{
    try{
        req.body= scheme.parse(req.body)
            next();
    }catch(err){
        if(err instanceof ZodError){
            console.log("err:",err)
            return res.status(400).json(

                new apiError(400,err.errors,"Invalid request")
            )
        }
        return res.json(
            new apiError(500,null,"Internal server Error")
        )
    }

}
}
export {validate}