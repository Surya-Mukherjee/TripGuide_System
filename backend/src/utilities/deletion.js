import {User} from '../models/user.model.js'
import { apiError } from './apiError.js'
import { asyncHandler } from './asyncHandler.js'
import { deleteFromCloudinary } from './cloudinary.js'
const deletion= async(id)=>{
    console.log("hi")
     const user=await User.findById(id)
     if(!user){
        throw new apiError(404,"no users to be deleted")
     }
     try{const result= await deleteFromCloudinary(user.publicid)

     }
     catch(err){
      console.log(err.message)
     }
     
    
     const resultUser=User.findByIdAndDelete(id)
     console.log("result is :",resultUser)
     if(!resultUser){
        return null
     }else{
        console.log("resultUser:",resultUser)
        return resultUser
     }
}
export{deletion}