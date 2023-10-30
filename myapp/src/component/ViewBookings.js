import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
const ViewBookings = () => {
  const [bookings, setBookings] = useState([]);

  const userName = 'Karthick';

  useEffect(() => {
    // Fetch booking details for the specific user when the component mounts
    axios.get(`http://localhost:8084/user/allBookingDetailsOfUser/${userName}`)
      .then(response => {
        setBookings(response.data);
      })
      .catch(error => {
        console.error('Error fetching booking details:', error);
      });
  }, [userName]); // Dependency array includes userName, so the effect will re-run if userName changes

  const handleCancel = (pnrNo) => {
    const isConfirmed = window.confirm("Are you sure you want to cancel this booking?");
    if (isConfirmed) {
      // Make API call to cancel the booking with pnrNo
      axios.delete(`http://localhost:8084/user/cancel/${pnrNo}`)
        .then(response => {
          console.log(response.data);
          alert("Booking Cancelled Successfully");
          // Update the state to remove the canceled booking
          window.location.reload();
        })
        .catch(error => {
          console.error('Error canceling booking:', error);
        });
    } else {
      // User canceled the cancelation, do nothing
    }
  };

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
            <th>Actions</th>
            <th>ViewPassengerDetails</th>
           
          </tr>
        </thead>
        <tbody>
          {bookings.map(booking => (
            <tr key={booking.pnrNo}>
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
                                <Link to={`/passengerdetailsbyuser/${booking.pnrNo}`}>
                                    <button>View Passenger Details</button>
                                </Link>
              </td>
              <td>
                <button
                  onClick={() => handleCancel(booking.pnrNo)}
                  disabled={booking.bookingStatus === 'Cancelled'} // Disable if status is Cancelled
                >
                  Cancel
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ViewBookings;
