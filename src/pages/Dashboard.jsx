import axios from 'axios';
import React from 'react'
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import {Appbar, Balance, User} from '../components/index.js'
import { useState } from 'react';

const Dashboard = () => {

  const [balance, setBalance] = useState();
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

  useEffect(()=>{
   async function getBalace(){

    const token = localStorage.getItem('token');
    const config = {
      headers: {
        Authorization: token,
        "Content-type": "application/json",
      }
    };
    console.log(config)

      const {data} = await axios.get(`${BACKEND_URL}api/v1/account/account`,config);
      if (data){
        setBalance(data.balance);
      }
    
    }

    try{
      getBalace();
    }catch(error){
      console.log(error)
      toast.error(error.response.data.message, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        // transition: Bounce,
        });
    }
    
  },[])

  return (
    <div>
        <Appbar />
        <div className="mx-12 my-8">
            <Balance value={balance} />
            <User />
        </div>
    </div>
  )
}

export default Dashboard