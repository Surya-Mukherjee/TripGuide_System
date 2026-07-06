import api from "./api";

export async function createBooking(data) {
  const res = await api.post("/bookings", data);
  return res.data;
}

export async function getTouristBookingRequests() {
  const res = await api.get("/Booking/tourist/booking-requests");
  return res.data;
}

export async function getGuideBookingRequests() {
  const res = await api.get("/Booking/guide/booking-requests");
  return res.data;
}

export async function getGuideUpcomingBookings() {
  const res = await api.get("/Booking/guide/upcoming-bookings");
  return res.data;
}

export async function getTouristUpcomingBookings() {
  const res = await api.get("/Booking/tourist/upcoming-bookings");
  return res.data;
}

export async function getBookingHistory() {
  const res = await api.get("/Booking/bookings/history");
  return res.data;
}

export async function acceptBooking(bookingId) {
  const res = await api.patch(`/Booking/bookings/${bookingId}/accept`);
  return res.data;
}

export async function rejectBooking(bookingId) {
  const res = await api.patch(`/Booking/bookings/${bookingId}/reject`);
  return res.data;
}

export async function cancelBooking(bookingId) {
  const res = await api.patch(`/Booking/bookings/${bookingId}/cancel`);
  return res.data;
}