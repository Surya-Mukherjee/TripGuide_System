import React, { useEffect, useState } from 'react'
import Loader from './component/loader'

const App = () => {
    const [isLoading,setLoading]=useState(true);
    const [isAnimating,setAnimating]=useState(false);
    const [isVisible,setVisible]=useState(true)
    useEffect(()=>{
        const timeinterval=setTimeout(()=>{
            setAnimating(true)
            const timeinterval2=setTimeout(()=>{
                setLoading(false)
            },2000)
        },2000);
        return(()=>{
            clearTimeout(timeinterval);
        })
    },[])
  return (
    <div>

     <Loader startAnimation={isAnimating}/>
      
    </div>
  )
}

export default App
