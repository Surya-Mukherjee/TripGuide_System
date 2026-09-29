import React, { useEffect, useState } from 'react'
import { getBookingHistory } from '../../service/booking.js'
import './Bookings.css'
const Bookings = () => {

    const [data, setData] = useState([])

    useEffect(() => {
        async function fetchHistory() {
            const history = await getBookingHistory()
            setData(history.data)
        }

        fetchHistory()
    }, [])

    return (
        <div className="BookingContainer">

            {data.length>0?data.map((booking) => (

                <div className="BookingCard" key={booking._id}>

                    <div className="BookingGuideImage">
                        <img
                            src={booking.guideId.userId.profilePic}
                            alt={booking.guideId.userId.userName}
                        />
                    </div>

                    
                    <div className="BookingInfo">

                        <div className="BookingHeader">
                            <h2>{booking.guideId.city}</h2>

                            <span className="BookingStatus">
                                Completed
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
                            </div>

                        </div>

                       

                    </div>

                </div>

            )):<div className="Notfound">
              <span>No history to show</span>
              </div>
            }

        </div>
    )
}

export default Bookings