import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { loginSuccess } from '../../redux/userSlice';
import { useDispatch, useSelector } from "react-redux";
import axios from 'axios';
import SignIn from "../signin/signIn";
import './settings.css';
const Settings = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [email,setemail] = useState("");
  const [currpassword,setPassword] = useState("");
  const [password,setnewPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const changeemail = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(`http://localhost:8000/api/edit/email/${currentUser._id}`, { "id":`${currentUser._id}`,email});
      dispatch(loginSuccess(res.data));;
      navigate(`/edit/${currentUser._id}`);
    } catch (err) {
      console.log("hello", err);
      navigate(`/edit/${currentUser._id}`);
    }

  };
  const changepass = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(`http://localhost:8000/api/edit/pass/${currentUser._id}`, { "id":`${currentUser._id}`,currpassword,password});
      dispatch(loginSuccess(res.data));;
      navigate(`/edit/${currentUser._id}`);
      window.location.reload();
    } catch (err) {
      console.log("hello", err);
      navigate(`/edit/${currentUser._id}`);
    }

  };
  const handleplannav = async (e) =>{
    navigate(`/plans/${currentUser._id}`);
  }
  return (
    <>
            {!currentUser ? (
                <SignIn />
            ) : (

              <div className='setting-content'>
                {/* <img className='image-setting' src="../../assets/logi.png"  /> */}
                <div className="setting-main-content">
                  <h2 className='setting-heading'>Account Settings</h2>
                  <h4>Edit your settings and change password here</h4>
                  <div className="btn8">
                    <button onClick={handleplannav} type="submit">Upgrade your Plan</button>
                  </div>
                  <div className="set-main">
          
                    <div className="my-acc">
                      <h3>My Account</h3>
                      <div className="set-uid">
                        <p>{currentUser.email}</p>
                        <div className="uid-mail">
                          <input onChange={(e) => setemail(e.target.value)} type="email" placeholder="New email" /><br />
                          <button onClick={changeemail} id='change-mail' className='change' type="submit">Change</button>
                        </div>
                      </div>
                    </div>
                    <div className="change-password">
                      <h2>Change Password</h2>
                    </div>
                    <div className="inputs">
                      <input onChange={(e) => setPassword(e.target.value)}  type="password" placeholder="Current Password" /><br />
                      <input type="password" placeholder="New Password" /><br />
                      <input onChange={(e) => setnewPassword(e.target.value)} type="password" placeholder="Confirm Password" /><br />
                      <button onClick={changepass} className='change' type="submit">Change</button>
                    </div>
                  </div>
                </div>
              </div>
                
            )}
        </>
  )
}
export default Settings;