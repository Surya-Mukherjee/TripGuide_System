import React, { useEffect, useState } from 'react'
import { cancelBooking } from '../../service/booking.js';

const BookingCard = ({bookings,error,bookingType}) => {
    console.log("bookings",bookings)
    const[loading,setLoading]=useState(true)
 useEffect(()=>{
   setLoading(false)
 },[bookings])
const handleCancelBooking = async (bookingId) => {
    const confirmed = window.confirm(
      "Are you sure you want to cancel this booking?"
    );

    if (!confirmed) return;

    try {
      setCancellingId(bookingId);

      await cancelBooking(bookingId);

      // Update the UI after successful cancellation.
      setUpcomingBookings((prev) =>
        prev.filter((booking) => booking._id !== bookingId)
      );
    } catch (err) {
      console.error("Error cancelling booking:", err);
      

      // window.alert(
      //   "Unable to cancel booking. Please try again."
      // );
    } finally {
      setCancellingId(null);
    }
  };
  return (
   
      <div className="booking-list">
        {loading ? (
          <p>Loading bookings...</p>
        ) : error ? (
          <p>{error}</p>
        ) : bookings.length === 0 ? (
          <p>
            No {bookingType === "upcoming" ? "upcoming" : "past"}{" "}
            bookings found.
          </p>
        ) : (
          bookings.map((booking) => {
            const date = new Date(booking.tourDate);

            return (
              <div
                className="booking-card"
                key={booking._id}
              >
                <div className="booking-date">
                  <strong>{date.getDate()}</strong>

                  <span>
                    {date.toLocaleString("en-IN", {
                      month: "short",
                    })}
                  </span>

                  <small>{date.getFullYear()}</small>
                </div>

                <div className="booking-details">
                  <h3>
                    {booking.guideId?.city
                      ? `Tour in ${booking.guideId.city}`
                      : "Tour booking"}
                  </h3>

                  <p>
                    {booking.noOfPeople}{" "}
                    {booking.noOfPeople === 1
                      ? "person"
                      : "people"}
                  </p>

                  <p>
                    Guide:{" "}
                    {booking.guideId?.userId?.userName ||
                      "Not available"}
                  </p>

                  <p>Price: ₹{booking.bookingPrice}</p>
                </div>

                <div className="booking-actions">
                  <span
                    className={`booking-status ${String(
                      booking.status || ""
                    ).toLowerCase()}`}
                  >
                    {booking.status || "Unknown"}
                  </span>

                  {bookingType === "upcoming" &&
                    booking.status === "PENDING" && (
                      <button
                        className="cancel-booking-btn"
                        onClick={() =>
                          handleCancelBooking(booking._id)
                        }
                        disabled={cancellingId === booking._id}
                      >
                        {cancellingId === booking._id
                          ? "Cancelling..."
                          : "Cancel Booking"}
                      </button>
                    )}
                </div>
              </div>
            );
          })
        )}
      </div>
    
  )
}

export default BookingCard
