import React from 'react'
import { useState } from 'react';
import { Heading, SubHeading, InputBox, BottomWarning, Button } from '../components';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Signin = () => {

  const navigate = useNavigate();
  const [username, setUsername] = useState();
  const [password, setPassword] = useState('');
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

  async function handleSubmit(){
    try{
      const { data } = await axios.post(`${BACKEND_URL}api/v1/user/signin`,{
      username,
      password
    },
    {
      headers: {
        "Content-type": "application/json",
      }})

    if(data){
      localStorage.setItem("token",`Bearer ${data.token}`);
      toast.success("Signin successfully", {
        position: "top-center",
        });
    }
     
    navigate('/')

    }catch(error){
      toast.error(error?.response?.data?.message, {
        position: "top-center",
        autoClose: 500,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        // transition: Bounce,
        });
      
      // toast.error(res.data.message);

    }
  }


  return (
    <div className="bg-slate-300 h-screen flex justify-center">
    <div className="flex flex-col justify-center">
      <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
        <Heading label={"Sign in"} />
        <SubHeading label={"Enter your credentials to access your account"} />
        <InputBox type="text" placeholder="harkirat@gmail.com" label={"Email"} onChange={e => setUsername(e.target.value)}/>
        <InputBox type="password" placeholder="123456" label={"Password"} onChange={e => setPassword(e.target.value)}/>
        <div className="pt-4">
          <Button label={"Sign in"} onClick={handleSubmit}/>
        </div>
        <BottomWarning label={"Don't have an account?"} buttonText={"Sign up"} to={"/signup"} />
      </div>
    </div>
  </div>
  )
}
export default Signin;