import React, { useState } from 'react';
import '../styles/forget-password.css';
import BackOutlineButton from '../Components/BackOutlineButton';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { ClipLoader } from 'react-spinners';
import axios from 'axios';

const CreateNewPasswordPage = () => {

    const [loading, setLoading]=useState(false);
    const [password, setPassword]=useState('');
    const [confirmPassword, setConfirmPassword]=useState('');
    const navigate=useNavigate();
    const email=useLocation().state;

    console.log(email);

    const generateNewPassword = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            toast.error("Passwords do not match");
            return;
        }
        try {
            setLoading(true);
            const response = await axios.post(
                `${process.env.REACT_APP_BASE_API_URL}/user/otp-verified/update-password`,
                {
                    email:email,
                    newPassword:password
                }
            );

            toast.success("New Password created successfully...");
            setPassword('');
            setConfirmPassword('');

        } catch (error) {
            console.log(error);
            if (axios.isAxiosError(error)) {
                // Handle specific Axios error cases if needed
                if (error.response.status === 404) {
                    toast.error("Account not found for this "+email);
                } else {
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
                <h2>Make a new password</h2>
                <form>
                    <input type="password" placeholder="Create new password"  value={password} onChange={(e)=>setPassword(e.target.value)}/>
                    <input type="password" placeholder="Confirm password" value={confirmPassword} onChange={(e)=>setConfirmPassword(e.target.value)}/>
                    <button onClick={(e)=>generateNewPassword(e)} disabled={loading}>
                        {loading ? 'Creating...' : 'Submit'}
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

export default CreateNewPasswordPage;
