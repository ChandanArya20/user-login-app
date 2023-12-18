import React, { useState } from 'react';
import '../styles/forget-password.css';
import BackOutlineButton from '../Components/BackOutlineButton';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { ClipLoader } from 'react-spinners';

const ForgotPasswordPage = () => {
    // State variables
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState(useLocation().state || "");
    const navigate = useNavigate();


    // Function to handle OTP
    const sendOTP = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            // Send OTP request to the server
            const apiCall = fetch(`${process.env.REACT_APP_BASE_API_URL}/user/send-otp?email=${email}`);
            
            // Create a promise that resolves after 3 seconds (timeout)
            const timeoutPromise = new Promise((resolve, reject) => {
                setTimeout(() => resolve({ status: 'timeout' }), 3000);
            });
         
            // Use Promise.race to either resolve with the API response or the timeout
            const response = await Promise.race([apiCall, timeoutPromise]);
             
            // Check the response and take appropriate actions
            if (response.ok || response.status === 'timeout') {
                navigate("/verify-otp", { state: email }); // Navigate to OTP verification page
            } else if (response.status === 404) {
                toast.error("Account not found for this email");
            } else {
                console.log(await response.json());
            }

        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false); // Stop loading state
        }
    };

    return (
        <div className="forgot-password-container">
            <div className="form-container">
                <h2>Forgot Password?</h2>
                <form>
                    {/* Input field for email */}
                    <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    
                    {/* Button to trigger OTP sending, with loading spinner */}
                    <button onClick={(e) => sendOTP(e)} disabled={loading}>
                        {loading ? 'Sending OTP...' : 'Reset Password'}
                        {loading && 
                            <div className="loading-overlay-btn" >
                                <ClipLoader color="#620c88" />
                            </div>
                        }
                    </button>
                </form>
                
                {/* Container for the "Back" button */}
                <div className="button-container">
                    <BackOutlineButton name="Back" handlerFunction={() => navigate(-1)} />
                </div>
            </div>
        </div>
    );
}

export default ForgotPasswordPage;
