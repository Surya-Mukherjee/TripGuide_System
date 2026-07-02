import mongoose,{Schema} from 'mongoose'


const bookingSchema=new Schema({
     guideId:{
        type:Schema.Types.ObjectId,
        ref:"Guide"
    },
    userId:{
        type:Schema.Types.ObjectId,
        ref:"User"
    },
    status:{
        type:String,
        enum:["PENDING","BOOKED","COMPLETED","CANCELLED","REJECTED"],
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
  tourDate:{
        type:Date,
        required:true
    },
    noOfPeople:Number,
   

},{timestamps:true})


export const Booking= mongoose.model("Booking",bookingSchema)