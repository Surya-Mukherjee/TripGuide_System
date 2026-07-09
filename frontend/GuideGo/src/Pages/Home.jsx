import React from 'react'
import Hero from '../component/landing/Hero'
import Navbar from '../component/navbar/navbar'
import HowItWorks from '../component/working/HowItWorks'
import FeaturedGuides from '../component/Featured Guides/FeaturedGuides'
import Mission from '../component/Mission/mission'

const Home = ({isVisible}) => {
  return (
    <div>
        <Navbar isVisible={isVisible}/>
      <Hero isVisible={isVisible}/>
      <HowItWorks/>
      <FeaturedGuides/>
      <Mission isVisible={isVisible}/>
    </div>
  )
}

export default Home
