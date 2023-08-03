import React ,{useContext, useState}from "react";
import "../css/SignIn.css";
import logo from "../img/logo.png";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { LoginContext } from "../context/LoginContext";


export default function SignIn() {
  const {setUserLogin}=useContext(LoginContext)
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const notifyA = (msg) => toast.error(msg);
  const notifyB = (msg) => toast.success(msg);

  const postData = () => {
    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    
    if (!emailRegex.test(email)) {
      notifyA("Invalid email");
      return;
    } 
      
    

    fetch("/signin", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        
        email: email,
        password: password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          notifyA(data.error);
        } else {
          notifyB("Signed In Successfully");
          console.log(data)
          localStorage.setItem("jwt",data.token)
          localStorage.setItem("user", JSON.stringify(data.user));

          setUserLogin(true)
          navigate("/");
        }

        
      });
  

    }
  return (
    <div className="signIn">
      <div>
        <div className="loginForm">
          <img className="signUpLogo" src={logo} alt="" />
          <div>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </div>
          <div>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </div>
          <input onClick={()=>{postData()}} type="submit" id="login-btn" value="Sign In" />
        </div>
        <div className="loginForm2">
          Don't have an account?
          <Link to="/signup">
            <span style={{ color: "blue", cursor: "pointer" }}> Sign Up</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
