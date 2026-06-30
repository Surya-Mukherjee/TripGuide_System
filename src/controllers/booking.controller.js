import { asyncHandler } from "../utilities/asyncHandler.js";
import { apiError } from "../utilities/apiError.js";
import { apiResponse } from "../utilities/apiResponse.js";
import { User } from "../models/user.model.js";
import { Guide } from "../models/guides.model.js";
import { Booking } from "../models/bookings.model.js";

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
        (sum,Booking)=>sum+Booking.noOfPeople,
        0
    );
   //check whether noof people exceeds the max no of  people  a travel guide can handle
    if(TotalNumberOfPeople+noOfPeople>Guide.maxsizeofPeople){
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
    if(isNaN(validTourDateCheck.getTime())){
        throw new apiError(400,"Invalid tour Date")
    }
    const today=new Date();
    if(selectedDate<today){
        throw new apiError(400,"selected date cannot be in past")
    }
     const guide=await Guide.findById(guideId);
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

    if(!booking){
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
const getBookingRequestTourist=asyncHandler(async(req,res)=>{
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

//cancelling booking Request
