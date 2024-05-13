import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ColorRing } from 'react-loader-spinner';
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

const AdminDash = () => {
  const [loading, setLoading] = useState(true);
  const [candidates, setCandidate] = useState(null);
  const [error, setError] = useState(null);
  const [editingCandidateId, setEditingCandidateId] = useState(null);

  async function deleteCandidate(id) {
    if (window.confirm('Are you sure you want to delete this candidate?')) {
      try {
        await axios.delete(`http://localhost:4444/admin/${id}`);
        const response = await axios.get('http://localhost:4444/admin');
        setCandidate(response.data);

      } catch (error) {
        console.error('Error deleting candidate:', error);
        setError('Failed to delete candidate. Please try again later.');
      }
    }
  }

  const editCandidate = async (id, updatedCandidate) => {
    try {
      await axios.put(`http://localhost:4444/admin/${id}`, updatedCandidate);
      // Update local state with the edited candidate
      const updatedCandidates = candidates.map(candidate => {
        if (candidate.id === id) {
          return { ...candidate, ...updatedCandidate };
        }
        return candidate;
      });
      // setCandidate(updatedCandidates);
      setEditingCandidateId(null); // Reset editing state
    } catch (error) {
      console.error('Error editing candidate:', error);
      setError('Failed to edit candidate. Please try again later.');
    }
  };
  useEffect(() => {
    async function getData() {
      try {
        const response = await axios.get('http://localhost:4444/admin');
        setCandidate(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Failed to fetch data. Please try again later.');
      } finally {
        setLoading(false);
      }
    }
    getData();
  }, []);

  return (
    <div className="w-[80%] min-h-screen bg-cover bg-center ml-[20%]" style={{ backgroundImage: `url(${"https://th.bing.com/th/id/OIP.LqyG-GfCA2-ydFps--BxHwAAAA?w=400&h=400&rs=1&pid=ImgDetMain"})` }}>
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
          <p>Loading...</p>
        </div>
      )}
      {!loading && (
        <div className="mx-auto px-4 py-0 w-full h-full">
          <div className="h-full">
            {error && <p>{error}</p>}
            <table className="w-full mt-6 table-fixed border-collapse border border-black">
              <thead>
                <tr>
                  <th className="w-1/6 border px-4 py-2 border-black">S.No</th>
                  <th className="w-2/6 border px-4 py-2  border-black">Name of Candidate</th>
                  <th className="w-1/6 border px-4 py-2  border-black">Name of Party</th>
                  <th className="w-1/6 border px-4 py-2  border-black">Party Logo</th>
                  <th className="w-1/6 border px-4 py-2  border-black">No of Votes</th>
                  <th className="w-1/6 border px-4 py-2  border-black">Action</th>
                </tr>
              </thead>
              <tbody>
  {candidates !== null &&
    candidates.map((candidate, index) => (
      <tr key={candidate.id}>
        <td className="w-1/6 border px-4 py-2  border-black">{index + 1}</td>
        <td className="w-2/6 border px-4 py-2  border-black">{candidate.fullName}</td>
        <td className="w-1/6 border px-4 py-2  border-black">{candidate.partyname}</td>
        <td className="w-1/6 border px-4 py-2  border-black">
          <img src={candidate.partylogo} width="96px" height="96px" alt="Party Logo" />
        </td>
        <td className="w-1/6 border px-4 py-2  border-black">{candidate.totalvotes}</td>
        <td className="w-1/6 border px-4 py-2  border-black">
          {/* <button className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded m-2" onClick={() => { editCandidate(candidate.id) }}>
            <FaEdit />
          </button> */}
          <button className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded" onClick={() => deleteCandidate(candidate.id)}>
            <MdDelete />
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
