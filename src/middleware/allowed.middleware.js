import { asyncHandler } from "../utilities/asyncHandler.js";
import { User } from "../models/user.model.js";
import { apiError } from "../utilities/apiError.js";
import { apiResponse } from "../utilities/apiResponse.js";

const requiredGuide=asyncHandler(async(req,res,next)=>{
  const {role}=req.user;
  if(role!=="guide"){
    throw new apiError(403,"Forbidden access")
  }
console.log(req.user)
  next();
  

})
const requireUser=asyncHandler( (req,_,next)=>{
    const role=req.user.role;
    if(role!=='tourist'){
       throw new apiError(403,"only Tourists allowed")
    }
    next()
    
})


export {requiredGuide,requireUser}