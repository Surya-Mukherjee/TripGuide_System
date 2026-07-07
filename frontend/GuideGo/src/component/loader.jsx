import React from 'react'
import '../CSS/loader.css'
const Loader = ({startAnimation}) => {
    const arr=Array.from({length:7})
    
  return (
    <div className="loading-screen">
        <div className={startAnimation?'logo fade':"logo"}> <span className='guide'>Guide</span>
       <span className='go'>Go</span></div>
    <div className="bar-container">
    
      {arr.map((_,index)=>{
          return <div key={index} className={`bar ${startAnimation?"animate":""}`} style={{"--delay":`${(index*0.15).toFixed(2)}s`}}></div>
      })}
      
    </div>
    </div>
  )
}

export default Loader
