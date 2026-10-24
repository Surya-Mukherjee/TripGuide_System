import React, { useEffect, useState } from "react";
import "./BookingSection.css";
import {
  getTouristUpcomingBookings,
} from "../service/booking.js";
import BookingCard from "../components/BookingCard.jsx";

const Upcoming = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await getTouristUpcomingBookings();

        setBookings(Array.isArray(response) ? response : []);
      } catch (err) {
        console.error("Error fetching upcoming bookings:", err);
        setError("Unable to fetch upcoming bookings.");
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  return (
    <main className="all-bookings-page">
      <div className="all-bookings-header">
        <h1>Upcoming Bookings</h1>
        <p>Manage your upcoming tours and reservations.</p>
      </div>

      {loading ? (
        <p>Loading upcoming bookings...</p>
      ) : error ? (
        <p>{error}</p>
      ) : bookings.length === 0 ? (
        <p>No upcoming bookings found.</p>
      ) : (
        <BookingCard
          bookings={bookings}
          error={error}
          bookingType="upcoming"
         
        />
      )}
    </main>
  );
};

export default Upcoming;