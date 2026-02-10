import { asyncHandler } from "../utilities/asyncHandler.js";
import { apiError } from "../utilities/apiError.js";
import { apiResponse } from "../utilities/apiResponse.js";
import { User } from "../models/user.model.js";
import { Guide } from "../models/guides.model.js";
import { Review } from "../models/review.model.js";

const addReview= asyncHandler(async(req,res)=>{
    const guideId= req.params;
    if(!guideId){
        throw new apiError(500,"guide not found")
    }

    const {rating,comment}=req.body

    const userId=req.user._id;
    
     const review = await Review.create({
         guideId,
         userId,
         comment,
         rating
     })
     await updateGuideStats(guideId)
     return res.json
})

 async function updateGuideStats(guideId){
  const stats= await Review.aggregrate([
    {$match:{guideId}},
    {$group:{
        _id:"$guideId",
        totalRating:{$sum:1},
        avgRating:{$avg:"$rating"}
    }}
  ])

  await Guide.findByIdAndUpdate(
    guideId,{
        totalRating:stats[0]?.avgRating||0,
        avgRating:stats[0]?.avgRating||0
    }
  )
}

export {addReview,updateGuideStats}