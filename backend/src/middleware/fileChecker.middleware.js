import { apiError } from "../utilities/apiError.js";
import { asyncHandler } from "../utilities/asyncHandler.js";

export const fileChecker=asyncHandler(async(req,res,next)=>{
    console.log(req.file)
    if(!req.file){
           return res.status(400).json(
        new apiError(
            400,
            { profilePic: "Profile picture is required." },
            "Invalid request"
        )
    );
    }
    next();
})