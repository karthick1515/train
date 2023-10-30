import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const ViewPassengerDetails = () => {
  const { pnrNo } = useParams();
  const [passengerDetails, setPassengerDetails] = useState([]);
  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {
    const fetchPassengerDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:8084/user/getPassengerDetailsByPnrNo/${pnrNo}`);
        setPassengerDetails(response.data);
        console.log(response.data);
        setLoading(false); // Update loading state when data is received
      } catch (error) {
        console.error('Error fetching passenger details:', error);
        setLoading(false); // Update loading state even in case of an error
      }
    };

    fetchPassengerDetails();
  }, [pnrNo]);

  const navigate = useNavigate();

  return (
    <div>
      <center>
        <h4>Passenger Details</h4> <br />
        {loading ? (
          <p>Loading...</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Passenger ID</th>
                <th>Name</th>
                <th>Age</th>
                <th>Gender</th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(passengerDetails) && passengerDetails.length > 0 ? (
                passengerDetails.map((passenger) => (
                  <tr key={passenger.passengerId}>
                    <td>{passenger.passengerId}</td>
                    <td>{passenger.name}</td>
                    <td>{passenger.age}</td>
                    <td>{passenger.gender}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4">No passenger details available.</td>
                </tr>
              )}
            </tbody>
          </table>
        )}
        <br />
        <Link to="/trainbookinglist">
          <button className="btn btn-outline-danger">Go Back</button>
          <br />
          <br />
        </Link>
      </center>
    </div>
  );
};

export default ViewPassengerDetails;