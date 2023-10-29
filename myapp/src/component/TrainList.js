import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
const TrainList = () => {
    const [trains, setTrains] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    useEffect(() => {
        // Fetch all train details when the component mounts
        axios.get('http://localhost:8084/admin/getalltrain')
            .then(response => {
                setTrains(response.data);
            })
            .catch(error => {
                console.error('Error fetching train details:', error);
            });
    }, []); // Empty dependency array ensures this effect runs once after the initial render

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };
    const handleDelete = (trainNumber) => {
        const isConfirmed = window.confirm("Are you sure you want to delete this train?");
        if (isConfirmed) {
            axios.delete(`http://localhost:8084/admin/delete/${trainNumber}`)
                .then(response => {
                    console.log(response.data); 
                    alert("Deleted Successfully");
                    setTrains(prevTrains => prevTrains.filter(train => train.trainNumber !== trainNumber));
                })
                .catch(error => {
                    console.error('Error deleting train:', error); 
                });
        } else {
           
        }
    };
    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };

    const filteredTrains = trains.filter(train => {
        return train.trainNumber.toString().includes(searchQuery);
    });

    return (
        <div>
            <h2>All Train Details</h2>
            <input
                type="text"
                placeholder="Search by Train Number"
                value={searchQuery}
                onChange={handleSearchChange}
            />
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
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredTrains.map(train => (
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
                            <td>
                                <button onClick={() => handleDelete(train.trainNumber)}>Delete</button>
                                <Link to={`/update/${train.trainNumber}`}>
                                    <button>Update</button>
                                </Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
    
};

export default TrainList;
