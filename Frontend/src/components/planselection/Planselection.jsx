import React, { useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import "./Plan.css";
import { loginSuccess } from '../../redux/userSlice';
import SignIn from '../signin/signIn';

const Planselection = () => {
  const [plandetails, setplandetails] = useState("");
  const { currentUser } = useSelector((state) => state.user);
  // const [email, setEmail] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleSilver = async () => {
    setplandetails("Silver");
    const res = await axios.post(`http://localhost:8000/api/plans/${currentUser._id}`, { plandetails: "Silver" });
    dispatch(loginSuccess(res.data));
    navigate(`/`);
  };
  const handleGold = async () => {
    setplandetails("Gold");
    const res = await axios.post(`http://localhost:8000/api/plans/${currentUser._id}`, { plandetails: "Gold" });
    dispatch(loginSuccess(res.data));
    navigate(`/`);
  };
  const handlePlat = async () => {
    setplandetails("Platinum");
    const res = await axios.post(`http://localhost:8000/api/plans/${currentUser._id}`, { plandetails: "Platinum" });
    dispatch(loginSuccess(res.data));
    navigate(`/`);
  };
  return (
    <>
      {!currentUser ? (
        <SignIn />
      ) : (
        <div>
          <div className="header-img">
            <img src="../src/assets/logi.png" alt="LOOM-GENIE" />
          </div>
          <div className="header-text">
            <p >Choose your desired plan.</p>
          </div>



          <div className="price">

            <div className="pricing-plan">
              <h6>Pro Plan</h6>
              <div className="desc">
                Perfect for business that want to give Instagram outreach
              </div>
              <hr />
              <h1>$99<span>/mo</span></h1>
              <button onClick={handleSilver} type="submit" className='btn2'>
                3 day free trial
              </button>
              <hr />
              <div className="pricing-feature">
                <ul>
                  <li>50-70+ messages per day</li>
                  <li>1 IG account</li>
                  <li>Guaranteed client or refund</li>
                </ul>
              </div>
            </div>

            <div className="pricing-block">
              <div className="pricing-plan second">
                <h6>Scale Plan</h6>
                <div className="desc">
                  The plan for businesses that want to scale as fast as possible.
                </div>
                <hr />
                <h1>$174<span>/mo</span></h1>
                <button onClick={handleGold} type="submit" className='btn2'>
                  3 day free trial
                </button>
                <hr />
                <div className="pricing-feature">
                  <ul>
                    <li>1000s of messages per day</li>
                    <li>Upto 50 IG accounts</li>
                    <li>Scale up your outreach</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="pricing-plan">
              <h6>Enterprise Plan</h6>
              <div className="desc">
                Want to use hundreds of accounts?
                <br />  Use our website 'white glove' plan.
              </div>
              <hr />
              <h1>Custom</h1>
              <button onClick={handlePlat} type="submit" className='btn2'>
                Contact us
              </button>
              <hr />
              <div className="pricing-feature">
                <ul>
                  <li>Need even more accounts</li>
                  <li>Expert consultings</li>
                  <li>Account sourcing</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

      )}
    </>


  )
};

export default Planselection;
