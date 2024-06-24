import axios from 'axios';
import React from 'react'
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Dropdown = ({user}) => {
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();
    const token = localStorage.getItem('token');
    const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
    const config = {
      headers: {
        Authorization: token,
        "Content-type": "application/json",
      }
    };
    
    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    }
    function logout(){
        try{
            const {data} = axios.get(`${BACKEND_URL}api/v1/user/user/logout`,config);
            console.log(data)
            localStorage.removeItem('token')
            navigate('/signin')
            if(data){
                toast.success(data.message, {
                    position: "top-center",
                    autoClose: 500,
                    hideProgressBar: true,
                    closeOnClick: true,
                    });
            }
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
    <>
    <div className="relative inline-block text-center">
        <div>
            <button
                type="button"
                id="menu-button"
                aria-expanded="true"
                aria-haspopup="true"
                onClick={toggleDropdown}
            >
                <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center mt-1 mr-2">
                    <div className="flex flex-col justify-center h-full text-xl">
                        {user?.firstname[0].toUpperCase()}
                    </div>
                </div>
            </button>
        </div>
        {isOpen && (
            <div
                className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
                role="menu"
                aria-orientation="vertical"
                aria-labelledby="menu-button"
            >
                <div className="py-1" role="none">
                    {
                        token ? 
                        <button
                            className="text-gray-700 hover:bg-gray-100 block w-full text-center px-4 py-2 text-sm"
                            role="menuitem"
                            id="menu-item-3"
                            onClick={logout}
                        >
                            Logout
                        </button>:null
                    }

                </div>
            </div>
        )}
    </div>
    </>
    
  )
}

export default Dropdown