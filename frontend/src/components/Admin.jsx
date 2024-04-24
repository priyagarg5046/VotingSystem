import React, { useState } from 'react';
import axios from 'axios';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
const Admin = () => {
const [candidates,setCandidate]=useState(null);
const navigate=useNavigate();
useEffect(()=>{
    async function getData(){
        let response=await axios.get('http://localhost:4444/admin');
        console.log(response.data);
        setCandidate(response.data);
    }
    getData();
},[])

  return (
    <>
    <div className=" mx-auto px-4 min-h-screen bg-lime-100">
      <h1 className="text-3xl font-bold mb-4 pt-2 text-center">Candidate List</h1>
      <button onClick={()=>{navigate("addcandidate")}} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mb-4 absolute top-0 right-0 mt-6 mr-5">
        Add New Candidate
      </button>
      <div className="overflow-x-auto">
        <table className="table-auto w-full mt-7 bg-lime-200">
          <thead>
            <tr>
              <th className="border px-4 py-2">S.No</th>
              <th className="border px-4 py-2">Name of Candidate</th>
              <th className="border px-4 py-2">Name of Party</th>
              <th className="border px-4 py-2">Party Logo</th>
              <th className="border px-4 py-2">No of Votes</th>
              <th className="border px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {candidates!=null && candidates.map(candidate => (
              <tr key={candidate.id}>
                <td className="border px-4 py-2">{candidate.id}</td>
                <td className="border px-4 py-2">{candidate.fullName}</td>
                <td className="border px-4 py-2">{candidate.partyname}</td>
                <td className="border px-4 py-2">{candidate.partylogo}</td>
                <td className="border px-4 py-2">{candidate.totalvotes}</td>
                <td className="border px-4 py-2">
                  <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    </>
  );
};

export default Admin;