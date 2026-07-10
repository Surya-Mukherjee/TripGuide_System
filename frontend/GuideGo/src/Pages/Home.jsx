import React from 'react'
import Hero from '../component/landing/Hero'
import Navbar from '../component/navbar/navbar'
import HowItWorks from '../component/working/HowItWorks'
import FeaturedGuides from '../component/Featured Guides/FeaturedGuides'
import Mission from '../component/Mission/mission'
import Footer from '../component/Footer/Footer'
import Spinner from '../component/smallSpinner/Spinner'

const Home = ({isVisible}) => {
  return (
    <div>
        <Navbar isVisible={isVisible}/>
      <Hero isVisible={isVisible}/>
      <HowItWorks/>
      <FeaturedGuides/>
      <Mission />
      <Footer/>
     
    </div>
  )
}

export default Home
