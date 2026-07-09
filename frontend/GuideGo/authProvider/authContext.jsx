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
  setUser(res.data)
 }
 async function register(credentials){
  const res=await registerApi(credentials)
   setUser(res.data);
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
          const guide=await getFeaturedGuides();
          setGuides(guide)
          setUser(data)
        }catch(err){
          setUser(null)
        }finally{
          setLoading(false)
        }
      }
      fetchUser()
 },[])

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