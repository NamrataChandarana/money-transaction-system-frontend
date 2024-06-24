import React, { useEffect } from 'react'
import { toast } from 'react-toastify';
import { useState } from 'react';
import axios from 'axios';
import Dropdown from './Dropdown';

const Appbar = () => {
   const [user , setUser] = useState("");
   const token = localStorage.getItem('token');
   const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
   const config = {
     headers: {
       Authorization: token,
       "Content-type": "application/json",
     }
   };
   
   async function getUser(){
    try{
        const {data} = await axios.get(`${BACKEND_URL}api/v1/user/user/profile`,config);
        setUser(data.user)
        
       }catch(error){
        toast.error("something went wrong!")
       }
   }
   useEffect(()=>{
        getUser();
   },[])



  return (
    <div className="shadow h-14 flex justify-between mx-10">
        <div className="flex flex-col justify-center h-full ml-4">
            PayTM App
        </div>
        <div className="flex">
            <div className="flex flex-col justify-center h-full mr-4">
                {user.firstname}
            </div>
            {user && <Dropdown user={user}/>}
        </div>
    </div>
  )
}

export default Appbar