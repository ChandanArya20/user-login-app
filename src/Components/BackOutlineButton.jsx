import { useNavigate } from 'react-router-dom';
import '../styles/back-outline-button.css'

const BackOutlineButton=({name})=>{
    
    const navigate=useNavigate();
    return(
        <button id="back-outline-button" onClick={()=>navigate(-1)}>{name}</button>
    )
}

export default BackOutlineButton;