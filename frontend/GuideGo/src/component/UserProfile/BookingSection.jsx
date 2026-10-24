import React, { useEffect, useState } from "react";
import "./BookingSection.css";
import {
  getBookingHistory,
  getTouristUpcomingBookings,

} from "./../../service/booking.js";
import BookingCard from "./BookingCard.jsx";

const BookingSection = ({ title, type,setActiveSection }) => {
  const [upcomingBookings, setUpcomingBookings] = useState([]);
  const [pastBookings, setPastBookings] = useState([]);
  const [error, setErrors] = useState("");



  useEffect(() => {
    async function fetchBookings() {
     
      setErrors("");

      try {
        const [upcomingBookingsRes, pastBookingsRes] =
          await Promise.all([
            getTouristUpcomingBookings(),
            getBookingHistory(),
          ]);

        setUpcomingBookings(
          Array.isArray(upcomingBookingsRes)
            ? upcomingBookingsRes
            : []
        );

        setPastBookings(
          Array.isArray(pastBookingsRes)
            ? pastBookingsRes
            : []
        );
      } catch (err) {
        console.error("Error fetching bookings:", err);
        setErrors("Can't fetch bookings.");
      } finally {
        setLoading(false);
      }
    }

    fetchBookings();
  }, []);

  const bookingType = type?.toLowerCase();

  const bookings =
    bookingType === "upcoming"
      ? upcomingBookings
      : pastBookings;
      
  const handleBtn=()=>{
    console.log("btn is clicked")
    if(bookingType==='upcoming'){
        setActiveSection("upcoming")
    }
    if(bookingType==="past"){
      setActiveSection("past")
    }
   
  }
  

  return (
    <section className="booking-section">
      <div className="booking-section-header">
        <h2>{title}</h2>

        <button className="view-all-btn"
        onClick={handleBtn}>
          View All →
        </button>
      </div>
      {console.log("parent booking",bookings)}
      <BookingCard bookings={bookings} error={error}
      bookingType={bookingType}/>
      
    </section>
  );
};

export default BookingSection;