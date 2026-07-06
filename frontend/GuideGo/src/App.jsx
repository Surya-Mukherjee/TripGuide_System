import React, { useEffect, useState } from 'react'
import Loader from './component/loader'
import { useAuth } from '../authProvider/authContext';
import Navbar from './component/navbar';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import NavFooterLayout from './Layout/NavFooterLayout';
const router=createBrowserRouter([
{
    path:"/users",
    children:[{
        path:"/login",
        component:Login
    },
    {
        path:"/register",
        component:Register
    },
   
]
},{
    Component:NavFooterLayout,
    children:[
        {
            path:"/users",
            children:[
                {
                    path:"/profile",
                    Component:Profile
                },
                {
                    path:"/settings",
                    Component:Setting
                }
            ]
        },
        {
            path:"/guides",
            children:[
            {path:"/guideList",Component:GuideList},
            {path:"/guides/:guideId",Component:GuideProfile}
            ]
        }
       
    ]
},
{
    Component:ProtectedRoute,
    children:[
        {
            Component:NavFooterLayout,
            children:[
                {path:"/guide/profile",Component:guideProfile},
                
            ]
        }
    ]
}
])
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
    <RouterProvider router={router}/>
      
    </div>
  )
}

export default App
