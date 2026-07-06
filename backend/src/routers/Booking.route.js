import { Router } from "express";
import {bookingRequest,RejectBooking,AcceptBooking,getBookingRequestTourist,getBookingRequestGuide,getBookedBookingGuide,getBookingHistoryTourist,getBookedRequestTourist,cancelBooking, bookingScheme}
 from "../controllers/booking.controller.js"
import { requiredGuide,requireUser } from "../middleware/allowed.middleware.js";
import { verifyjwt } from "../middleware/auth.middleware.js";
import { reqbody } from "../middleware/bodycheck.middleware.js";
import { validate } from "../middleware/validation.middleware.js";
const router=Router();
router.route("/bookings").post(reqbody,validate(bookingScheme),verifyjwt,bookingRequest)
router.route("/tourist/booking-requests").get(verifyjwt,requireUser,getBookingRequestTourist)
router.route("/guide/booking-requests").get(verifyjwt,requiredGuide,getBookingRequestGuide)
router.route("/guide/upcoming-bookings").get(verifyjwt,requiredGuide,getBookedBookingGuide)
router.route("/tourist/upcoming-bookings").get(verifyjwt,getBookedRequestTourist)
router.route("/bookings/history").get(verifyjwt,getBookingHistoryTourist)
router.route("/bookings/:bookingid/accept").patch(verifyjwt,requiredGuide,AcceptBooking)
router.route("/bookings/:bookingid/reject").patch(verifyjwt,requiredGuide,RejectBooking)
router.route("/bookings/:bookingid/cancel").patch(verifyjwt,requireUser,cancelBooking)




export default router