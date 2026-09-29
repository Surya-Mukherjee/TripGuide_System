import React, { useState,useEffect} from 'react'
import "./UserProfile.css";
import avatar from "../../assets/avatar.png"
import AboutSection from './aboutSection.jsx';
import { useAuth } from '../../../authProvider/authContext.jsx';
import MenuStrip from './MenuStrip.jsx';
import Bookings from './Bookings.jsx';
import { useNavigate } from "react-router-dom";
import Upcoming from './Upcoming.jsx';
import Account from './Account.jsx';

const Userprofile = () => {
  const navigate= useNavigate();
const {user,loading}=useAuth();
useEffect(()=>{
   if(!loading && !user){
  console.log("i am here")
  navigate("/users/login")
  alert("You are not logged in! ")
}
},[user,loading])

const[ActiveTab,setActiveTab]=useState("past")

const[showSetting,setshowSetting]=useState(false)
const onClose=()=>{
  setshowSetting(false);
  setActiveTab("past")
}
console.log("user:",user)
  return (
    <>
    <div className="profile-cover">
    <div className="profile-pic">
      <img className="Profile-PicImage"src={avatar} alt="profile-pic" ></img>
    </div>
      
    </div>
    <AboutSection/>
    <MenuStrip ActiveTab={ActiveTab} setActiveTab={setActiveTab}  setshowSetting={setshowSetting}/>
    {ActiveTab==="past" && <Bookings/>}
    {ActiveTab==="Upcoming"&&<Upcoming/>}
    {console.log(ActiveTab,showSetting)}
    {
     showSetting && <Account onClose={onClose}/>
    }
    </>
  )
}

export default Userprofile
