import { User } from '../models/user.model.js'
import { asyncHandler } from '../utilities/asyncHandler.js'
import { apiError } from '../utilities/apiError.js'
import { apiResponse } from '../utilities/apiResponse.js'
import { deleteFromCloudinary, upploadToCloudinary } from '../utilities/cloudinary.js'
import { updateById } from '../utilities/updation.js'
import { Review } from '../models/review.model.js'
import { Guide } from '../models/guides.model.js'
import fs from 'fs'
import { deletion } from '../utilities/deletion.js'
import {z} from 'zod'
import jwt from 'jsonwebtoken';
const userScheme= z.object({
    userName:z.string().optional(),
    email:z.email().optional(),
    password:z.string().min(8,"password must contain atleast 8 characters"),
    role:z.string().optional(),
    rememberMe:z.boolean().optional()
}).refine((data)=>data.userName||data.email,{
    message:"one field is required  "
})
const RefreshTokenGenerator=async(user_id)=>{
    const user=await User.findById(user_id)
    const refreshToken=user.refreshTokenGenerator();
    user.refreshToken=refreshToken
    user.save({validateBeforeSave:false})
    return{refreshToken}
}
const AccessTokenGenerator=async(user_id)=>{
    const user= await User.findById(user_id);
    const accessToken=user.accessTokenGenerator();
    
    return {accessToken}
}
const registerUser= asyncHandler(async(req,res)=>{
     const {userName,email,role,password,rememberMe}= req.body
      console.log(req.body)
     //check for empty username and email
     if(userName =="" || email ==""||password ==""){
        console.log("hi")
        throw new apiError(400,"userName, email and password are  required for registration")
     }
    const normalizedUserName = userName?.toLowerCase();
     const normalizedEmail = email?.toLowerCase();

     const registereduser = await User.findOne({
     $or: [
    { userName: normalizedUserName },
    { email: normalizedEmail }
  ]
});
         const profilePicpath=req.file?.path
     if(registereduser){
        fs.unlinkSync(profilePicpath)   
        
        throw new apiError(409,"user with same credentials already exists")
     }

     console.log(req.file)
     if(!profilePicpath){
        throw new apiError(400,"required profilepic")
     }
     console.log("profile-pic path:",profilePicpath)
     const profilePicUrl= await upploadToCloudinary(profilePicpath)
    console.log("profilepic url:",profilePicUrl)
     if(!profilePicUrl){
        throw new apiError(504,"Internal server error")
     }
           const user = await User.create({
              userName,
              email,
              profilePic:profilePicUrl.url,
              publicid:profilePicUrl.public_id,
              password,
              role
           })
         const {accessToken}=await AccessTokenGenerator(user._id)
         const {refreshToken}=await RefreshTokenGenerator(user._id)
         const loggedin=await User.findById(user._id)
         if(!loggedin){
            throw new apiError(500,"cant log in. Try manually logging in ")
         }
            const options={
        httpOnly:true,
        secure:process.env.MODE_ENV==="production"
    }
    const refreshoptions={
        httpOnly:true,
        secure:process.env.MODE_ENV==="production"
    }
  if(rememberMe==true){
      refreshoptions.maxAge= 30 * 24 * 60 * 60 * 1000
  }

         return res.status(201)
         .cookie("accessToken",accessToken,options)
         .cookie("refreshToken",refreshToken,refreshoptions)
         .json( 
         new apiResponse(200,user,"User registered successfully")
     )
})





//login setup




const login=asyncHandler(async (req,res)=>{
    console.log("controller reached")
    const{userName,email,password,rememberMe}= req.body;
    if(!userName && !email){
        throw new apiError(400,"UserName or email is required");
    }
    if(!password){
        throw new apiError(400,"password required");
    }

    const user= await User.findOne({
        $or:[{userName},{email}]
    }
    )
    if(!user){
        throw new apiError(401,"User not found .please register yourself")
    }
    const isPasswordValid= await user.isPasswordCorrect(password);
    if(!isPasswordValid){
        throw new apiError(401,"password invalid")
    }

    const {accessToken}=await AccessTokenGenerator(user._id)
    const {refreshToken}=await RefreshTokenGenerator(user._id)
    const loggedIn= await User.findById(user._id).select("-password -refreshToken");
    const options={
        httpOnly:true,
        secure:process.env.MODE_ENV==="production"
    }
    const refreshoptions={
        httpOnly:true,
        secure:process.env.MODE_ENV==="production"
    }
  if(rememberMe==true){
      refreshoptions.maxAge= 30 * 24 * 60 * 60 * 1000
  }
  console.log(options)
    return res
    .status(200)
    .cookie("accessToken",accessToken,options)
    .cookie("refreshToken",refreshToken,refreshoptions)
    .json(
         new apiResponse(200,{
            user:loggedIn,
           
          
         },"User is logged in")
)})
//handling the expiration of AccessToken
const HandleExpiredAccessToken=asyncHandler(async(req,res)=>{
    const refreshToken=req.cookies.refreshToken;
    if(!refreshToken){
        throw new apiError(401,"unauthorised");
    }
    try{
    const decode= jwt.verify(refreshToken,process.env.REFRESH_TOKEN_SECRET_KEY)
  
    const user=await User.findById(decode._id);
    if(!user){
        throw new apiError(401,"invalid refresh Token")
    }
    if(user.refreshToken!==refreshToken){
        throw new apiError(401,"invalid refresh token")
          const accessToken = user.generateAccessToken();

    res
        .status(200)
        .cookie("accessToken", accessToken, accessOptions)
        .json(new apiResponse(200, {}, "Access token refreshed"));
    }
}catch(err){
   if(err.name=="TokenExpiredError"){
    throw new apiError(401," REFRESH_TOKEN EXPIRED")
   }
    if (error.name === "JsonWebTokenError") {
        throw new apiError(401, "Invalid refresh token");
    }
        throw new apiError(500, "Something went wrong while verifying refresh token");

}
})
//logout setup
const logout=asyncHandler(async(req,res)=>{
    const userId= req.user._id;
    await User.findByIdAndUpdate(
        userId,
        {
            $set:{
                refreshToken:undefined
            }
            
        },
        {
            new:true
        }
    )
    const options={
        httpOnly:true,
        secure:true
    }
    
    return res
    .status(200)
    .clearCookie("accessToken",options)
    .clearCookie("refreshToken",options)
    .json(
        new apiResponse(200,{},"User logged out")
    )
})

//getprofile
const getProfile= asyncHandler(async(req,res)=>{
   
    const user= req.user
    if(!user){
        throw new apiError(401,"Unauthorized")
    }
    return res
    .status(200)
    .json(
        new apiResponse(200,user,"Profile fetched successfully")
    )
})
//update profile(pic,username,email,password)
const updateProfile=asyncHandler(async(req,res)=>{
    const {userName,email}=req.body;
     
    const profilePicUpdatePath= req.file?.path;
    let url;
    if(profilePicUpdatePath){
        const  profilePicUpdatedURL=await upploadToCloudinary(profilePicUpdatePath);
       
         url= profilePicUpdatedURL
    }

    const updateFields={
        userName:userName,
        publicid:profilePicUpdatedURL.public_id

    }
    if(email){
        updateFields.email=email
    }
    if(url){
        updateFields.profilePic = url
    }
    const user = await updateById(req.user._id,updateFields)
  
    if(!user){
        throw new apiError(500,"update failed")
    }
   return res
   .status(200)
   .json(
    new apiResponse(200,user,"Profile updated successfully")
   )

})
//password-update
const passwordUpdate=asyncHandler(async(req,res)=>{
    const {oldPassword,newPassword}=req.body;

    const userId=req.user._id;
    const passwordValidity=await req.user.isPasswordCorrect(oldPassword)
    
    if(!passwordValidity){
        throw new apiError(401,"Password invalid")
    }
   const user=await User.findById(
        userId,
        {
            $set:{
                password:newPassword
            }
        }
   ).select("-password -refreshToken")
     
   if(!user){
    throw new apiError(500,"Couldnot  update password !please try again after some time")
   }
   return res
   .status(200)
   .json(
    new apiResponse(200,{},"password updated successfully")
   )
})
//delete User[for tourist]
const deleteUser= asyncHandler(async(req,res)=>{
    const {_id}=req.user;
   
    const result= await deletion(_id)
   if(result==null){
    throw new apiError(404,"user not found ")
   }

    await Review.updateMany(
        {userId:_id},
        {$set:{
            
            userName:"deleted User",
            isAnonymous:true
        }}
    )
   const options={
    httpOnly:true,
    secure:true,
    sameSite: "strict"
   }
    return res
    .status(200)
    .clearCookie("accessToken",options)
    .clearCookie("refreshToken",options)
    .json(
        new apiResponse(200,{},"User deleted successfully")
    )
})


export { AccessTokenGenerator,RefreshTokenGenerator,registerUser,login,logout,getProfile,updateProfile,passwordUpdate,deleteUser,userScheme}