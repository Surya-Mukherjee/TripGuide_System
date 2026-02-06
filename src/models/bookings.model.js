import mongoose,{Schema} from 'mongoose'


const bookingSchema=new Schema({
    status:{
        type:String,
        enum:["PENDING","CONFIRMED","BOOKED","CANCELLED"],
        required:true
    },
    bookingPrice:{
        type:Number,
        required:true
    },
    paymentStatus:{
        type:String,
        enum:["PENDING","COMPLETED","FAILED","REFUNDED"],
        default:"PENDING",
        required:true
    },
    startAt:{
        type:Date,
        required:true
    },
    duration:{
        type:Number,
        required:true
    },
    guideId:{
        type:Schema.Types.ObjectId,
        ref:"Guide"
    },
    userId:{
        type:Schema.Types.ObjectId,
        ref:"User"
    }

},{timestamps:true})


export const Booking= mongoose.model("Booking",bookingSchema)