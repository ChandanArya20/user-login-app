import { useNavigate } from 'react-router-dom';
import '../styles/registration-success-page.css'
import { FaCircleCheck } from "react-icons/fa6";

const RegistrationSuccessPage=()=>{

    const navigate=useNavigate();

    return (
        <div className="user-login-success-message">
            <h2><FaCircleCheck /></h2>
            <p>SUCCESS</p>
            <p>Congratulations, your account has been successfully created.</p>
            <button onClick={()=>navigate(-1)}>Continue</button>
	    </div>
    )
}

export default RegistrationSuccessPage;