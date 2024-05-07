import React, { useState, useEffect } from 'react';
import axios from 'axios';

const VoterCard = () => {
  const [voter, setVoter] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [token, setToken] = useState('');
  const storedToken = localStorage.getItem('token');

  if (storedToken) {
    // Use storedToken directly here or use a callback to get the updated value
    setToken(storedToken);
  useEffect(() => {
    const fetchVoterDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:4444/voter/voterDetaills`, {
          headers: {
            Authorization: `Bearer ${storedToken}` // Send the token in the Authorization header
          }
        });
        setVoter(response.data);
      } catch (error) {
        console.error('Error fetching voter details:', error);
        setError('Failed to fetch voter details. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchVoterDetails();
  }, []);

  if (loading) {
    return <p>Loading voter details...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!voter) {
    return <p>Voter not found</p>;
  }

  return (

    <div className="voter-details">
      <h2>Voter Details</h2>
      <div className="voter-card">
      <div className="voter-info">
        <h2>{voter.name}</h2>
        <p>Date of Birth: {voter.dob}</p>
        <p>Nationality: {voter.address}</p>
        <p>voted:{voter.isvoted}</p>
        <p>Phone Number:{voter.phonenumber}</p>
        <p>AAdhar Number: {voter.aadharno}</p>
        {/* Add more voter information as needed */}
      </div>
    </div> {/* Render the VoterCard component with the fetched voter details */}
    </div>
  );
}
}

export default VoterCard;
