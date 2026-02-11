import { apiError } from "../utilities/apiError.js";
import { asyncHandler } from "../utilities/asyncHandler.js";

const reqbody= asyncHandler(async(req,_,next)=>{
     if(!req.body){
        throw new apiError(500,"body not found")
     }
     next()
})

export {reqbody}