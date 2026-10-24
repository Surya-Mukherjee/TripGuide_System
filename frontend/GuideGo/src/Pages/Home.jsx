import React from 'react'
import Hero from '../component/landing/Hero'
import Navbar from '../component/navbar/navbar'
import HowItWorks from '../component/working/HowItWorks'
import FeaturedGuides from '../component/Featured Guides/FeaturedGuides'
import Mission from '../component/Mission/mission'
import Spinner from '../component/smallSpinner/Spinner'

const Home = ({isVisible}) => {
  return (
    <>
      <Hero isVisible={isVisible}/>
      <HowItWorks/>
      <FeaturedGuides/>
      <Mission />
      
     
    </>
  )
}

export default Home
