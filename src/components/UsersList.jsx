import axios from 'axios';
import React from 'react'
import {Button} from './index'
import { useNavigate } from 'react-router-dom';


const UsersList = ({user}) => {
 const navigate = useNavigate();

 function handleClick(){
    navigate("/sendmoney?id="+ user._id + "&name=" + user.firstname);
 }

  return (
    user ? (
        <div>
        <div className="flex justify-between">
                <div className="flex">
                    <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center mt-1 mr-2">
                        <div className="flex flex-col justify-center h-full text-xl">
                            {user?.firstname[0].toUpperCase()}
                        </div>  
                    </div>
                    <div className="flex flex-col justify-center h-ful">
                        <div>
                            {user?.firstname} {user?.lastname}
                        </div>
                    </div>
                </div>

                <div className="flex flex-col justify-center h-ful">
                    <Button label={"Send Money"} onClick={handleClick} />
                    
                </div>
            </div>
        </div>
        
    ) : (<div>hello</div>)
    
    
    
  )
}

export default UsersList