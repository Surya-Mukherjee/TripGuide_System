import React from 'react'
import {Link,NavLink} from "react-router-dom" 
import {useNavigate} from 'react-router-dom'
import { useAuth } from '../../authProvider/authContext'
import Spinner from './smallSpinner/Spinner'

const Navbar = () => {
  const{user,loading}=useAuth()
    const navigate=useNavigate();
    const handleClickGuide=()=>{
    navigate()
    }
  return (
    <div className='nav'>
      <span className='guide'>Guide</span>
      <span className='go'>Go</span>
      <div className="links">
      <NavLink to='/'  style={({isActive})=>({color:isActive?"#111827":"#ffff"})}> 
      Home
      </NavLink>
        <NavLink to='/'  style={({isActive})=>({color:isActive?"#111827":"#ffff"})}> 
       About
      </NavLink>
        <NavLink to='/' onClick={handleClickGuide} style={({isActive})=>({color:isActive?"#111827":"#ffff"})}> 
      Guides
      </NavLink>
      </div>
     if(loading){
      <Spinner/>
     }else if(user){
      <div className='imgContainer'>
        <img src={`$user.profile-pic`}/>
      </div>
     }
     else{
      <div className="authBtn">
        <button id='login'>Login</button>
        <button id='register'>Register</button>
      </div>
     }
    </div>
  )
}

export default Navbar
