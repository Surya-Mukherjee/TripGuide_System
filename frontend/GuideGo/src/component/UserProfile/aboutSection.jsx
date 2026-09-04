import React from 'react'
import './aboutSection.css'
import { useAuth } from '../../../authProvider/authContext'
const AboutSection = () => {
  const {user}=useAuth();
   const capitalize=(str)=>{
    return str?.charAt(0).toUpperCase() + str?.slice(1);
   }
  return (
    <div className='AboutContainer'>
        
      <h3 className="nametxt"> {capitalize(user?.userName)}</h3>
     
      <span className='emailUser'>{user?.email}</span>
      
      <span className='RoleUser'> {capitalize(user?.role)}</span>
    </div>
  )
}

export default AboutSection
