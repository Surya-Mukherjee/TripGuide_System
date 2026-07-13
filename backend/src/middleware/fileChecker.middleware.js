import { asyncHandler } from "../utilities/asyncHandler";

export const fileChecker=asyncHandler(async(req,res,next)=>{
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