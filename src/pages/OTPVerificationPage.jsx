import React, { useState } from 'react';
import '../styles/forget-password.css';
import BackOutlineButton from '../Components/BackOutlineButton';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { ClipLoader } from 'react-spinners';
import axios from 'axios';

const OTPVerificationPage = () => {

    const [loading, setLoading]=useState(false);
    const [OTP, setOTP]=useState(null);
    const navigate=useNavigate();
    const email=useLocation().state;

    console.log(email);

    // Function to handle OTP verification
    const verifyOTP = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await axios.get(
                `${process.env.REACT_APP_BASE_API_URL}/user/verify-otp?email=${email}&otp=${OTP}`
            );
        
            navigate("/create-new-password",{state:email});

        } catch (error) {
            console.log(error);
            if (axios.isAxiosError(error)) {
                // Handle specific Axios error cases if needed
                if (error.response.status === 404) {
                    toast.error("Account not found for this "+email);
                } else if(error.response.status === 400) {
                    toast.error("OTP verification failed...");
                } else{
                    toast.error("Something went wrong...");
                }
            }
        } finally {
            setLoading(false);
        }
    };


    return (
        <div className="forgot-password-container">
            <div className="form-container">
                <h2>Enter OTP</h2>
                <p>
                    <span>OTP has been sent to {email}</span>
                </p>
                <form>
                    <input type="text" placeholder="Enter OTP" onChange={(e)=>setOTP(e.target.value)}/>
                    <button onClick={(e)=>verifyOTP(e)} disabled={loading}>
                        {loading ? 'Verifying...' : 'Verify OTP'}
                        {loading && 
                            <div className="loading-overlay-btn" >
                                <ClipLoader color="#620c88" />
                            </div>
                        }
                        </button>
                </form>
                <div className="button-container">
                    <BackOutlineButton name="Back" handlerFunction={()=>navigate(-1)}/>
                </div>
            </div>
        </div>
    );
}

export default OTPVerificationPage;
