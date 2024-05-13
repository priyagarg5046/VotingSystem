import React from 'react'
import { RiLogoutCircleRLine } from "react-icons/ri";
import { Link } from 'react-router-dom';
const Voted = () => {
  return (
    <div className='bg-green-200 bg-opacity-25 min-h-screen flex justify-center m-auto'>
      <h1 className='mt-44 font-bold text-5xl text-blue-600'>Already Voted!</h1>
      <button className='flex items-center ml-8 px-4 py-2 hover:bg-gray-200 hover:cursor-pointer rounded-full h-7'onClick={()=>{localStorage.setItem("token"," ")}}>
        <div>
          <RiLogoutCircleRLine size={"18px"} />
        </div>
        <h1 className='font-bold text-lg ml-2'><Link to="/" >Logout</Link></h1>
      </button>
    </div>
  )
}

export default Voted