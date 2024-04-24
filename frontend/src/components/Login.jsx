import React, { useState } from 'react'
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
const Login = () => {
  const [username,setUsername]=useState("");
  const [password,setPassword]=useState("");

  const navigate=useNavigate();
  
  async function loginHandler(e){
    e.preventDefault();
    // console.log(username);
    // console.log(password);
    const response=await axios.post("http://localhost:4444/login",{
      username:username,
      password:password,
    })
    console.log(response.data);
    if(response.data.trim()==="admin"){
      navigate("/admin");
    }else{
      navigate("/vote")
    }
    // if(response.data.trim()!=="admin"){
    //   navigate("/vote");
    // }
   
    setUsername("");
    setPassword("");
  }

  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
  <div className="sm:mx-auto sm:w-full sm:max-w-sm">
    <img className="mx-auto h-20 w-auto" src="https://th.bing.com/th/id/OIP.RGyf_0-ICbus3P2JUlQpKQHaHa?pid=ImgDet&w=186&h=186&c=7&dpr=1.4" alt="Voting System"/>
    <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Login to your account</h2>
  </div>

  <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
    <form className="space-y-6" action="#" method="POST" onSubmit={loginHandler} >
      <div>
        <label className="block text-sm font-medium leading-6 text-gray-900">Username</label>
        <div className="mt-2">
          <input id="username" name="username" type="text" onChange={(e)=>setUsername(e.target.value)} value={username} required className="block w-full rounded-md border-0 p-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between">
          <label  className="block text-sm font-medium leading-6 text-gray-900">Password</label>
          <div className="text-sm">
            <Link to="/" className="font-semibold text-indigo-600 hover:text-indigo-500">Forgot password?</Link>
          </div>
        </div>
        <div className="mt-2">
          <input id="password" name="password" value={password} onChange={(e)=>setPassword(e.target.value)} type="password" autoComplete="current-password" required className="block w-full rounded-md p-2 border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
        </div>
      </div>

      <div>
        <button type="submit" className="flex w-full justify-center rounded-md bg-teal-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-teal-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Login</button>
      </div>
    </form>

    <p className="mt-10 text-center text-sm text-gray-500">
      Not Registered?
      <Link to="/signup" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">Register Here</Link>
    </p>
  </div>
</div>
  )
}

export default Login