import "./register.css";
import { NavLink, useNavigate } from "react-router-dom";
import {
    FaUser,
    FaEnvelope,
    FaLock,
    FaCompass,
    FaEye,
    FaEyeSlash
} from "react-icons/fa";
import { MdTour } from "react-icons/md";
import { FaPersonWalking } from "react-icons/fa6";
import { useState,useEffect} from "react";

import background from "../../assets/Register.png";
import logo from "../../assets/GuideGo.png";
import avatar from "../../assets/avatar.png";

import { useAuth } from "../../../authProvider/authContext.jsx";

export default function Register() {
    const {register,user}=useAuth()
    const navigate= useNavigate()
    const [preview, setPreview ] = useState(null);
    const [profilePic, setProfilePic] = useState(null);

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const [errors, setErrors] = useState({});

    const [formData, setFormData] = useState({
        userName: "",
        email: "",
        password: "",
        confirmPassword: "",
        role: ""
    });

    useEffect(()=>{
       if(user){
          navigate("/")
       } 
},[user])

    function handleImage(e) {

        const file = e.target.files[0];

        if (!file) return;

        setProfilePic(file);
        setPreview(URL.createObjectURL(file));

        setErrors((prev) => ({
            ...prev,
            profilePic: ""
        }));
    }

    function handleChange(e) {

        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));

        setErrors((prev) => ({
            ...prev,
            [name]: ""
        }));
    }

    async function handleSubmit(e) {

        e.preventDefault();

        if (!profilePic) {
            setErrors((prev) => ({
                ...prev,
                profilePic: "Please upload a profile picture."
            }));
            return;
        }

        const data = new FormData();

        data.append("profile-pic", profilePic);
        data.append("userName", formData.userName);
        data.append("email", formData.email);
        data.append("password", formData.password);
        data.append("confirmPassword", formData.confirmPassword);
        data.append("role", formData.role);

        try {

            const res = await register(data);

            console.log(res.data);

            setErrors({});

        } catch (err) {

            console.log(err);
              console.log(err.response);
  console.log("err.response.data",err.response?.data?.code);
            if (err.response?.data?.code) {
                setErrors(err.response.data.code);
            }

        }
    }
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
               <form onSubmit={handleSubmit}>

    {errors.profilePic && (
        <p className="error">{errors.profilePic}</p>
    )}

    <div className="profileUpload">
        <label htmlFor="profile">

            <img
                src={preview || avatar}
                alt="Profile"
                className="profilePreview"
            />

            <span>Upload Photo</span>

        </label>

        <input
            id="profile"
            type="file"
            accept="image/*"
            onChange={handleImage}
            hidden
        />
    </div>

    {errors.userName && (
        <p className="error">{errors.userName}</p>
    )}

    <div className="inputbox">
        <FaUser />
        <input
            type="text"
            name="userName"
            placeholder="Enter your username"
            value={formData.userName}
            onChange={handleChange}
        />
    </div>

    {errors.email && (
        <p className="error">{errors.email}</p>
    )}

    <div className="inputbox">
        <FaEnvelope />
        <input
            type="email"
            name="email"
            placeholder="Enter your email address"
            value={formData.email}
            onChange={handleChange}
        />
    </div>

    <div className="passwordGroup">

        <div>

            {errors.password && (
                <p className="error">{errors.password}</p>
            )}

            <div className="inputbox">
                <FaLock />

                <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                />

                {showPassword ? (
                    <FaEyeSlash
                        className="eye"
                        size={20}
                        onClick={() => setShowPassword(false)}
                    />
                ) : (
                    <FaEye
                        className="eye"
                        size={20}
                        onClick={() => setShowPassword(true)}
                    />
                )}

            </div>

        </div>

        <div>

            {errors.confirmPassword && (
                <p className="error">{errors.confirmPassword}</p>
            )}

            <div className="inputbox">

                <FaLock />

                <input
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    placeholder="Confirm Password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                />

                {showConfirmPassword ? (
                    <FaEyeSlash
                        className="eyeslash"
                        size={20}
                        onClick={() => setShowConfirmPassword(false)}
                    />
                ) : (
                    <FaEye
                        className="eyeopen"
                        size={20}
                        onClick={() => setShowConfirmPassword(true)}
                    />
                )}

            </div>

        </div>

    </div>

    <label className="roletitle">
        I am a :
    </label>

    {errors.role && (
        <p className="error">{errors.role}</p>
    )}

    <div className="rolecontainer">

        <label className="rolecard">

            <input
                type="radio"
                name="role"
                value="tourist"
                checked={formData.role === "tourist"}
                onChange={handleChange}
            />

            <div>
                <FaPersonWalking />
                <h4>Traveller</h4>
                <p>I want to travel</p>
            </div>

        </label>

        <label className="rolecard">

            <input
                type="radio"
                name="role"
                value="guide"
                checked={formData.role === "guide"}
                onChange={handleChange}
            />

            <div>
                <MdTour />
                <h4>Guide</h4>
                <p>I guide Travellers</p>
            </div>

        </label>

    </div>

    <button type="submit" className="submit">
        Create Account
    </button>

    <p className="LoginText">
        Already have an account?
        <NavLink
            to="/users/login"
            style={{ fontSize: "1em" }}
        >
            LogIn
        </NavLink>
    </p>

</form>
            </div>
        </div>
    </section>
  );
}