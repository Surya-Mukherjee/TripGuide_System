import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../component/navbar'
const NavFooterLayout = () => {
  return (
    <div>
      <Navbar/>
      <outlet/>
      <Footer/>
    </div>
  )
}

export default NavFooterLayout
