import { Guide } from "../models/guides.model.js";
import { User } from "../models/user.model.js";

export const updateById=async(userId,updates)=>{
    return await User.findByIdAndUpdate(
        userId,
        updates,
        {new:true}
    ).select("-password -refreshToken")
}

export const guideUpdate=async(userId,updates)=>{
    return await Guide.findOneAndUpdate(
        userId,
        updates,
        {new:true}
    )
}