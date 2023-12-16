import { useContext, useState } from 'react';
import '../styles/user-login-page.css'
import axios from 'axios';
import { UserContext } from '../context/UserContex';
import { useNavigate } from 'react-router-dom';
import { ClipLoader } from 'react-spinners';
import { toast } from 'react-toastify';

const UserLoginPage = () => {
    // State to toggle between sign-up and login panels
    const [isRightPanelActive, setIsRightPanelActive] = useState(false);

    // State variables for input data
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    // User context for managing user authentication
    const { loginUser, isUserLoggedin, logoutUser } = useContext(UserContext);

    //For navigating one page to another page
    const navigate = useNavigate();

    // State variable to manage loading state during API requests
    const [loading, setLoading] = useState(false);

    // Switch to sign-up panel
    const handleSignUpClick = () => {
        setIsRightPanelActive(true);
    };

    // Switch to login panel
    const handleSignInClick = () => {
        setIsRightPanelActive(false);
    };

    // Handle login form submission
    const handleLogin = async (e) => {
        setLoading(true);
        e.preventDefault();
        try {
            const response = await axios.post(`${process.env.REACT_APP_BASE_API_URL}/user/login`, {
                email: email,
                password: password
            });
           
            loginUser(response.data, () => { });
            toast.success("You've successfully logged...");
            
        } catch (error) {

            console.log(error);

            if (axios.isAxiosError(error)) {
                // Handle specific Axios error cases if needed
                if (error.response.status === 401){            
                    toast.error("Incorrect password");
                } else if (error.response.status === 404) {
                    toast.error("Account not found");
                } else {
                    toast.error("Something wrong at the server side");
                }
            }
        } finally{
            setLoading(false);
        }
    }

    // Handle sign-up form submission
    const handleSignUp = async (e) => {
        e.preventDefault();
        
        if(!password!==confirmPassword){
            toast.error("Passwords do not match");
            return;
        }
        setLoading(true);
        try {
            const response = await axios.post(`${process.env.REACT_APP_BASE_API_URL}/user/register`, {
                name: name,
                email: email,
                phone: phone,
                password: password
            });
            if (response.status === 200) {
                console.log(response.data)
                navigate("/registration-success");
            }
        } catch (error) {
            console.log(error);
            if (axios.isAxiosError(error)) {
                // Handle specific Axios error cases if needed
                if (error.response.status === 409) {
                    toast.error("Account already registered with another account");
                } else {
                    toast.error("Something wrong at the server side");
                }
            }
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="user-login-page-container">
            {/* Display user status if logged in */}
            {isUserLoggedin() && <div className='user-status-info'><h2>You're Logged In 
                <span onClick={() => logoutUser(() => { })}>Log out</span></h2></div>}

            {/* Main container with sign-up and login forms */}
            <div className={`container ${isRightPanelActive ? 'right-panel-active' : ''}`} id="container">
                {/* Sign-up form */}
                <div className="form-container sign-up-container">
                    <form action="#">
                        <h1>Create Account</h1>
                        <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)}/>
                        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)}/>
                        <input type='tel' placeholder="phone (Optional)" value={phone} onChange={(e) => setPhone(e.target.value)}/>
                        <input type="password" placeholder="Create Password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                        <input type="password" placeholder="Confirm Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}/>
                        <button onClick={(e) => handleSignUp(e)}>
                            {loading ? 'Waiting...' : 'Sign Up'}
                            {loading && 
                                <div className="loading-overlay-btn">
                                    <ClipLoader color="#620c88" />
                                </div>
                            }
                        </button>
                    </form>
                </div>

                {/* Login form */}
                <div className="form-container sign-in-container">
                    <form>
                        <h1>Login</h1>
                        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                        <input type="password" placeholder="Password" password={password} onChange={(e) => setPassword(e.target.value)} />
                        <p className='forget-password' onClick={()=>navigate("/forget-password")}>Forgot your password?</p>
                        <button onClick={(e) => handleLogin(e)} disabled={loading}>
                            {loading ? 'Logging...' : 'Login'}
                            {loading && 
                                <div className="loading-overlay-btn">
                                    <ClipLoader color="#620c88" />
                                </div>
                            }
                        </button>
                    </form>
                </div>

                {/* Overlay for switching between sign-up and login */}
                <div className="overlay-container">
                    <div className="overlay">
                        {/* Left overlay for login */}
                        <div className="overlay-panel overlay-left">
                            <h1>Welcome Back!</h1>
                            <p>To keep connected with us, please login with your personal info</p>
                            <button className="ghost" id="signIn" onClick={handleSignInClick}>Login</button>
                        </div>
                        {/* Right overlay for sign-up */}
                        <div className="overlay-panel overlay-right">
                            <h1>Hello, Friend!</h1>
                            <p>Enter your personal details and start the journey with us</p>
                            <button className="ghost" id="signUp" onClick={handleSignUpClick}>Sign Up</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserLoginPage;
