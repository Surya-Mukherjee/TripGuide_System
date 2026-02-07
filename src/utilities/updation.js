import { Guide } from "../models/guides.model";
import { User } from "../models/user.model";

export const updateById=async(UserId,updates)=>{
    return await User.findByIdAndUpdate(
        userId,
        updates,
        {new:true}
    )
}

export const guideUpdate=async(userId,updates)=>{
    return await Guide.findOneAndUpdate(
        userId,
        updates,
        {new:true}
    )
}