import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import PasswordInput from '../components/Input/PasswordInput'
import { validateEmail } from '../utils/helper'

const Login = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault();
    if(!validateEmail(email)){
      setError("Please enter a valid email address.");
      return;
    }

    if(!password){
      setError("Please enter the password");
      return;
    }

    setError("")
  };


  return (
    <>
    <div className='flex justify-center items-center flex-col w-screen h-screen'>
        <h1 className='text-center md:text-9xl text-5xl text-green-100'>do<span className='italic'>it</span></h1>
        <div className='flex items-center justify-center mt-5'>
            <div className='w-96 border rounded bg-slate-200 px-7 py-10'>
            <form onSubmit={handleLogin}>
                <h4 className='text-2xl mb-7'>Login</h4>
                <input type="text" placeholder='Email' className='input-box' 
                    value={email}
                    onChange={(e)=>setEmail(e.target.value)}
                />
                <PasswordInput 
                value={password}
                onChange={(e)=>setPassword(e.target.value)}
                />

                {error && <p className='text-red-400 text-xs pb-1'>{error}</p>}

                <button type='submit' className='btn-primary'>Login</button>
                <p className='text-sm text-center mt-4'>
                Not Registered yet?{" "}
                <Link to="/signup" className='font-medium text-slate-500 underline'>Create an Account</Link>
                </p>
            </form>
            </div>
        </div>
    </div>
    </>
  )
}

export default Login
