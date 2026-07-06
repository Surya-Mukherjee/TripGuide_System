import { useContext,createContext,useEffect,useState } from "react";
import {getCurrentUser} from "../src/service/user.js";
import { loginApi, logoutApi, passwordUpdateApi, registerApi } from "../src/service/auth.js";
const authContext= createContext();

export function AuthProvider({children}){
 const[user,setUser]=useState(null);
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
          const data=await getCurrentUser()
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