import React, { useEffect, useState } from 'react';
import '../styles/forget-password.css';
import BackOutlineButton from '../Components/BackOutlineButton';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { ClipLoader } from 'react-spinners';
import axios from 'axios';

const CreateNewPasswordPage = () => {
    // State variables
    const [loading, setLoading] = useState(false);
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    
    // React Router hooks
    const navigate = useNavigate();
    const email = useLocation().state;

    // Check if the 'email' state is falsy (undefined or null).
    // If true, it means the user has landed on this page without a valid 'email' state,
    // indicating they haven't navigated through the 'forget-password' page.
    useEffect(() => {
        if (!email) {
            navigate("/forget-password");
        }
    }, [email, navigate]);

    // Function to handle new password creation
    const generateNewPassword = async (e) => {
        e.preventDefault();

        // Check if passwords match
        if (password !== confirmPassword) {
            toast.error("Passwords do not match");
            return;
        }

        try {
            // Start loading state
            setLoading(true);

            // Make API request to update password
            const response = await axios.post(
                `${process.env.REACT_APP_BASE_API_URL}/user/otp-verified/update-password`,
                {
                    email: email,
                    newPassword: password
                }
            );

            // Display success message
            toast.success("New Password created successfully...");

            // Clear input fields
            setPassword('');
            setConfirmPassword('');
        } catch (error) {
            console.log(error);
            if (axios.isAxiosError(error)) {
                // Handle specific Axios error cases if needed
                if (error.response.status === 404) {
                    toast.error("Account not found for " + email);
                } else {
                    toast.error("Something went wrong...");
                }
            }
        } finally {
            // Stop loading state
            setLoading(false);
        }
    };

    return (
        <div className="forgot-password-container">
            <div className="form-container">
                <h2>Make a new password</h2>
                <form>
                    {/* Input fields for new password and confirm password */}
                    <input type="password" placeholder="Create new password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    <input type="password" placeholder="Confirm password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />

                    {/* Button to submit new password, with loading spinner */}
                    <button onClick={(e) => generateNewPassword(e)} disabled={loading}>
                        {loading ? 'Creating...' : 'Submit'}
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

export default CreateNewPasswordPage;
