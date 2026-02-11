import { apiError } from "../utilities/apiError.js";
import { asyncHandler } from "../utilities/asyncHandler.js";

const requireUser=asyncHandler( (req,_,next)=>{
    const role=req.user.role;
    if(role!=='tourist'){
       throw new apiError(403,"only Tourists allowed")
    }
    next()
    
})

export {requireUser}