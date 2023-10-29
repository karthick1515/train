import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
 
const TrainSearch = () => {
  const [trains, setTrains] = useState([]);
  const [sourceStation, setSourceStation] = useState('');
  const [destinationStation, setDestinationStation] = useState('');
  const [departureDate, setDepartureDate] = useState('');
  const [searchResults, setSearchResults] = useState([]);
 
  useEffect(() => {
    // Fetch all train details when the component mounts
    axios
      .get('http://localhost:8084/admin/getalltrain')
      .then((response) => {
        setTrains(response.data);
        setSearchResults(response.data); // Set initial search results to all trains
      })
      .catch((error) => {
        console.error('Error fetching train details:', error);
      });
  }, []);
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
};

const newformatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };
  const handleSearch = () => {
    // Filter the trains based on source station, destination station, and departure date
    const filteredTrains = trains.filter((train) => {
        setDepartureDate(departureDate)
        console.log(departureDate);
        console.log(newformatDate(train.trainDepatureDate));
      return (
        
        train.sourceStation === sourceStation &&
        train.destinationStation === destinationStation &&
        newformatDate(train.trainDepatureDate) === departureDate
       
      );
    });
 
    setSearchResults(filteredTrains);
  };
 
  return (
<div>
<h2>All Train Details</h2>
<div>
<label>Source Station:</label>
<input
          type="text"
          value={sourceStation}
          onChange={(e) => setSourceStation(e.target.value)}
        />
</div>
<div>
<label>Destination Station:</label>
<input
          type="text"
          value={destinationStation}
          onChange={(e) => setDestinationStation(e.target.value)}
        />
</div>
<div>
<label>Train Departure Date:</label>
<input
          type="date"
          value={departureDate}
          onChange={(e) => setDepartureDate(e.target.value)}
        />
</div>
<button onClick={handleSearch}>Search</button>
 
<table>
                <thead>
                    <tr>
                        <th>Train Number</th>
                        <th>Train Name</th>
                        <th>Source Station</th>
                        <th>Destination Station</th>
                        <th>Departure Time</th>
                        <th>Arrival Time</th>
                        <th>Train Departure Date</th>
                        <th>Train Arrival Date</th>
                        <th>Sleeper Seats</th>
                        <th>Third AC Seats</th>
                        <th>Second AC Seats</th>
                        <th>Sleeper Fare</th>
                        <th>Third AC Fare</th>
                        <th>Second AC Fare</th>
                       
                    </tr>
                </thead>
                <tbody>
                    {searchResults.map(train => (
                        <tr key={train.trainNumber}>
                            <td>{train.trainNumber}</td>
                            <td>{train.trainName}</td>
                            <td>{train.sourceStation}</td>
                            <td>{train.destinationStation}</td>
                            <td>{train.departureTime}</td>
                            <td>{train.arrivalTime}</td>
                            <td>{formatDate(train.trainDepatureDate)}</td>
                            <td>{formatDate(train.trainArrivalDate)}</td>
                            <td>{train.seatAvailability.SLEEPER}</td>
                            <td>{train.seatAvailability.THIRDAC}</td>
                            <td>{train.seatAvailability.SECONDAC}</td>
                            <td>{train.fares.SLEEPER}</td>
                            <td>{train.fares.THIRDAC}</td>
                            <td>{train.fares.SECONDAC}</td>
                           
                        </tr>
                    ))}
                </tbody>
            </table>
</div>
  );
};
 
export default TrainSearch;