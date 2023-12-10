import { useState } from 'react';
import '../styles/user-login-page.css'

const UserLoginPage=()=>{

    const [isRightPanelActive, setIsRightPanelActive] = useState(false);

    const handleSignUpClick = () => {
        console.log("handleSignUpClick");
        setIsRightPanelActive(true);
    };

    const handleSignInClick = () => {
        setIsRightPanelActive(false);
        console.log('handleSignInClick');
    };

    
    return(
        <div className={`container ${isRightPanelActive ? 'right-panel-active' : ''}`} id="container">
            <div className="form-container sign-up-container">
            <form action="#">
                <h1>Create Account</h1>
                <span>or use your email for registration</span>
                <input type="text" placeholder="Name" />
                <input type="email" placeholder="Email" />
                <input type='tel' placeholder="phone (Optional)" />
                <input type="password" placeholder="Create Password" />
                <button >Sign Up</button>
            </form>
            </div>
            <div className="form-container sign-in-container">
            <form action="#">
                <h1>Sign in</h1>
                <span>or use your account</span>
                <input type="email" placeholder="Email" />
                <input type="password" placeholder="Password" />
                <a href="#">Forgot your password?</a>
                <button >Login</button>
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
    )
}

export default UserLoginPage;