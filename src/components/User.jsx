import React from 'react'
import { useState } from 'react'
import UsersList from './UsersList';
import { useEffect } from 'react'
import axios from 'axios';

const User = () => {

  const [filter, setFilter] = useState('');
  const [users, setUsers] = useState();
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

  const token = localStorage.getItem('token');
  const config = {
    headers: {
      Authorization: token,
      "Content-type": "application/json",
    },
    params: { filter: filter || ""}
    
  };

  useEffect(()=>{

    async function getUsers(){
        const {data} = await axios.get(`${BACKEND_URL}api/v1/user/user/bulk`,config)
        setUsers(data.user)
    }

    try{
        getUsers();
    }catch(error){
        console.log(error);
    }
    
  },[filter])  

  return (
    <>
      <div className="font-bold mt-6 text-lg">
          Users
      </div>
      <div className="my-2">
          <input type="text" placeholder="Search users..." className="w-full px-2 py-1 border rounded border-slate-200" onChange={e => setFilter(e.target.value)}></input>
      </div>
      <div>
      {users?.map(user => <UsersList user={user} />)}
      </div>
    </>
  )
}

export default User