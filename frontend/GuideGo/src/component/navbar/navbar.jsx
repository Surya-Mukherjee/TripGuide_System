import React, { useState } from 'react'
import { Link, NavLink, useNavigate } from "react-router-dom"
import { useAuth } from '../../../authProvider/authContext'
import Spinner from '../smallSpinner/Spinner'
import './navbar.css'

const Navbar = ({ isVisible }) => {

    const { user, loading } = useAuth()
    const navigate = useNavigate()

    const [menuOpen, setMenuOpen] = useState(false)

    const handleClickGuide = () => {
        navigate()
    }

    const handleClickLogin = () => {
        navigate("/users/login")
        setMenuOpen(false)
    }

    const handleClickRegister = () => {
        navigate("/users/register")
        setMenuOpen(false)
    }

    const closeMenu = () => {
        setMenuOpen(false)
    }

    return (
        <div className={`nav ${isVisible ? "animate" : ""}`}>

            <div className="logonav">
                <span className='Guide'>Guide</span>
                <span className='Go'>Go</span>
            </div>

            <div
                className={`hamburger ${menuOpen ? "open" : ""}`}
                onClick={() => setMenuOpen(!menuOpen)}
            >
                <span></span>
                <span></span>
                <span></span>
            </div>

            <div className={`links ${menuOpen ? "showMenu" : ""}`}>

                <div className="mobileTop">

                    {loading ? (
                        <Spinner />
                    ) : user ? (

                        <NavLink
                            className="mobileProfile"
                            to="/users/profile"
                            onClick={closeMenu}
                        >
                            <img
                                className="mobileProfilePic"
                                src={user.data.data.profilePic}
                                alt="Profile"
                            />
                        </NavLink>

                    ) : (

                        <div className="mobileBtns">

                            <button
                                id="mobileLogin"
                                onClick={handleClickLogin}
                            >
                                Login
                            </button>

                            <button
                                id="mobileRegister"
                                onClick={handleClickRegister}
                            >
                                Register
                            </button>

                        </div>

                    )}

                </div>

                <NavLink
                    to="/"
                    className={({ isActive }) => isActive ? "active" : "notActive"}
                    onClick={closeMenu}
                >
                    Home
                </NavLink>

                <NavLink
                    to="/About"
                    className={({ isActive }) => isActive ? "active" : "notActive"}
                    onClick={closeMenu}
                >
                    About
                </NavLink>

                <NavLink
                    to="/Guides"
                    className={({ isActive }) => isActive ? "active" : "notActive"}
                    onClick={closeMenu}
                >
                    Guides
                </NavLink>

            </div>

            {loading ? (

                <Spinner />

            ) : user ? (

                <div className='imgcontainer'>
                    <NavLink
                        className="profile"
                        to="/users/profile"
                    >
                        <img
                            className="profilePic"
                            src={user.data.data.profilePic}
                            alt="Profile"
                        />
                    </NavLink>
                </div>

            ) : (

                <div className="authBtn">

                    <button
                        id='login'
                        onClick={handleClickLogin}
                    >
                        Login
                    </button>

                    <button
                        id='register'
                        onClick={handleClickRegister}
                    >
                        Register
                    </button>

                </div>

            )}

        </div>
    )
}

export default Navbar