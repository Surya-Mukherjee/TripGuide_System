import React from 'react'
import BookingSection from './BookingSection.jsx'
import ProfileHeader from './ProfileHeader.jsx'
import ProfileSideBar from './ProfileSideBar.jsx'
import Tabs from './tabs.jsx'
import './ProfileSpace.css'
import Navbar from '../navbar/navbar.jsx'
import { useState } from 'react'
const ProfileSpace = () => {
  const [activeSection,setActiveSection]=useState('')
  return (
    <div className='ProfilePage'>
      
     
      <div className="profile-layout">
        <ProfileSideBar activeSection={activeSection} setActiveSection={setActiveSection}/>
        <main className='profile-main'>
           <ProfileHeader/>
           <Tabs
           activeSection={activeSection}/>
           <div className="booking-grid">
            <BookingSection
            title="Upcoming Bookings"
            type="Upcoming"
           
            setActiveSection={setActiveSection}/>
            <BookingSection
             title="Past Booking"
             type="past"
               setActiveSection={setActiveSection}
             />
           </div>
        </main>
        
      
      </div>
      
    </div>
  )
}

export default ProfileSpace
