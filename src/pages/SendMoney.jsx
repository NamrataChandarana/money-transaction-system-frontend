import axios from 'axios';
import React from 'react'
import {useSearchParams} from 'react-router-dom';
// import { User } from '../../../backend/model/users';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
import { useState } from 'react';

const SendMoney = () => {
    // if(!isOpen) return null;
    const [queryParameters] = useSearchParams();
    const id = queryParameters.get("id");
    const name = queryParameters.get("name");
    const [amount , setAmount] = useState();
    const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;


    async function handleSend(){
        const token = localStorage.getItem('token');
        const config = {
          headers: {
            Authorization: token,
            "Content-type": "application/json",
          }
        };
        if(!amount){
            toast.error("Enter some amount",{ 
                hideProgressBar: true,
                position: "top-center",
                autoClose: 500,
            })
            return;
        }
        try{
            const {data} = await axios.post(`${BACKEND_URL}api/v1/account/transfer`,{
                to: id,
                amount
            },config);
            setAmount("");
            if(data){
                toast.success(data.message, {
                  position: "top-center",
                  autoClose: 500,
                  hideProgressBar: true,
                  closeOnClick: true,
                  });
            }
        }catch(error){
            toast.error(error.response.data.message, {
                position: "top-center",
                autoClose: 500,
                hideProgressBar: true,
                closeOnClick: true,
                });
        }
    }

  return (
    <div class="flex justify-center h-screen bg-gray-100 ">
        <div className="h-full flex flex-col justify-center">
            <div class="border h-min text-card-foreground max-w-md p-4 space-y-8 w-96 bg-white shadow-lg rounded-lg">
                <div class="flex flex-col space-y-1.5 p-6">
                <h2 class="text-3xl font-bold text-center">Send Money</h2>
                </div>
                <div class="p-6">
                <div class="flex items-center space-x-4">
                    <div class="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center">
                    <span class="text-2xl text-white">{name.charAt(0)}</span>
                    </div>
                    <h3 class="text-2xl font-semibold">{name}</h3>
                </div>
                <div class="space-y-4">
                    <div class="space-y-2">
                    <label
                        class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        for="amount"
                    >
                        Amount (in Rs)
                    </label>
                    <input
                        type="number"
                        class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                        id="amount"
                        placeholder="Enter amount"
                        onChange={(e) => setAmount(e.target.value)}
                        value={amount}
                    />
                    </div>
                    <button class="justify-center rounded-md text-sm font-medium ring-offset-background transition-colors h-10 px-4 py-2 w-full bg-green-500 text-white" onClick={handleSend}>
                        Initiate Transfer
                    </button>
                </div>
                </div>
        </div>
      </div>
    </div>
  )
}

export default SendMoney