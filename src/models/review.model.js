import mongoose,{Schema} from 'mongoose'


const reviewSchema=new Schema({
    guideId:{
        type:Schema.Types.ObjectId,
        ref:"Guide"
    },
    userId:{
        type:Schema.Types.ObjectId,
        ref:"User"
    },
    userName:{
        type:String,
        required:true
    },
    isAnonymous:{
        type:Boolean,
        default:false
    },
    rating:{
        type:Number,
        default:0
    },
    comment:{
        type:String,
        trim:true
    }
},{timestamps:true})

reviewSchema.index({guideId:1,userId:1},
    {unique:true,
           partialFilterExpression: { userId: { $type: "objectId" } }
    }
)

export const Review=mongoose.model("Review",reviewSchema)