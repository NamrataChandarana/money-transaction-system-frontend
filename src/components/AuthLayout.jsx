import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";


const AuthLayout = ({children}) => {
   const navigate = useNavigate();
   const [loader, setLoader] = useState(true)
   const authStatus = localStorage.getItem("token");

   useEffect(()=>{
    if(!authStatus){
        navigate("/signin");
        return;
    }
    setLoader(false)
    },[navigate, authStatus]) 

    return loader ? <h1>Loading...</h1> : <>{children}</>
}

export default AuthLayout;