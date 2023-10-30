import React, { useState } from 'react';
import axios from 'axios';

const BookingForm = () => {
  const [userDetails, setUserDetails] = useState({
    userName: '',
    trainNo: '',
    trainName: '',
    sourceStation: '',
    destinationStation: '',
    passengers: [
      {
        name: '',
        age: '',
        gender: ''
      }
    ],
    journeyDate: '',
    totalFare: '',
    passengerPhoneNumber: '',
    classType: '',
    bookingStatus: 'Booked',
    passengerNo: 1
  });

  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const updatedPassengers = [...userDetails.passengers];
    updatedPassengers[index][name] = value;
    setUserDetails({ ...userDetails, passengers: updatedPassengers });
  };

  const addPassenger = () => {
    setUserDetails({
      ...userDetails,
      passengers: [
        ...userDetails.passengers,
        {
          name: '',
          age: '',
          gender: ''
        }
      ],
      passengerNo: userDetails.passengerNo + 1
    });
  };

  const removePassenger = (index) => {
    const updatedPassengers = [...userDetails.passengers];
    updatedPassengers.splice(index, 1);
    setUserDetails({
      ...userDetails,
      passengers: updatedPassengers,
      passengerNo: userDetails.passengerNo - 1
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
     // Calculate total fare based on class type and number of passengers


    console.log(userDetails);
    axios.post('http://localhost:8084/user/book', userDetails)
      .then((response) => {
        alert("Booking Successful!!!");
        console.log('Booking successful!', response.data);
        // Handle successful booking response here (if needed)
      })
      .catch((error) => {
        console.error('Error booking:', error);
        // Handle error response here
      });
  };

  return (
    <div>
      <h2>Booking Form</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>User Name:</label>
          <input
            type="text"
            name="userName"
            value={userDetails.userName}
            onChange={(e) => setUserDetails({ ...userDetails, userName: e.target.value })}
            required
          />
        </div>
        <div>
          <label>Train Number:</label>
          <input
            type="number"
            name="trainNo"
            value={userDetails.trainNo}
            onChange={(e) => setUserDetails({ ...userDetails, trainNo: e.target.value })}
            required
          />
        </div>
        <div>
          <label>Train Name:</label>
          <input
            type="text"
            name="trainName"
            value={userDetails.trainName}
            onChange={(e) => setUserDetails({ ...userDetails, trainName: e.target.value })}
            required
          />
        </div>
        <div>
          <label>Source Station:</label>
          <input
            type="text"
            name="sourceStation"
            value={userDetails.sourceStation}
            onChange={(e) => setUserDetails({ ...userDetails, sourceStation: e.target.value })}
            required
          />
        </div>
        <div>
          <label>Destination Station:</label>
          <input
            type="text"
            name="destinationStation"
            value={userDetails.destinationStation}
            onChange={(e) => setUserDetails({ ...userDetails, destinationStation: e.target.value })}
            required
          />
        </div>
        <div>
          <label>Journey Date:</label>
          <input
            type="date"
            name="journeyDate"
            value={userDetails.journeyDate}
            onChange={(e) => setUserDetails({ ...userDetails, journeyDate: e.target.value })}
            required
          />
        </div>
        <h3>Passengers</h3>
        {userDetails.passengers.map((passenger, index) => (
          <div key={index}>
            <label>Name:</label>
            <input
              type="text"
              name="name"
              value={passenger.name}
              onChange={(e) => handleInputChange(e, index)}
              required
            />
            <label>Age:</label>
            <input
              type="number"
              name="age"
              value={passenger.age}
              onChange={(e) => handleInputChange(e, index)}
              required
            />
            <label>Gender:</label>
            <input
              type="text"
              name="gender"
              value={passenger.gender}
              onChange={(e) => handleInputChange(e, index)}
              required
            />
            {index > 0 && <button type="button" onClick={() => removePassenger(index)}>Remove</button>}
          </div>
          
        ))}
        
        <button type="button" onClick={addPassenger}>Add Passenger</button>

        <div>
  <label>Class Type:</label>
  <select
    name="classType"
    value={userDetails.classType}
    onChange={(e) => setUserDetails({ ...userDetails, classType: e.target.value })}
    required
  >
    <option value="">Select Class Type</option>
    <option value="SLEEPER">Sleeper</option>
    <option value="THIRDAC">Third AC</option>
    <option value="SECONDAC">Second AC</option>
  </select>
</div>
<div>
  <label>Passenger Phone Number:</label>
  <input
    type="tel"
    name="passengerPhoneNumber"
    value={userDetails.passengerPhoneNumber}
    onChange={(e) => setUserDetails({ ...userDetails, passengerPhoneNumber: e.target.value })}
    required
  />
</div>


        <button type="submit">Book Ticket</button>
      </form>
    </div>
  );
};

export default BookingForm;
