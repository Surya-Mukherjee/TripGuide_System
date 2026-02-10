import jwt from 'jsonwebtoken'
import { User } from '../models/user.model.js'
import {asyncHandler } from '../utilities/asyncHandler.js'
import { apiError } from '../utilities/apiError.js';


const verifyjwt=asyncHandler(async(req,_,next)=>
{
    const token= req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ","");


    if(!token){

        throw new apiError(401,"invalid token")

    }


    const decodedToken= jwt.verify(token,process.env.ACCESS_SECRET_KEY)
    if(!decodedToken){
        throw new apiError(401,"cant verify token or invalid token")
    }


    const user=await User.findById(decodedToken._id).select("-password -refreshToken")



    if(!user){
        throw new apiError(401,"Invalid token or expired token")
    }

    req.user=user;

    next();
})

export {verifyjwt}