import React from 'react'
import {Link,NavLink} from "react-router-dom" 
import {useNavigate} from 'react-router-dom'
const Navbar = () => {
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
      .authentication x
    </div>
  )
}

export default Navbar
