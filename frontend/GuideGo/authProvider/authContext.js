import { useContext,createContext,useEffect,useState } from "react";
import getCurrentUser from "../src/service/getCurrentUser";
const authContext= createContext();

function AuthProvider({children}){
 const[user,setUser]=useState(null);
 const[loading,setLoading]=useState();
 useEffect(()=>{
    const fetchUser=async()=>{
        try{
          const data=await getCurrentUser()
        }
    
    }
 })
}