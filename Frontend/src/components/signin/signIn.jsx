import React, { useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginFailed, loginStart, loginSuccess } from "../../redux/userSlice";
import "./SignIn.css";

const SignIn = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogin = async (e) => {
    dispatch(loginStart());
    try {
      const res = await axios.post("http://localhost:8000/api/auth/signin", { username, password,withCredntials: true,
      credentials: 'include' });
      dispatch(loginSuccess(res.data));
      console.log(res);
      navigate("/");
    } catch (err) {
      dispatch(loginFailed());
      console.log("hello", err);
      navigate("/signup");
    }

  };
  const handlenav = async (e) => {
    e.preventDefault();
    console.log("clicked");
    navigate("/signup")
  }
  const handlenavAdmin = async (e) => {
    e.preventDefault();
    console.log("clicked");
    navigate("/admin")
  }
  return (
    <div className='signin-content'>
      <div className="login-content">
        <img className="imags" src="./src/assets/logi.png" alt="" srcset="" />
        <div className="form">
          <p className='text'>Welcome to Loom <br />Genie!</p>
          <input onChange={(e) => setUsername(e.target.value)} type="test" placeholder="Username" id="email" /><br />
          <input onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Password" id="password" /><br />

          <div className="bt">
            <button onClick={handleLogin} type="submit" className='btn'>LOGIN</button>
            <p>Don't have account? <span onClick={handlenav}>Signup</span></p>
            <p>Admin Login? <span onClick={handlenavAdmin}>Login</span></p>
          </div>
        </div>
        <img className="images" src="./src/assets/logi.png" alt="" srcset="" />
      </div>
    </div>
  );
};

export default SignIn;
