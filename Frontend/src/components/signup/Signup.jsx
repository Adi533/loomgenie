import React, { useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginFailed, loginStart, loginSuccess } from "../../redux/userSlice";
import "./signup.css";
const Signup = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    dispatch(loginStart());
    try {
      const res = await axios.post("http://localhost:8000/api/auth/signup", { username, password, email });
      dispatch(loginSuccess(res.data));
      console.log(res.data);
      navigate("/");


    } catch (err) {
      dispatch(loginFailed());
      console.log("hello", err);
      navigate("/signup");
    }

  };
  const handleNav = async (e) => {
    e.preventDefault();
    console.log("clicked");
    navigate("/signin")
  }
  return (
    <div>
      <div className="login-content">
        <div className="form">
          <img className="imags" src="./src/assets/logi.png" alt="" srcset="" />

          <p className='wel'>Welcome to Loom <br /> Genie!</p>
          <input onChange={(e) => setUsername(e.target.value)} type="test" placeholder="Username" id="email" /><br />
          <input onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Email" id="email" /><br />
          <input onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Confirm Password" id="email" /><br />
          <div className="bt">
            <button onClick={handleSignup} type="submit" className='btn'>SIGNUP</button>
            <p>Already have account? <span onClick={handleNav}>Login</span></p>
          </div>
        </div>
        <img src="./src/assets/logi.png" alt="" srcset="" className='images' />
      </div>
    </div>
  );
};
export default Signup;
