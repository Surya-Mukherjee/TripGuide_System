import { asyncHandler } from "../utilities/asyncHandler";
import { apiError } from "../utilities/apiError";
import { apiResponse } from "../utilities/apiResponse";
import { Guide } from "../models/guides.model";
import {User} from "../models/user.model"
import { Review } from "../models/review.model";
import { updateProfile } from "./user.controller";
import { upploadToCloudinary } from "../utilities/cloudinary";

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
const updateGuideProfile=asyncHandler(async(req,res)=>{
    const userId= req.user._id;
    if(!userId){
        throw new apiError(500,"cant fetch userid")
    }
    const {userName,email}=req.body
    let url;
    const profilepicpath= req.file?.path
    if(!profilepicpath){
        throw new apiError(500,"no path is associated")

    }
    url= upploadToCloudinary(profile)
     if(!userupdate){
        throw new apiError(500,"user not updated")
          }
})
const listGuides= asyncHandler(async(req,res)=>{
    const{city, name,maxexpYrs,minexpYrs}=req.query;
    const filter={

    }
    if(city){
        filter.city={$regex:city,$options:'i'}
    }
    if(name){
        filter.name={$regex:name,$options:'i'}
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
    const guide= await Guide.findById(req.params.id).select("userId ratings experiencedYrs availableDays bio pricePerHour city").populate("userId","userName  profilePic ")
    
    if(!guide){
        throw new apiError(500,"Cannot display guide profile")
    }

    return res
    .status(200)
    .json(
        new apiResponse(200,{guide:guide},"profile fetched successfully")
    )
})
export { getGuideProfile, getPublicGuideGuide,listGuides}