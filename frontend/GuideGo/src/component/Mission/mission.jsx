import React from 'react'
import {motion} from "motion/react"
import "./mission.css"
import image from "../../assets/image.png"
const Mission = () => {
  return (
    <section className='our-mission'>
        <div className="container">
        <motion.div className='TextSection'
          
        initial={{ opacity: 0, y: 80 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.6,
          delay:  0.2
        }}
        >
        <span className= 'text1'>Our Mission</span>
        <h2 className='text2'>Travel the way locals do</h2>
        <p className='Description'>
            GuideGo bridges the gap between curious travelers and passionate local guides. We believe the best way to understand a place is through the eyes of someone who calls it home. Our platform makes it simple to find, connect, and book authentic experiences that go beyond the typical tourist trail.
        </p>
        </motion.div>
      <motion.div className="imagesection"
      initial={{ opacity: 0, y: 80 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.6,
          delay:  0.4
        }}>
        <img src={image} id='img'/>
      </motion.div>
      </div>
    </section>
  )
}

export default Mission
