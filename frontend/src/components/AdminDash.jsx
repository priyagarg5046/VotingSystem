import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ColorRing } from 'react-loader-spinner';
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

const AdminDash = () => {
  const [loading, setLoading] = useState(true);
  const [candidates, setCandidate] = useState(null);

  useEffect(() => {
    async function getData() {
      try {
        const response = await axios.get('http://localhost:4444/admin');
        setCandidate(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    }
    getData();
  }, []);

  return (
    <div className="w-full bg-cover bg-center" style={{ backgroundImage: `url(${"https://wallpaperaccess.com/full/101233.jpg"})` }}>
      {loading && (
        <div className="flex justify-center items-center h-full">
          <ColorRing
            visible={true}
            height="80"
            width="80"
            ariaLabel="color-ring-loading"
            wrapperStyle={{}}
            wrapperClass="color-ring-wrapper"
            colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
          />
        </div>
      )}
      {!loading && (
        <div className="mx-auto px-4 py-0 w-full h-full">
          <div className="h-full">
            <h1 className='font-extrabold'>DASHBOARD</h1>
            <table className="w-full mt-2 table-fixed">
              <thead>
                <tr>
                  <th className="w-1/6 border px-4 py-2">S.No</th>
                  <th className="w-2/6 border px-4 py-2">Name of Candidate</th>
                  <th className="w-1/6 border px-4 py-2">Name of Party</th>
                  <th className="w-1/6 border px-4 py-2">Party Logo</th>
                  <th className="w-1/6 border px-4 py-2">No of Votes</th>
                  <th className="w-1/6 border px-4 py-2">Action</th>
                </tr>
              </thead>
              <tbody>
                {candidates !== null &&
                  candidates.map((candidate) => (
                    <tr key={candidate.id}>
                      <td className="w-1/6 border px-4 py-2">{candidate.id}</td>
                      <td className="w-2/6 border px-4 py-2">{candidate.fullName}</td>
                      <td className="w-1/6 border px-4 py-2">{candidate.partyname}</td>
                      <td className="w-1/6 border px-4 py-2">
                        <img src={candidate.partylogo} width="96px" height="96px" alt="Party Logo" />
                      </td>
                      <td className="w-1/6 border px-4 py-2">{candidate.totalvotes}</td>
                      <td className="w-1/6 border px-4 py-2">
                      
                        <button className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded m-2">
                        <FaEdit />
                        </button>
                        <button className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded">
                          <MdDelete/>
                        </button>
                        
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDash;
