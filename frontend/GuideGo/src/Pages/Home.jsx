import React from 'react'
import Hero from '../component/landing/Hero'
import Navbar from '../component/navbar/navbar'
import HowItWorks from '../component/working/HowItWorks'

const Home = ({isVisible}) => {
  return (
    <div>
        <Navbar isVisible={isVisible}/>
      <Hero isVisible={isVisible}/>
      <HowItWorks/>
    </div>
  )
}

export default Home
