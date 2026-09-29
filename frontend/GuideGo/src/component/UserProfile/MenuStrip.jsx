import React, { useState } from 'react'
import './menuStrip.css'
const MenuStrip = ({ActiveTab,setActiveTab,setshowSetting}) => {
  const onChangeHandler=(tab)=>{
    if(tab==="Setting"){
      setActiveTab(tab);
      setshowSetting(true)
      return
    }else{
      setActiveTab(tab);
      setshowSetting(false)
    }
  }
  return (
    <>
    <div className="menustripContainer">
        <div className={ActiveTab==="past" ?"menu-content tabactive":"menu-content"} onClick={()=>{onChangeHandler("past")}}>Past Booking</div>
         <div className={ActiveTab==="Upcoming" ?"menu-content tabactive":"menu-content"}onClick={()=>{onChangeHandler("Upcoming")}}>Upcoming Booking</div>
          <div className={ActiveTab==="Account" ?"menu-content tabactive":"menu-content"} onClick={()=>{onChangeHandler("Setting")}}>Account Setting</div>
    </div>
    </>
  )
}

export default MenuStrip
