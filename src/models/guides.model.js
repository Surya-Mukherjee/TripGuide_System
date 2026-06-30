import mongoose,{Schema} from 'mongoose'


const guidesSchema= new Schema(
    {
        userId:{
            type:Schema.Types.ObjectId,
            ref:"User",
            
        },
        pricePerHour:{
            type:Number,
            default:0,
            required:true
        },
        bio:{
            type:String,
            lowercase:true,
            trim:true
        },
        blockedDates:{
            type:[Date],
            default:[]
        },
        maxsizeofPeople:{
            type:Number
            
        },
        city:{
            type:String,
            required:true
        },
        experiencedYrs:{
            type:Number,
            required:true
        },
        isActive:{
            type:Boolean,
            default:true
        },
        avgRating:{
            type:Number,
            default:0
        },
        totalRating:{
            type:Number,
            default:0
        }
    },
    {timestamps:true})

export const Guide=mongoose.model("Guide",guidesSchema)