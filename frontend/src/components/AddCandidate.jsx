import axios from 'axios';
import React from 'react';
import { useRef } from 'react';
const AddCandidate = () => {
  const inputRef=useRef("");
  async function addCandidate(e){
    e.preventDefault();
     console.log(inputRef);
    const response=await axios.post("http://localhost:4444/admin",{
      fullname:inputRef.fullname, 
      nationality:inputRef.nationality,
      dob:inputRef.dob,
      partyName:inputRef.partyName, 
      partyLogo:inputRef.partyLogo
    })
    console.log(response.data);
    alert("candidate added successfully...")
    
  }
  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-4 text-center">Add New Candidate</h1>
        <form className="max-w-md mx-auto" onSubmit={addCandidate}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="fullname">
              Fullname
            </label>
            <input onChange={(e)=>{inputRef.fullname=e.target.value}}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="fullname"
              type="text"
              placeholder="Enter candidate name"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="nationality">
              Nationality
            </label>
            <input onChange={(e)=>{inputRef.nationality=e.target.value}}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="nationality"
              type="text"
              placeholder="Enter nationality"
            />
          </div> 
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="dob">
              Date Of Birth
            </label>
            <input onChange={(e)=>{inputRef.dob=e.target.value}}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="dob"
              type="text"
              placeholder="Enter in YYYY-MM-DD format"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="partyName">
              Name of Party
            </label>
            <input onChange={(e)=>{inputRef.partyName=e.target.value}}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="partyName"
              type="text"
              placeholder="Enter party name"
            />
          </div>
         
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="partylogo">
              Party Logo
            </label>
            <input onChange={(e)=>{inputRef.partyLogo=e.target.value}}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="partyLogo"
              type="text"
              placeholder="Enter party logo"
            />
          </div>
        
          <div className="flex items-center justify-center">
            <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded" type="submit">
              Add Candidate
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCandidate;
