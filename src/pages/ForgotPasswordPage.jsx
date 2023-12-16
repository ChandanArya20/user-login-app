import React, { useState } from 'react';
import '../styles/forget-password.css';
import BackOutlineButton from '../Components/BackOutlineButton';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { ClipLoader } from 'react-spinners';

const ForgotPasswordPage = () => {

    const [loading, setLoading]=useState(false);
    const [email, setEmail]=useState('');
    const navigate=useNavigate();


    // Function to handle OTP
    const sendOTP = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const apiCall = fetch(`${process.env.REACT_APP_BASE_API_URL}/user/send-otp?email=${email}`);
            
            // Create a promise that resolves after 5 seconds
            const timeoutPromise = new Promise((resolve, reject) => {
                setTimeout(() => resolve({ status: 'timeout' }), 3000);
            });
         
            // Use Promise.race to either resolve with the API response or the timeout
            const response = await Promise.race([apiCall, timeoutPromise]);
             
            if (response.ok || response.status === 'timeout') {
                navigate("/verify-otp", {state:email});
            } else if (response.status === 404) {
                console.log(response);
                toast.error("Account not found for this email");
            } else {
                console.log(await response.json());
            }

        } catch (error) {
            console.error(error);

        } finally {
            setLoading(false);
        }
    };


    return (
        <div className="forgot-password-container">
            <div className="form-container">
                <h2>Forgot Password?</h2>
                <form>
                    <input type="email" placeholder="Email" required onChange={(e)=>setEmail(e.target.value)}/>
                    <button onClick={(e)=>sendOTP(e)} disabled={loading}>
                        {loading ? 'Sending OTP...' : 'Reset Password'}
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

export default ForgotPasswordPage;
