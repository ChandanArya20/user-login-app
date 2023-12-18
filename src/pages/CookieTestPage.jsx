import axios from "axios";



const CookieTestPage=()=>{

    const testCookie=()=>{

        axios.get(`${process.env.REACT_APP_BASE_API_URL}/user/test-cookie`,{withCredentials: true})
        .then(response=>console.log(response))
        .catch(error=>{
            console.log(error);
            console.log(error.response.status);
        })
    }

    return(
        <button onClick={()=>testCookie()}>Test cookie</button>
    )
}

export default CookieTestPage;