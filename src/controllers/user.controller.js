import { User } from '../models/user.model.js'
import { asyncHandler } from '../utilities/asyncHandler.js'
import { apiError } from '../utilities/apiError.js'
import { apiResponse } from '../utilities/apiResponse.js'
import { upploadToCloudinary } from '../utilities/cloudinary.js'
import { updateById } from '../utilities/updation.js'
import { Review } from '../models/review.model.js'
import { Guide } from '../models/guides.model.js'
import fs from 'fs'
const refreshAndAccessTokenGenerator=async(user_id)=>{
    const user= await User.findById(user_id);
    const accessToken=user.accessTokenGenerator();
    const refreshToken=user.refreshTokenGenerator();
    user.refreshToken=refreshToken
    user.save({validateBeforeSave:false})
    return {accessToken,refreshToken}
}
const registerUser= asyncHandler(async(req,res)=>{
     const {userName,email,role,password}= req.body
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
              profilePic:profilePicUrl,
              password,
              role
           })
    
          
    //      if(role==='guide'){
    //        try {
    //          const { bio ,pricePerHour,availableDays,city,experiencedYrs}=req.body;
    //          if (!pricePerHour || !city || !experiencedYrs) {
    //              throw new apiError(400, "Required guide fields missing");
    //  }
    //          const guide= await Guide.create({
    //              pricePerHour,
    //              bio:bio?.trim().toLowerCase(),
    //              availableDays,
    //              city,
    //              experiencedYrs
    //          })
    //        } catch (error) {
    //            throw new apiError(500,"Guide not created")
    //        }
           
        //  }
     const userStatus= await User.findById(user._id).select("-password -refreshToken")
         console.log("hi2")
   

     return res.status(201).json( 
        new apiResponse(200,userStatus,"User registered successfully")
     )
})

//login setup

const login=asyncHandler(async (req,res)=>{
    const{userName,email,password}= req.body;
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

    const {accessToken,refreshToken}=await refreshAndAccessTokenGenerator(user._id)
    const loggedIn= await User.findById(user._id).select("-password -refreshToken");
    const options={
        httpOnly:true,
        secure:true
    }
    return res
    .status(200)
    .cookie("accessToken",accessToken,options)
    .cookie("refreshToken",refreshToken,options)
    .json(
         new apiResponse(200,{
            user:loggedIn,
            role:loggedIn.role,
            accessToken,
            refreshToken
         },"User is logged in")
)})

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
        userName:userName

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
//delete User
const deleteUser= asyncHandler(async(req,res)=>{
    const {_id}=req.user;
    const {deleteUserValidity}=req.body;
    if(deleteUserValidity=='false'){
        return res.json(
            new apiResponse(200,{},"Deleting cancelled")
        )
    }
    const user= await User.findByIdAndDelete(_id)
    if(!user){
        throw new apiError(404,"User not found")
    }

    await Review.updateMany(
        {userId:_id},
        {$set:{
            userId:null,
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
//booking history



export { registerUser,login,logout,getProfile,updateProfile,passwordUpdate,deleteUser}