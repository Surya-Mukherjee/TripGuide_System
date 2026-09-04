import React, { useState } from 'react'
import "./UserProfile.css";
import avatar from "../../assets/avatar.png"
import AboutSection from './aboutSection.jsx';
import { useAuth } from '../../../authProvider/authContext.jsx';
import MenuStrip from './MenuStrip.jsx';
const Userprofile = () => {
const {user}=useAuth();
const[ActiveTab,setActiveTab]=useState("past")
console.log("user:",user)
  return (
    <>
    <div className="profile-cover">
    <div className="profile-pic">
      <img className="Profile-PicImage"src={avatar} alt="profile-pic" ></img>
    </div>
      
    </div>
    <AboutSection/>
    <MenuStrip ActiveTab={ActiveTab} setActiveTab={setActiveTab}/>
    </>
  )
}

export default Userprofile
