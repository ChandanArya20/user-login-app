import { useContext, useState } from 'react';
import '../styles/user-login-page.css'
import axios from 'axios';
import { UserContext } from '../context/UserContex';
import { useNavigate } from 'react-router-dom';

const UserLoginPage=()=>{

    const [isRightPanelActive, setIsRightPanelActive] = useState(false);

    // State variables for input data
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');

    const { loginUser ,isUserLoggedin}= useContext(UserContext);

    const navigate=useNavigate();

    const handleSignUpClick = () => {
        console.log("handleSignUpClick");
        setIsRightPanelActive(true);
    };

    const handleSignInClick = () => {
        setIsRightPanelActive(false);
        console.log('handleSignInClick');
    };

    const handleLogin=(e)=>{

        e.preventDefault();

        axios.post(`${process.env.REACT_APP_BASE_API_URL}/user/login`,{
            email:email,
            password:password
        })
        .then(response=>{
            console.log(response.data)
            loginUser(response, ()=>{})
        })
        .catch(error=>console.log(error))

    }

    const handleSignUp=(e)=>{

        e.preventDefault();
 
        axios.post(`${process.env.REACT_APP_BASE_API_URL}/user/register`,{
            name:name,
            email:email,
            phone:phone,
            password:password
        })
        .then(response=>{
            console.log(response.data)
            navigate("/registration-success")
        })
        .catch(error=>console.log(error))

    }

    return(
        <div className="main-page-container">
        {isUserLoggedin() && <div className='user-status-info'><h2>You're Logged In</h2></div>}
        <div className={`container ${isRightPanelActive ? 'right-panel-active' : ''}`} id="container">
            <div className="form-container sign-up-container">
            <form action="#">
                <h1>Create Account</h1>
                
                <input type="text" placeholder="Name" value={name} onChange={(e)=>setName(e.target.value)}/>
                <input type="email" placeholder="Email" value={email} onChange={(e)=>setEmail(e.target.value)}/>
                <input type='tel' placeholder="phone (Optional)" value={phone} onChange={(e)=>setPhone(e.target.value)}/>
                <input type="password" placeholder="Create Password" password={password} onChange={(e)=>setPassword(e.target.value)}/>
                <button onClick={(e)=>handleSignUp(e)}>Sign Up</button>
            </form>
            </div>
            <div className="form-container sign-in-container">
            <form >
                <h1>Login</h1>
         
                <input type="email" placeholder="Email" value={email} onChange={(e)=>setEmail(e.target.value)}/>
                <input type="password" placeholder="Password" password={password} onChange={(e)=>setPassword(e.target.value)}/>
                <a href="#">Forgot your password?</a>
                <button onClick={(e)=>handleLogin(e)}>Login</button>
            </form>
            </div>
            <div className="overlay-container">
            <div className="overlay">
                <div className="overlay-panel overlay-left">
                    <h1>Welcome Back!</h1>
                    <p>
                        To keep connected with us please login with your
                        personal info
                    </p>
                    <button className="ghost" id="signIn" onClick={handleSignInClick}>Login</button>
                </div>
                <div className="overlay-panel overlay-right">
                    <h1>Hello, Friend!</h1>
                    <p>
                        Enter your personal details and start journey with
                        us
                    </p>
                    <button className="ghost" id="signUp" onClick={handleSignUpClick}>Sign Up</button>
                </div>
            </div>
            </div>
        </div>
        </div>
    )
}

export default UserLoginPage;