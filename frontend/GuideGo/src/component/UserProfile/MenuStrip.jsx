import React, { useState } from 'react'
import './menuStrip.css'
const MenuStrip = ({ActiveTab,setActiveTab}) => {
 

  return (
    <>
    <div className="menustripContainer">
        <div className={ActiveTab==="past" ?"menu-content tabactive":"menu-content"} onClick={()=>{setActiveTab("past")}}>Past Booking</div>
         <div className={ActiveTab==="Upcoming" ?"menu-content tabactive":"menu-content"}onClick={()=>{setActiveTab("Upcoming")}}>Upcoming Booking</div>
          <div className={ActiveTab==="Account" ?"menu-content tabactive":"menu-content"} onClick={() => setActiveTab("Account")}>Account Setting</div>
    </div>
    </>
  )
}

export default MenuStrip
