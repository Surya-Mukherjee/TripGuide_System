import { asyncHandler } from "../utilities/asyncHandler";
import { apiError } from "../utilities/apiError";
import { apiResponse } from "../utilities/apiResponse";
import { Guide } from "../models/guides.model";
import {User} from "../models/user.model"
import { Review } from "../models/review.model";
import { upploadToCloudinary } from "../utilities/cloudinary";
import { updateById } from "../utilities/updation";



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


    const userId= req.user._id;


    if(!userId){

        throw new apiError(404,"user not located")
    }

    const {userName,email,bio,pricePerHour,city}=req.body

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
         
     if(Object.keys(updatesAccount).length>0){


        userUpdate=await updateById(userId,updatesAccount)

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

    let updateGuideAccounts=null

    if(Object.keys(updateGuideDetails).length>0){

         updateGuideAccounts=await updateGuide(req.user._id,updateGuideDetails)

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
    const{city, name,maxexpYrs,minexpYrs}=req.query;

    const filter={}
    
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
export { getGuideProfile, getPublicGuideGuide,listGuides,updateGuideProfile}