import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ColorRing } from 'react-loader-spinner';
import { useNavigate } from 'react-router-dom';
import VoterCard from './VoterCard';
const Voting = () => {
  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [voteSuccess, setVoteSuccess] = useState(false);
  const [voteError, setVoteError] = useState(null);
  const [token, setToken] = useState('');
  const navigate=useNavigate();

  useEffect(() => {
    const fetchCandidates = async () => {
      setLoading(true);
      const storedToken = localStorage.getItem('token');

      if (storedToken) {
        // Use storedToken directly here or use a callback to get the updated value
        setToken(storedToken);
      }
      try {
        const response = await axios.get('http://localhost:4444/voting', {
          headers: {
            Authorization: `Bearer ${storedToken}` // Use storedToken here
          }
        });
        console.log('Frontend Response:', response.data);
        if(response.data==="already voted"){
          navigate("/voted");
        }

        setCandidates(response.data);
        // console.log(candidates);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCandidates();
  }, []);


  const handleVote = async (candidateId) => {
    try {
      const response = await axios.post('http://localhost:4444/voting', { candidateId }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setVoteSuccess(true);
      console.log(response.data);
    } catch (error) {
      if (error.response) {
        // Request made and server responded with a status code
        // that falls out of the range of 2xx
        setVoteError(error.response.data.message);
      } else if (error.request) {
        // The request was made but no response was received
        setVoteError('Network Error: No response received');
      } else {
        // Something happened in setting up the request that triggered an Error
        setVoteError('Network Error: Setting up the request failed');
      }
      console.error('Error casting vote:', error);
    }
  };
  return (
    <div className="flex bg-cover bg-center"style={{ backgroundImage: `url('https://th.bing.com/th/id/OIP.swg6Duio_-fRxXzVQFFtBAHaFj?rs=1&pid=ImgDetMain')` }}>
      <VoterCard />
      <div className=" w-[80%] min-h-screen bg-cover bg-center ml-[20%]">
        <div className="absolute top-4">
          {error && (
            <div className="text-center py-4 bg-red-100">
              <p className="text-red-500">Error: {error}</p>
            </div>
          )}
          {voteSuccess && (
            <div className="text-center py-4 bg-green-100">
              <p className="text-green-500">Vote cast successfully!</p>
            </div>
          )}
          {voteError && (
            <div className="text-center py-4 bg-red-100">
              <p className="text-red-500">Error casting vote: {voteError}</p>
            </div>
          )}
        </div>
        {!loading ? (
          candidates && Array.isArray(candidates) && candidates.length > 0 ? (
            <div className="mx-auto w-[80%] max-w-2xl px-4 py-8 sm:px-6 sm:py-12 lg:max-w-7xl lg:px-8"> 
              <h2 className="font-extrabold flex justify-center pt-6 mb-5">Please Vote. Your Vote Matters!!</h2>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-8">
                {candidates.map((candidate) => (
                  <a key={candidate.id} className="group">
                    <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
                      <img
                        src={candidate.partylogo}
                        alt={candidate.partyname}
                        className="h-full w-full object-cover object-center group-hover:opacity-75"
                      />
                    </div>
                    <h3 className="mt-4 text-blue-950 text-xl font-bold">{candidate.partyname}</h3>
                    <p className="mt-1 text-lg font-medium text-gray-900">{candidate.fullName}</p>
                    <button
                      onClick={() => handleVote(candidate.id)}
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >
                      Vote
                    </button>
                  </a>
                ))}
              </div>
            </div>
          ) : (
            <div className="text-center py-4 bg-blue-100">
              <p>No candidates available</p>
            </div>
          )
        ) : (
          <div className="w-full min-h-screen flex justify-center m-auto">
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
      </div>
    </div>
  );
}

export default Voting;