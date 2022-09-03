import React, {  useState, useEffect } from 'react';
import isLogedInServerCall from './logedIn.js'
import './css/admin.scss';
import {backendLink,port} from '../link.js'
import loginAttempt from './loginAttempt.js'

function AdminPage() {
    const [msg, setMsg] = useState([]);
    const [login, setlogin] = useState(1);
    const [password, setPassword] = useState(2);
    const [isLogedIn, setisLogedIn] = useState(false);
    useEffect(() => {
        isLogedInServerCall(setisLogedIn);
    }, []);

    return (
    <div className="adminLoginPageWrapper"> 

        {isLogedIn === true ? (
            <div>
                {/* Admin Panel */}
                {/* :3000 fo localhost */}
                    {window.location = `${backendLink + port}/allPosts`}
                    
            </div>
            ) : (
            <div>
                <h1 className='loginHeader'>Admin Panel</h1>
                <p>{msg}</p>
                <form>
                    <input className='login' type={'login'} placeholder={'login'}  onChange={(e)=> setlogin(e.target.value)}/><br />
                    <input className='password' type={'password'} placeholder={'password'}  onChange={(e)=> setPassword(e.target.value)}/><br />
                    <button className='loginSubmitBtn' type={'submit'} onClick={(event)=> loginAttempt(login,password,event,setMsg) }>
                        Submit
                    </button>
                </form>
            </div>
            )}
    </div>
    )
}

export default AdminPage;