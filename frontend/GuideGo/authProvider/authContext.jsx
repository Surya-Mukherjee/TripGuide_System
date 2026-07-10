import { useContext,createContext,useEffect,useState } from "react";
import {getCurrentUser} from "../src/service/user.js";
import { loginApi, logoutApi, passwordUpdateApi, registerApi } from "../src/service/auth.js";
import { getFeaturedGuides } from "../src/service/GuideService.js";
const authContext= createContext();

export function AuthProvider({children}){
 const[user,setUser]=useState(null);
 const[guides,setGuides]=useState()
 const[loading,setLoading]=useState(true);
 async function login(credentials){
  const res= await loginApi(credentials);
   console.log("Full response:", res);
  console.log("res.data:", res.data);
  console.log("res.data.user:", res.data.user);
  setUser(res.data.data.user)
  console.log("user:",user)
  return res.data
 }
 async function register(credentials){
  const res=await registerApi(credentials)
   setUser(res.data.data.user);
   
 }
 async function logout(){
  const res= await logoutApi()
  return res.message
 }
 async function passwordUpdate(password) {
    const res= await passwordUpdateApi(password)
    return res.message
 }
 useEffect(()=>{
    const fetchUser=async()=>{
        try{
          setLoading(true)
          const data=await getCurrentUser()
          setUser(data)
          // const guide=await getFeaturedGuides();
          // console.log(guide)
          // setGuides(guide)
          
        }catch(err){
          setUser(null)
        }finally{
          setLoading(false)
        }
      }
      fetchUser()
 },[])
useEffect(() => {
  console.log("User changed:", user);
}, [user]);
 return (
  <authContext.Provider value={{
    user,
    setUser,
    login,
    passwordUpdate,
    guides,
    logout,
    register,
    loading
  }
  }>
    {children}
  </authContext.Provider>
 )
}

export function useAuth(){
  return useContext(authContext)
}