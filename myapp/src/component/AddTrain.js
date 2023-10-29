import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const AddTrain = () => {
    const [trainDetails, setTrainDetails] = useState({
        trainNumber: '',
        trainName: '',
        sourceStation: '',
        destinationStation: '',
        departureTime: '',
        arrivalTime: '',
        trainDepatureDate: '',
        trainArrivalDate: '',
        seatAvailability: {
            SLEEPER: '',
            THIRDAC: '',
            SECONDAC: ''
        },
        fares: {
            SLEEPER: '',
            THIRDAC: '',
            SECONDAC: ''
        }
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name.startsWith("seatAvailability")) {
            const category = name.split(".")[1]; // Extract the category (AC or Sleeper)
            setTrainDetails(prevState => ({
                ...prevState,
                seatAvailability: {
                    ...prevState.seatAvailability,
                    [category]: parseInt(value)
                }
            }));
        } else if (name.startsWith("fares")) {
            const category = name.split(".")[1]; // Extract the category (AC or Sleeper)
            setTrainDetails(prevState => ({
                ...prevState,
                fares: {
                    ...prevState.fares,
                    [category]: parseInt(value)
                }
            }));
        } else {
            setTrainDetails(prevState => ({
                ...prevState,
                [name]: value
            }));
        }
    };
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8084/admin/addTrain', trainDetails);
            console.log(response.data);
            navigate('/trainAddedSuccessfully');
        } catch (error) {
            console.error('Error adding train:', error);
        }
    };

    return (
        <div>
            <center>
                <h4>Add Train</h4> <br />
                <form onSubmit={handleSubmit}>
                <label>Train Number</label><br />
<input type="number" name="trainNumber" value={trainDetails.trainNumber} onChange={handleChange} placeholder="Enter Train Number" required /><br />

<label>Train Name</label><br />
<input type="text" name="trainName" value={trainDetails.trainName} onChange={handleChange} placeholder="Enter Train Name" required /><br />

<label>Source Station</label><br />
<input type="text" name="sourceStation" value={trainDetails.sourceStation} onChange={handleChange} placeholder="Enter Source Station" required /><br />

<label>Destination Station</label><br />
<input type="text" name="destinationStation" value={trainDetails.destinationStation} onChange={handleChange} placeholder="Enter Destination Station" required /><br />

<label>Departure Time</label><br />
<input type="time" name="departureTime" value={trainDetails.departureTime} onChange={handleChange} placeholder="Enter Departure Time" required /><br />

<label>Arrival Time</label><br />
<input type="time" name="arrivalTime" value={trainDetails.arrivalTime} onChange={handleChange} placeholder="Enter Arrival Time" required /><br />

<label>Departure Date</label><br />
<input type="date" name="trainDepatureDate" value={trainDetails.trainDepatureDate} onChange={handleChange} required /><br />

<label>Arrival Date</label><br />
<input type="date" name="trainArrivalDate" value={trainDetails.trainArrivalDate} onChange={handleChange} required /><br />

                    <label>Sleeper Class Seats</label><br />
                    <input type="number" name="seatAvailability.SLEEPER" value={trainDetails.seatAvailability.SLEEPER} placeholder="Enter the seats" onChange={handleChange} required /><br />

                    <label>Third AC Class Seats</label><br />
                    <input type="number" name="seatAvailability.THIRDAC" value={trainDetails.seatAvailability.THIRDAC} placeholder="Enter the seats" onChange={handleChange} required /><br />

                    <label>Second AC Class Seats</label><br />
                    <input type="number" name="seatAvailability.SECONDAC" value={trainDetails.seatAvailability.SECONDAC} placeholder="Enter the seats" onChange={handleChange} required /><br />

                    <label>Sleeper Class Fare</label><br />
                    <input type="number" name="fares.SLEEPER" value={trainDetails.fares.SLEEPER} onChange={handleChange} placeholder="Enter the fare" required /><br />

                    <label>Third AC Class Fare</label><br />
                    <input type="number" name="fares.THIRDAC" value={trainDetails.fares.THIRDAC} onChange={handleChange} placeholder="Enter the fare" required /><br />

                    <label>Second AC Class Fare</label><br />
                    <input type="number" name="fares.SECONDAC" value={trainDetails.fares.SECONDAC} onChange={handleChange} placeholder="Enter the fare" required /><br />

                    <br />
                    <input className="btn btn-outline-success" type="submit" name="submit" /><br /><br />
                    <Link to="/adminDashboard">
                        <button className="btn btn-outline-danger">Go Back</button><br /><br />
                    </Link>
                </form>
            </center>
        </div>
    );
}

export default AddTrain;
