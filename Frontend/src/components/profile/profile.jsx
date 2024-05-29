import React, { useState,useEffect } from 'react';
import "./Profile.css";
import SignIn from '../signin/signIn';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { useDispatch, useSelector } from "react-redux";
import { loginSuccess, logout } from "../../redux/userSlice";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog, faPlus } from '@fortawesome/free-solid-svg-icons';
const Profile = () => {
    const { currentUser } = useSelector((state) => state.user);
    const [countCheck,setcountCheck]=useState(0);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    useEffect(() => {
        const handleReload = async () => {
            const res = await axios.post("http://localhost:8000/api/checkcount", { "userId": `${currentUser._id}`});
            console.log(res.data);
            setcountCheck(res.data);
        };
        
        
        handleReload();
    
        
      }, []);
      
    const handleLogout = () => {

        dispatch(logout());
        navigate('/');

    };
    const handupload = () => {
        navigate(`/`);
        navigate(`/upload/${currentUser._id}`);

    };
    const handleplan = () => {
        
        navigate(`/plans/${currentUser._id}`);

    };
    const handlesettings = () => {

        navigate(`/edit/${currentUser._id}`);

    };
    return (
        <>
            {!currentUser ? (
                <SignIn />
            ) : (

                <div className='main-profile'>
                    <div className="header-profile">
                        
                        <div className="head-text">
                            <h1 className='heading-user'>User Profile</h1>
                        </div>
                        <p className='header-para'>User id: {currentUser.username}</p>
                        <div className="btn7">
                            <button onClick={handlesettings} className='setting' type="submit"><FontAwesomeIcon icon={faCog}></FontAwesomeIcon>  Settings</button>
                            <button onClick={handleLogout} className='log' type="submit">Logout</button>
                        </div>
                    </div>
                    <div className="curr-plan">
                        <p>Current plan-{currentUser.plandetails}</p>
                        <button onClick={handleplan} type="submit">Upgrade your plan</button>
                    </div>
                    <div className="main-loom">
                        <div className="content">
                            <h2>Hi!</h2>
                            <div className="tmt">
                                <div className="total">
                                    <div className="cont">
                                        <h3 className='heading-3'>Total loom sent</h3>
                                        <span className='loom-number'>{countCheck}</span>
                                    </div>
                                    <div className="bt">
                                        <button onClick={handupload} type="submit"> <FontAwesomeIcon icon={faPlus}></FontAwesomeIcon>Create new Task</button>
                                    </div>
                                </div>
                                <div className="imgs">
                                    <img src="./src/assets/logi.png" alt="" srcset="" />
                                </div>
                            </div>
                            <div className="inp">
                            </div>
                        </div>
                        <div className="image-profile">
                            <img src="./src/assets/logi.png" alt="" srcset="" />
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Profile;
