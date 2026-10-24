import React, { useEffect, useState } from "react";
import "./BookingSection.css";
import { getBookingHistory } from "../service/booking.js";
import BookingCard from "../components/BookingCard.jsx";
import './pastBooking.css'
const PastBooking = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await getBookingHistory();

        setBookings(Array.isArray(response) ? response : []);
      } catch (err) {
        console.error("Error fetching booking history:", err);
        setError("Unable to fetch past bookings.");
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  return (
    <main className="all-bookings-page">
      <div className="all-bookings-header">
        <h1>Past Bookings</h1>
        <p>View your previous tours and reservations.</p>
      </div>

      {loading ? (
        <p>Loading past bookings...</p>
      ) : error ? (
        <p>{error}</p>
      ) : bookings.length === 0 ? (
        <p>No past bookings found.</p>
      ) : (
        <BookingCard
          bookings={bookings}
          error={error}
          bookingType="past"
        />
      )}
    </main>
  );
};

export default PastBooking;