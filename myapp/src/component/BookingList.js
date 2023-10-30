import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const BookingList = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    // Fetch all booking details when the component mounts
    axios.get('http://localhost:8084/user/getallbookingdetails')
      .then(response => {
        setBookings(response.data);
      })
      .catch(error => {
        console.error('Error fetching booking details:', error);
      });
  }, []); // Empty dependency array ensures this effect runs once after the initial render

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div>
      <h2>All Booking Details</h2>
      <table>
        <thead>
          <tr>
            <th>User Name</th>
            <th>Train Number</th>
            <th>Train Name</th>
            <th>Source Station</th>
            <th>Destination Station</th>
            <th>Journey Date</th>
            <th>Total Fare</th>
            <th>Passenger Phone Number</th>
            <th>Class Type</th>
            <th>Passenger Count</th>
            <th>PNR NO</th>
            <th>Booking Status</th>
            <th>Passenger Details</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map(booking => (
            <tr key={booking.bookingId}>
              
              <td>{booking.userName}</td>
              <td>{booking.trainNo}</td>
              <td>{booking.trainName}</td>
              <td>{booking.sourceStation}</td>
              <td>{booking.destinationStation}</td>
              <td>{formatDate(booking.journeyDate)}</td>
              <td>{booking.totalFare}</td>
              <td>{booking.passengerPhoneNumber}</td>
              <td>{booking.classType}</td>
              <td>{booking.passengerNo}</td>
              <td>{booking.pnrNo}</td>
              <td>{booking.bookingStatus}</td>
              <td>
                                <Link to={`/passengerdetails/${booking.pnrNo}`}>
                                    <button>View Passenger Details</button>
                                </Link>
                            </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BookingList;
