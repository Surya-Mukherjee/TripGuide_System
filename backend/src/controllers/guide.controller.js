import { asyncHandler } from "../utilities/asyncHandler.js";
import { apiError } from "../utilities/apiError.js";
import { apiResponse } from "../utilities/apiResponse.js";
import { Guide } from "../models/guides.model.js";
import {User} from "../models/user.model.js"
import { Review } from "../models/review.model.js";
import { upploadToCloudinary } from "../utilities/cloudinary.js";
import { guideUpdate, updateById } from "../utilities/updation.js";
import { deletion } from "../utilities/deletion.js";
import {minLength, z} from "zod"
//validate guide
const guideScheme=z.object({
    city:z.string(),
    pricePerHour:z.number().positive(),
    pricePerHour:z.number().positive(),
    experiencedYrs:z.number().positive(),
    minHour:z.number().positive(),
    maxHour:z.number().positive()
})
//complete guideProfile
const completeGuideProfile=asyncHandler(async(req,res)=>{
    const userId=req.user._id;
    
    const {bio,city,pricePerHour,maxsizeofPeople,experiencedYrs,minHour,maxHour}=req.body
    if(!city || !pricePerHour ||!maxsizeofPeople ||!experiencedYrs|| minHour||maxHour){
        throw new apiError(400,"required fields missing")
    }
    const guide = await Guide.create({
        userId:userId,
        bio,
        city,
        pricePerHour,
        maxsizeofPeople,
        experiencedYrs
    })
    if(!guide){
        throw new apiError(500,"failed to complete profile.Try again later!")

    }
    return res.json(
        new apiResponse(201,guide,"Profile completed successfully")
    )
})

//gettin guide profile
const getGuideProfile= asyncHandler(async(req,res)=>{
    const guide= await Guide.findOne({userId:req.user._id}).populate("userId","userName profilePic email")


    if(!guide){
        throw new apiError(404,"profile not found")
    }
    const review=await Review.find({guideId:guide._id}).populate("userId","userName profilePic")
    if(!review){
        throw new apiError(404,"review not present ")
    }
   return res.status(200)
    .json(
        new apiResponse(200,{guide,review},"profile fetched successfully")
    )
})

//updating guide profile
const updateGuideProfile=asyncHandler(async(req,res)=>{

    const guideId= req.params._id;
    const userId= req.user._id;


    if(!userId){

        throw new apiError(404,"user not located")
    }

    const {userName,email,bio,pricePerHour,city}=req.body
    const [blockDates]=req.body
        console.log(bio)
    let url;

    const profilepicpath= req.file?.path

     if(profilepicpath){

        url= upploadToCloudinary(profilepicpath)
     
         if(!url){
            throw new apiError(500,"the cloud failed to upload")
         }
     updatesAccount.profilePic=url?.trim()
    }


    const updatesAccount={}

     let userUpdate= null

     if (userName) updatesAccount.userName = userName.trim();

     if (email) updatesAccount.email = email.trim();
          if (blockedDates.length !=0) updatesAccount.blockedDates = blockDate;
    
     if(Object.keys(updatesAccount).length>0){


        userUpdate=await updateById(userId,updatesAccount)
         console.log(userUpdate)
        if(!userUpdate){

            throw new apiError(500,"user account not updated")
         }
        }

    const updateGuideDetails={}

          
     if(bio){

            updateGuideDetails.bio=bio.trim()
        }

     if(pricePerHour){

            updateGuideDetails.pricePerHour=pricePerHour

        }

    if(city){

            updateGuideDetails.city=city.trim()

        }
   console.log(updateGuideDetails)
    let updateGuideAccounts;

    if(Object.keys(updateGuideDetails).length>0){
         const userId= req.user._id
         updateGuideAccounts=await guideUpdate(guideId,updateGuideDetails)
         console.log(updateGuideAccounts)
        if(!updateGuideAccounts){

            throw new apiError(500,"profile is not updated. try again!")

        }}

        if(!userUpdate && !updateGuideAccounts){

            throw new apiError(400,"No fields were provided to update")
        }

        return res.status(200).json(

            new apiResponse(200,{userUpdate,updateGuideAccounts},"Guide profile updated successfully")

        )
})


const listGuides= asyncHandler(async(req,res)=>{
    const{city, maxexpYrs,minexpYrs}=req.query;

    const filter={}
    
    if(city){
        filter.city={$regex:city,$options:'i'}
    }
   
    if(minexpYrs){
        filter.experiencedYrs.$gte=Number(minexpYrs)
    }
    if(maxexpYrs){
        filter.experiencedYrs.$lte=Number(maxexpYrs)
    }
    const guideList=await Guide.find(filter).select("bio userId experiencedYrs").populate("userId","userName profilePic")

    if(guideList.length==0){
        throw new apiError(500,"No result found for the search")
    }
    return res.status(200).json(
        new apiResponse(200,{guideList},"guides fetched from the search parameters")
    )
})
const getPublicGuideGuide =asyncHandler(async(req,res)=>{
    const guide= await Guide.findById(req.params.id).select("userId ratings experiencedYrs availableDays bio pricePerHour city avgRating totalRating").populate("userId","userName  profilePic ")
       
    const review=await Review.find({guideId:guide._id}).populate("userId","userName profilePic")
    if(!review){
        throw new apiError(404,"review not present ")
    }
    if(!guide){
        throw new apiError(500,"Cannot display guide profile")
    }

    return res
    .status(200)
    .json(
        new apiResponse(200,{guide:guide,review},"profile fetched successfully")
    )
})

const deleteGuide= asyncHandler(async(req,res)=>{
     const userId=req.user._id;
     console.log(userId)
     const guide= await Guide.findOneAndDelete({userId:userId})
     console.log(guide)
     const result= await deletion(userId);
     if(!result){
        throw new apiError(404,"user not found")
     }
     const options={
        httpOnly:true,
        secure:true,
        samesite:true
     }
      return res
         .status(200)
         .clearCookie("accessToken",options)
         .clearCookie("refreshToken",options)
         .json(
             new apiResponse(200,{},"User deleted successfully")
         )
})

const getFeaturedGuides=asyncHandler(async(req,res)=>{
     const guides = await Guide.find()
        .populate("userId", "userName profilePic")
        .sort({ avgRating: -1 })
        .limit(4);

    res.status(200).json({
        success: true,
        guides
    });

})
export { getGuideProfile, completeGuideProfile,getPublicGuideGuide,listGuides,updateGuideProfile,deleteGuide,guideScheme,getFeaturedGuides}