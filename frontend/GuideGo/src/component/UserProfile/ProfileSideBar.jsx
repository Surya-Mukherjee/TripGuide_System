import React, { act, useEffect } from "react";
import './ProfileSidebar.css'
import { useState } from "react";
const ProfileSideBar = ({activeSection,setActiveSection}) => {
    const[activeTab,setactiveTab]=useState('profile')
  useEffect(()=>{
   if(activeSection==="past"){
     setactiveTab("past")
   }
   if(activeSection==="upcoming"){
    setactiveTab("upcoming")
   }
  },[activeSection])

  return (
    <aside className="profile-sidebar">

      <button className={`sidebar-item ${activeTab==='profile'?'active':''}`}
      onClick={()=>{
        setactiveTab('profile')
        setActiveSection('')
        
      }}>
        <span>👤</span>
        <span>My Profile</span>
      </button>

      <button className={`sidebar-item ${activeTab==='past'?'active':''}`}
      onClick={()=>{
        setactiveTab('past')
      }}>
        <span>◷</span>
        <span>Past Bookings</span>
      </button>

      <button className={`sidebar-item ${activeTab==='upcoming'?'active':''}`}
      onClick={()=>{
        setactiveTab('upcoming')
      }}>
        <span>▣</span>
        <span>Upcoming Bookings</span>
      </button>

      <button className={`sidebar-item ${activeTab==='setting'?'active':''}`}
      onClick={()=>{
        setactiveTab('setting')
      }}>
        <span>⚙</span>
        <span>Account Settings</span>
      </button>

    </aside>
  );
};

export default ProfileSideBar;