import { useEffect, useState } from "react";
import "./Login.css";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Spinner from "../smallSpinner/Spinner";
import { useAuth } from "../../../authProvider/authContext";
import loginimg from "../../assets/login.png"
import { useNavigate } from "react-router-dom";

export default function LoginComponent() {
  const navigate=useNavigate()
    const {login,user}=useAuth();
  const [formData, setFormData] = useState({
    usernameOrEmail: "",
    password: "",
    rememberMe: false,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("FormData:",formData )
    setError("");

    if (!formData.usernameOrEmail.trim()) {
      setError("Username or email is required.");
      return;
    }

    if (!formData.password.trim()) {
      setError("Password is required.");
      return;
    }

    try {
      setLoading(true);

      const body = {
        password: formData.password,
        rememberMe: formData.rememberMe,
      };
      
      if (formData.usernameOrEmail.includes("@")) {
        body.email = formData.usernameOrEmail;
      } else {
        body.userName = formData.usernameOrEmail;
      }
      console.log(body)
      const response = await login(body)

      const data =  response;
       console.log("response:",data)
   

      console.log("Logged In:", data);

      // Navigate("/dashboard");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
   console.log("users:",user)
 useEffect(()=>{
 
  console.log("ran again")
  if(user){
   console.log("navigating...")
    navigate("/")
  }
 },[user])
  return (
    <div className="login-page">
      <div className="login-card">

        <div className="login-image">
          <img src={loginimg} alt="Login" />
        </div>

        <div className="login-form">

          <h1 className="logoLogin">
            Guide<span className="goLogin">GO</span>
          </h1>

          <h2>Nice to see you again</h2>

          <form onSubmit={handleSubmit}>

            <label>Username / Email</label>

            <input
              type="text"
              name="usernameOrEmail"
              placeholder="Email or username"
              value={formData.usernameOrEmail}
              onChange={handleChange}
            />

            <label>Password</label>

            <div className="password-box">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Enter Password"
                value={formData.password}
                onChange={handleChange}
              />

              <button
                type="button"
                className="eye-btn"
                onClick={() => setShowPassword((prev) => !prev)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>

            <div className="login-options">

              <label className="switch">
                <input
                  type="checkbox"
                  name="rememberMe"
                  checked={formData.rememberMe}
                  onChange={handleChange}
                />
                <span className="slider"></span>
              </label>

              <span className="remember">
                Remember me
              </span>

              <a href="/forgot-password">
                Forgot password?
              </a>

            </div>

            {error && (
              <span className="error-message">{error}</span>
            )}

            <button
              type="submit"
              disabled={loading}
              className="submit"
            >
              {loading ? <Spinner/> : "Sign in"}
            </button>

            <span className="follow up question">
              Don't have an account?
              <a href="/signup"> Sign up</a>
            </span>

          </form>

        </div>

      </div>
    </div>
  );
}