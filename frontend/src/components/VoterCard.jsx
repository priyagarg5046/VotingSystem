import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { RiLogoutCircleRLine } from "react-icons/ri";
import { Link } from 'react-router-dom';
const VoterCard = () => {
  const [voter,setVoter]=useState({});
  const[storedToken,setToken]=useState("");
  const[dob,setdob]=useState("");
  useEffect(()=>{
    const storedToken = localStorage.getItem('token');

    if (storedToken) {
      // Use storedToken directly here or use a callback to get the updated value
      setToken(storedToken);
    }
    async function getVoter(){
      let response= await axios.get("http://localhost:4444/voting/voterDetails",{
        headers: {
          Authorization: `Bearer ${storedToken}` 
        }
      });
      console.log(response.data);
      setdob(response.data.dob);
      setVoter(response.data);
    }
   getVoter();
  },[])
  return (
    <div className="bg-gray-100 rounded-md shadow-md p-4 w-[20%]  fixed top-28 left-4">
       <div>
      <img className='ml-20 mb-2' width={"70px"} src="https://th.bing.com/th/id/OIP.RGyf_0-ICbus3P2JUlQpKQHaHa?pid=ImgDet&w=186&h=186&c=7&dpr=1.4" />
                </div>
      <h1 className="text-xl font-semibold mb-2">Voter Details</h1>
      <div>
        <p className="text-gray-700">
          <span className="font-semibold">Name:</span> {voter.name}
        </p>
        <p className="text-gray-700">
          <span className="font-semibold">Phone Number:</span> {voter.phonenumber}
        </p>
        <p className="text-gray-700">
          <span className="font-semibold">Aadhar Number:</span> {voter.aadharno}
        </p>
        <p className="text-gray-700">
          <span className="font-semibold">Date of Birth:</span> {dob.toString().slice(0, 10)}
        </p>
        <p className="text-gray-700">
          <span className="font-semibold">Nationality:</span> {voter.nationality}
        </p>
        <p className="text-gray-700">
          <span className="font-semibold">Voted:</span> {voter.isvoted ? "True" : "False"}
        </p>
        <button className='flex items-center ml-8 px-4 py-2 hover:bg-gray-200 hover:cursor-pointer rounded-full'onClick={()=>{localStorage.setItem("token"," ")}}>
                        <div>
                            <RiLogoutCircleRLine size={"18px"} />
                        </div>
                        <h1 className='font-bold text-lg ml-2'><Link to="/">Logout</Link></h1>
                    </button>
      </div>
      
    </div>
  
  )
}

export default VoterCard