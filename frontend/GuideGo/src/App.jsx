import React, { useEffect, useMemo, useState } from 'react'
import Loader from './component/loader'
import { useAuth } from '../authProvider/authContext';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import NavFooterLayout from './Layout/NavFooterLayout';
import Hero from './component/landing/Hero';
import Home from './Pages/Home';
import Spinner from './component/smallSpinner/Spinner';
import Login from './Pages/Login';
import RegistrationPage from './Pages/RegistrationPage';
import GuideList from './component/GuideList/GuideList';
import GuideListpage from './Pages/GuideListpage';
import ProfilePage from './Pages/profilePage';
// import ProfilePage from './Pages/profilePage';

const App = () => {
    const [isLoading,setLoading]=useState(true);
    const [isAnimating,setAnimating]=useState(false);
    const [isVisible,setVisible]=useState(false)
    const router=useMemo(()=>
      createBrowserRouter([
  { 
    element:<NavFooterLayout isVisible={isVisible}/>,
    children:[{
      path:"/",
    element:<Home isVisible={isVisible} />
  },{
    
    path:"/My-profile",
    element:<ProfilePage/>
  }
  
    ]
  }
  ,{
    path:"/users",
    children:[
      {path:"login",Component:Login},
      {path:"register",Component:RegistrationPage}
    ]
  },{
    path:"/guides",
    children:[
      {index:true,Component:GuideListpage}
    ]
  },
 
]),[isVisible]
    );
   useEffect(() => {
  document.body.style.overflow = isLoading ? "hidden" : "auto";

  return () => {
    document.body.style.overflow = "auto";
  };
}, [isLoading]);
  useEffect(()=>{
    let timeinterval2
        const timeinterval=setTimeout(()=>{
            setAnimating(true)
            timeinterval2=setTimeout(()=>{
                setLoading(false)
                setAnimating(false)
                setVisible(true)
            },1500)
        },2000);
        return(()=>{
            clearTimeout(timeinterval);
            clearTimeout(timeinterval2)
        })
    },[])
  return (
    <div>
     {isLoading && <Loader startAnimation={isAnimating}/>}
    <RouterProvider router={router}/>

    </div>
  )
}

export default App
