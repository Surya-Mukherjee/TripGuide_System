import { asyncHandler } from "../utilities/asyncHandler";
import { User } from "../models/user.model";
import { apiError } from "../utilities/apiError";
import { apiResponse } from "../utilities/apiResponse";

const requiredGuide=asyncHandler(async(req,res,next)=>{
  const {role}=req.user;
  if(role!=="guide"){
    throw new apiError(403,"Forbidden access")
  }
console.log(req.user)
  next();
  

})

export {requiredGuide}