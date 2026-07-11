import "./register.css";
import { Link, NavLink } from "react-router-dom";
import {
  FaUser,
  FaEnvelope,
  FaLock,
  FaCompass,
  FaEye,
  FaEyeSlash
} from "react-icons/fa";
import { MdTour } from "react-icons/md";
import background from "../../assets/Register.png";
import logo from "../../assets/GuideGo.png";

import { FaPersonWalking } from "react-icons/fa6";
export default function Register() {
  return (
    <section className="register">
        <div className="leftSection"
        style={{
          backgroundImage: `url(${background})`,
      
         
        }}>
            <div className="overlayBlack"></div>
          <div className="leftContent">
            <div className="imgreg">
                    <FaCompass size={30} className="compass"/>
                    <img src={logo} alt="GuideGo"/>
            </div>
       
           <h1>Explore more.
           <br/>
           Experience <span>Better</span></h1>
           <div className="line"></div>
           <p> Join GuideGo and connect with amazing local guides around the world.</p>
          </div>
           
        </div>
        <div className="rightContent">
            <div className="formcard">
                <h2>Create your Account</h2>
                <p>Start your journey with GuideGo</p>
                <form>
                    <div className="inputbox">
                        <FaUser/>
                        <input
                         type="text"
                         placeholder="Enter your username"
                         />
                    </div>
                    <div className="inputbox">
                        <FaEnvelope/>
                        <input
                         type="email"
                         placeholder="Enter your email adress"
                         />
                    </div>
                     <div className="inputbox">
                        <FaEnvelope/>
                        <input
                         type="email"
                         placeholder="Enter your email adress"
                         />
                    </div>
                    <div className="passwordGroup">
                         <div className="inputbox">
                        <FaLock/>
                        <input
                         type="password"
                         placeholder="Password"
                         />
                         <FaEye className="eye" size={30}/>
                           </div>
                          <div className="inputbox">
                                <FaLock />
                                 <input
                                  type="password"
                                   placeholder="Confirm Password"
                                />
                        <FaEye className="eye" size={30} />
                      </div>
                   
                    </div>
                    <label className="roletitle">
                        I am a :
                    </label>
                    <div className="rolecontainer">
                        <label className="rolecard">
                        
                            <input 
                            type="radio"
                            name="role"
                            />

                            <div>
                                  <FaPersonWalking/> 
                                <h4>I am a traveller</h4>
                                <p>I want to travel</p>
                                
                            </div>
                            
                        </label>
                        <label className="rolecard">
                            <input
                               type="radio"
                               name="role"
                               />
                               <div>
                                 <MdTour/>
                                <h4>I am a Guide</h4>
                                <p>I guide Travellers</p>
                               </div>
                        </label>
                    </div>
                    <button type="submit">
                        Create Account
                    </button>
                    <p className="LoginText">
                        Already have an account?<NavLink to="/users/login" style={{fontSize:"1em"}}>LogIn</NavLink>
                    </p>
                </form>
            </div>
        </div>
    </section>
  );
}