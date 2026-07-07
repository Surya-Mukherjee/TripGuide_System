import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../component/navbar/navbar'
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
