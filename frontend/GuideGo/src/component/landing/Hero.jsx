import React from 'react'
import { useNavigate } from 'react-router-dom'
import Heroimage from '../../assets/Hero.png' 
import "./Hero.css"
const Hero = ({isVisible}) => {
 
  return (
    <div className='Hero'>
      <div className="image">
        <img src={Heroimage}  alt="guideGo logo"/>
      </div>
      <div className="overlay"></div>
      <div className={`heading ${isVisible?"animate":""}`}>
       <p>Discover local guides and  unforgettable Experiences</p> 
      </div>
      <div className={`subheading ${isVisible?"animate":""}`}>
       <p>Find the perfect  guide  for your journey.Connect  with locals who know  their cities best and book your adventure today</p> 
      </div>
      <button className={`CTA ${isVisible?"animate":""}`} onClick={()=>{
     console.log('buttn clicked')
      }} >
        Explore Guides
      </button>
    </div>
  )
}

export default Hero
