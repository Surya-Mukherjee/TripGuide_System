import React from 'react'
import {Link,NavLink} from "react-router-dom" 
import {useNavigate} from 'react-router-dom'
import { useAuth } from '../../../authProvider/authContext'
import Spinner from '../smallSpinner/Spinner'
import './navbar.css'
const Navbar = ({isVisible}) => {
  const{user,loading}=useAuth()
    const navigate=useNavigate();
    const handleClickGuide=()=>{
    navigate()
    }
    const handleClickLogin=()=>{
    navigate("/users/login")
    }
  return (
    <div className={`nav${isVisible?" animate":""}`}>
      <div className="logonav">
        <span className='Guide'>Guide</span>
        <span className='Go'>Go</span>
      </div>
      
      <div className="links">
      <NavLink to='/'  className={({isActive})=>isActive?"active":"notActive"}> 
      Home
      </NavLink>
        <NavLink to='/About'  className={({isActive})=>isActive?"active":"notActive"}> 
       About
      </NavLink>
        <NavLink to='/Guides'  className={({isActive})=>isActive?"active":"notActive"}> 
      Guides
      </NavLink>
      </div>
      {console.log(loading)}
      {loading ? (
        <Spinner />
      ) : user ? (
        <div className='imgContainer'>
          <img src={user['profile-pic']} alt='Profile' />
        </div>
      ) : (
        <div className="authBtn">
          <button id='login' onClick={handleClickLogin}>Login</button>
          <button id='register'>Register</button>
        </div>
      )}
    </div>
  )
}

export default Navbar
