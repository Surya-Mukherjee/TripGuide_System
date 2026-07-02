import { asyncHandler } from "../utilities/asyncHandler.js";
import { apiError } from "../utilities/apiError.js";
import { apiResponse } from "../utilities/apiResponse.js";
import { User } from "../models/user.model.js";
import { Guide } from "../models/guides.model.js";
import { Booking } from "../models/bookings.model.js";
import {z} from "zod"
//zod validation schema
const bookingScheme=z.object({
    guideId:z.string().min(1),
    tourDate:z.string().date(),
    numberOfPeople:z.number(),
})
//booking requests
const bookingRequest=asyncHandler(async(req,res)=>{
    const {guideId,tourDate,numberOfPeople,bookingPrice}=req.body;
    const userId=req.user._id;
    const bookings=await Booking.find({
        guideId:guideId,
        tourDate:tourDate,
        status:"BOOKED"

    });

    //calculate no of total bookings for the  current guide
    const TotalNumberOfPeople= bookings.reduce(
        (sum,Booking)=>sum+Booking.noofPeople,
        0
    );
   //check whether noof people exceeds the max no of  people  a travel guide can handle
    if(TotalNumberOfPeople+numberOfPeople>Guide.maxsizeofPeople){
       throw new apiError(400,"Maximum number of people are reached")
     }
     const guide=await Guide.findById(guideId);
     //if guide do not exists 
     if(!guide){
        throw new apiError(404,"Guide not found")
    }
    //tourdate exists
    if(!tourDate){
        throw new apiError(400,"tourDate is required")
    }
    const  selectedDate= new Date(tourDate)
    if(isNaN(selectedDate.getTime())){
        throw new apiError(400,"Invalid tour Date")
    }
    const today=new Date();
    console.log(today)
    if(selectedDate.setHours(0,0,0,0)<today.setHours(0,0,0,0)){
        throw new apiError(400,"selected date cannot be in past")
    }
     
    if(guide.blockedDates.includes(tourDate)){
        throw new apiError(409,"Guide is not available for  the date specified")
    }
    const bookingReq= Booking.create(
        {
            guideId:guideId,
            userId:userId,
            status:"PENDING",
            bookingPrice:bookingPrice,
            paymentStatus:"PENDING",
            tourDate:tourDate,
            noOfPeople:numberOfPeople
        }
    )

    if(!bookingReq){
        throw new apiError(500,"Booking request failed")
    }
    return res.status(201).json(
        new apiResponse(201,bookingReq,"Guide booking created successfull.Please wait for further information!")
    )
     
})

//get  booking request for tourist profile
const getBookingRequestTourist=asyncHandler(async(req,res)=>{
    const userId=req.user._id;
    const booking= await Booking.find({userId,status:"PENDING"}).populate("userId","userName email" ).populate({
        path:"guideId",
        select:"city rating userId",
        populate:{
            path:"userId",
            select:"userName email "
        }
    })
    if(booking.length===0){
        return res.json(
            new apiResponse(404,[],"No upcoming bookings")
        )
    }
    return res.json(
        new apiResponse(200,booking,"Bookings are fetched successfully ")
    )
})

//get booking requests  for guide

const getBookingRequestGuide=asyncHandler(async(req,res)=>{
    const userId=req.user._id;
    const guide= await Guide.findOne({
        userId
    })
    const guideId=guide._id;
    const booking= await Booking.find({guideId,status:"PENDING"}).populate("userId","userName email" ).populate({
        path:"guideId",
        select:"city ",
    })
    if(booking.length===0){
        return res.json(
            new apiResponse(404,[],"No upcoming bookings")
        )
    }
    return res.json(
        new apiResponse(200,booking,"Bookings are fetched successfully ")
    )
})


//get Booked bookings(for guide)
const getBookedBookingGuide=asyncHandler(async(req,res)=>{
    const userId=req.user._id;
    const guide= await Guide.findOne({
        userId
    })
    const guideId=guide._id;
    const booking= await Booking.find({guideId,status:"BOOKED"}).populate("userId","userName email" ).populate({
        path:"guideId",
        select:"city ",
    })
    if(booking.length===0){
        return res.json(
            new apiResponse(404,[],"No upcoming bookings")
        )
    }
    return res.json(
        new apiResponse(200,booking,"Bookings are fetched successfully ")
    )
})


//get booked bookings(for tourist)
const getBookedRequestTourist=asyncHandler(async(req,res)=>{
    const userId=req.user._id;
    const booking= await Booking.find({userId,status:"BOOKED"}).populate("userId","userName email" ).populate({
        path:"guideId",
        select:"city rating userId",
        populate:{
            path:"userId",
            select:"userName email "
        }
    })
    if(booking.length===0){
        return res.json(
            new apiResponse(404,[],"No upcoming bookings")
        )
    }
    return res.json(
        new apiResponse(200,booking,"Bookings are fetched successfully ")
    )
})

//get booking history
const getBookingHistoryTourist=asyncHandler(async(req,res)=>{
    const userId=req.user._id;
    const booking= await Booking.find({userId,status:"COMPLETED"}).populate("userId","userName email" ).populate({
        path:"guideId",
        select:"city rating userId",
        populate:{
            path:"userId",
            select:"userName email "
        }
    })
    .sort({createdAt:-1})
    .limit(10)
    
    if(booking.length===0){
        return res.json(
            new apiResponse(404,[],"No  booking history")
        )
    }
    return res.json(
        new apiResponse(200,booking,"Booking histories are fetched successfully ")
    )
})

//cancelling booking Request
const cancelBooking=asyncHandler(async(req,res)=>{
    const {bookingId}=req.params
    const Bookings=await Booking.find({bookingId})
    if(!Bookings){
        throw new apiError(404,"Booking not found")
    }
    if(Bookings.status=="COMPLETED"){
        throw new apiError(409,"Cant cancel a completed tour")
    }
   Bookings.status="CANCELLED"
   await Bookings.save()
   
    return res.json(
        new apiResponse(200,{},"Booking successfully cancelled")
    )
})

//Accepting booking request
const AcceptBooking=asyncHandler(async(req,res)=>{
    const {bookingid}=req.params;

    const bookings=await Booking.findById(bookingid)
    if(!bookings){
        throw new apiError(404,"Booking does not exists")
    }
    bookings.status="BOOKED",
    await bookings.save()
    return res.json(
        new apiResponse(200,{},"Booking accepted")
    )
})


//Rejecting booking request

const RejectBooking=asyncHandler(async(req,res)=>{
    const {bookingid}=req.params;
    const bookings=await Booking.findById(bookingid)
    if(!bookings){
        throw new apiError(404,"Booking does not exists")
    }
    if(bookings.status==="BOOKED"){
        throw new apiError(409,"cant reject already accepted booking")
    }
    bookings.status="REJECTED",
    await bookings.save()
    return res.json(
        new apiResponse(200,{},"Booking Rejected")
    )
})

export {bookingRequest,RejectBooking,AcceptBooking,getBookingRequestTourist,getBookingRequestGuide,getBookedBookingGuide,getBookingHistoryTourist,getBookedRequestTourist,cancelBooking,bookingScheme}
