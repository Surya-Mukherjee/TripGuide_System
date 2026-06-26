import { asyncHandler } from "../utilities/asyncHandler.js";
import { apiError } from "../utilities/apiError.js";
import { apiResponse } from "../utilities/apiResponse.js";
import { User } from "../models/user.model.js";
import { Guide } from "../models/guides.model.js";
import { Review } from "../models/review.model.js";
import mongoose from "mongoose";
async function updateGuideRating(guideId){
  const stats= await Review.aggregate([
    {$match:{
        guideId:new mongoose.Types.ObjectId(guideId)
    }
    },
    {$group:{
        _id:"$guideId",
        totalRating:{$sum:1},
        avgRating:{$avg:"$rating"}
    }}
  ])

  console.log(stats)
  await Guide.findByIdAndUpdate(
    guideId,{
        totalRating:stats[0]?.totalRating||0,
        avgRating:stats[0]?.avgRating||0
    }
  )
}
const addReview= asyncHandler(async(req,res)=>{
    const guideId= req.params.guideId;
    
    if(!guideId){
        throw new apiError(404,"guide not found")
    }
   
    const {rating,comment}=req.body
  
    const userId=req.user._id;
    const userName=req.user.userName
    
     const review = await Review.create({
         guideId,
         userId,
         userName,
         comment,
         rating
     })
     await updateGuideRatings(guideId)
     return res.json(
        new apiResponse(
            200,{},"review added successfully"
        )
     )
})

 

export {addReview,updateGuideRating}