import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
const SignUp = () => {
    const [name,setName]=useState("");
    const [dob,setDob]=useState("");
    const [phoneNumber,setphoneNumber]=useState("");
    const [aadharNo,setAadharNo]=useState("");
    const [password,setPassword]=useState("");
    const[nationality,setNationality]=useState("");
    const navigate=useNavigate();
    async function signUpHandler(e){
        e.preventDefault();
        // console.log(firstname);
        // console.log(lastname);
        // console.log(email);
        // console.log(password);
        let result=await axios.post("http://localhost:4444/voter",{
          name:name,
          dob:dob,
          phoneNumber:phoneNumber,
          aadharNo:aadharNo,
          password:password,
          nationality:nationality,
        })

        console.log(result);
        navigate("/login");
        setAadharNo("");
        setDob("");
        setName("");
        setPassword("");
        setphoneNumber("");
        setNationality("");

    }
  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
    <div className="sm:mx-auto sm:w-full sm:max-w-sm">
      <img className="mx-auto h-20 w-auto" src="https://th.bing.com/th/id/OIP.RGyf_0-ICbus3P2JUlQpKQHaHa?pid=ImgDet&w=186&h=186&c=7&dpr=1.4" alt="Voting System"/>
      <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">New Voter Registration</h2>
    </div>
  
    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <form className="space-y-6" action="#" method="POST"  onSubmit={signUpHandler}>
        <div>
          <label for="firstname" className="block text-sm font-medium leading-6 text-gray-900">Name</label>
          <div className="mt-2">
            <input id="name" name="name" type="text" onChange={(e)=>setName(e.target.value)} value={name}  required className="block w-full rounded-md p-2 border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
          </div>
        </div>
        <div>
          <label for="phoneNumber" className="block text-sm font-medium leading-6 text-gray-900">Phone Number</label>
          <div className="mt-2">
            <input id="phoneNumber" name="phoneNumber" type="text" onChange={(e)=>setphoneNumber(e.target.value)} value={phoneNumber}  required className="block w-full p-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
          </div>
        </div>
        <div>
          <label for="aadharNo" className="block text-sm font-medium leading-6 text-gray-900">Aadhar Number</label>
          <div className="mt-2">
            <input id="aadharNo" name="aadharNo" type="text" onChange={(e)=>setAadharNo(e.target.value)} value={aadharNo}  required className="block w-full p-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
          </div>
        </div>
        <div>
          <label for="dob" className="block text-sm font-medium leading-6 text-gray-900">Date of Birth</label>
          <div className="mt-2">
            <input id="dob" name="dob" type="text" onChange={(e)=>setDob(e.target.value)} value={dob}  required className="block w-full rounded-md border-0  p-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
          </div>
        </div>
        <div>
          <label for="nationality" className="block text-sm font-medium leading-6 text-gray-900">Nationality</label>
          <div className="mt-2">
            <input id="nationality" name="nationality" type="text" onChange={(e)=>setNationality(e.target.value)} value={nationality}  required className="block w-full rounded-md p-2 border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
          </div>
        </div>
        <div>
          <div className="flex items-center justify-between">
            <label for="password" className="block text-sm font-medium leading-6 text-gray-900">Password</label> 
          </div>
          <div className="mt-2">
            <input id="password" name="password" value={password} onChange={(e)=>setPassword(e.target.value)} type="password" required className="block w-full rounded-md p-2 border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
          </div>
        </div>
  
        <div>
          <button type="submit" className="flex w-full justify-center rounded-md bg-teal-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-teal-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Sign Up</button>
        </div>
      </form>
  
      <p className="mt-10 text-center text-sm text-gray-500">
       Already registered?
        <Link to="/login" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">Login</Link>
      </p>
    </div>
  </div>
  )
}

export default SignUp