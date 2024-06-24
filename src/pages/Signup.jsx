import React from 'react'
import { Heading, SubHeading, InputBox, BottomWarning, Button } from '../components';
import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
// import { toast } from 'react-toastify';


const Signup = () => {

  const navigate = useNavigate();
  const [firstname, setFirstname] = useState();
  const [lastname, setLastname] = useState();
  const [username, setUsername] = useState();
  const [password, setPassword] = useState('');
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;



  async function handleSubmit(){
    try{
      const { data } = await axios.post(`${BACKEND_URL}api/v1/user/signup`,{
        username,
        firstname,
        lastname, 
        password
      },
      {
        headers: {
          "Content-type": "application/json",
      }})

    if(data){

      localStorage.setItem("token",`Bearer ${data.token}`);

      toast.success("Signup successfully", {
        position: "top-center",
        autoClose: 500,
        hideProgressBar: true,
        closeOnClick: true,
        });
    }

    navigate('/')

    }catch(error){
      toast.error(error?.response?.data?.message, {
        position: "top-center",
        autoClose: 500,
        hideProgressBar: true,
        closeOnClick: true,
        });
    }
  }

  return (
    <div className="bg-slate-300 h-screen flex justify-center ">
    <div className="flex flex-col justify-center">
      <div className="rounded-lg bg-white w-85 text-center  h-max px-5">
        <Heading label={"Sign in"} />
        <SubHeading label={"Enter your infromation to create an account"} />
        <InputBox type="text" placeholder="John" label={"First Name"} onChange = {e => setFirstname(e.target.value)} />
        <InputBox type="text" placeholder="Doe" label={"Last Name"} onChange = {e => setLastname(e.target.value)}/>
        <InputBox type="email" placeholder="harkirat@gmail.com" label={"Email"} onChange = {e => setUsername(e.target.value)} />
        <InputBox type="password" placeholder="123456" label={"Password"} onChange = {e => setPassword(e.target.value)}/>
        <div className="pt-4">
          <Button label={"Sign up"} onClick={handleSubmit}/>
          <ToastContainer />
        </div>
        <BottomWarning label={"Already have an account?"} buttonText={"Sign in"} to={"/signin"} />
      </div>
    </div>
  </div>
  )
}

export default Signup