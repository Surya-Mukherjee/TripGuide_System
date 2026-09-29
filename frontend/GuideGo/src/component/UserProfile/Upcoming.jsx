import React, { useEffect, useState } from 'react'
import { getTouristUpcomingBookings } from '../../service/booking'
import "./Upcoming.css"
const Upcoming = () => {
    const [upcomingBooking, setUpcomingBooking] = useState([])

    useEffect(() => {
        async function fetchUpcomingBooking() {
            try {
                const bookings = await getTouristUpcomingBookings()
                setUpcomingBooking(bookings)
            } catch (err) {
                console.error('error:', err)
                setUpcomingBooking([])
            }
        }

        fetchUpcomingBooking()
    }, [])

  return (
    <div className='UpcomingBooking'>
      {upcomingBooking.length > 0 ? upcomingBooking.map((booking) => (
          <div className="card-container" key={booking.id}>
                <div className="guide-img">
                    <img src={booking.guideId.userId.profilePic} alt="Guide" />
                </div>
                <div className="booking-details"><div className="BookingHeader">
                            <h2>{booking.guideId.city}</h2>

                            <span className="BookingStatus">
                               {booking.status}
                            </span>
                        </div>

                        <p className="GuideName">
                            Guide: {booking.guideId.userId.userName}
                        </p>

                        <div className="BookingDetails">
                            <div>
                                <span>Guide Email</span>
                                <strong>
                                    {booking.guideId.userId.email}
                                </strong>
                            </div></div>
                </div>
            </div>
        )) : <p>No upcoming bookings.</p>}
    </div>
  )
}

export default Upcoming
