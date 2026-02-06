import { User } from "../models/user.model";

export const updateById=async(UserId,updates)=>{
    return await User.findByIdAndUpdate(
        userId,
        updates,
        {new:true}
    )
}