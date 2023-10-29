import React, { useState, useEffect } from 'react';
import { useParams ,Link,useNavigate} from 'react-router-dom';
import axios from 'axios';

const UpdateTrain = () => {
    const { trainNumber } = useParams();
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
            SLEEPER: 0,
            THIRDAC: 0,
            SECONDAC: 0
        },
        fares: {
            SLEEPER: 0,
            THIRDAC: 0,
            SECONDAC: 0
        }
    });

    useEffect(() => {
        const fetchTrainDetails = async () => {
            try {
                const response = await axios.get(`http://localhost:8084/admin/search/${trainNumber}`);
                setTrainDetails(response.data);
            } catch (error) {
                console.error('Error fetching train details:', error);
            }
        };

        fetchTrainDetails();
    }, [trainNumber]);

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
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put(`http://localhost:8084/admin/updateTrain/${trainNumber}`, trainDetails);
            console.log(response.data);
           alert("Updated Successfully");
           navigate('/trainlist');
           
        } catch (error) {
            console.error('Error updating train:', error);
        }
    };
    const formatDate = (dateString) => {
        const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
        return new Date(dateString).toLocaleDateString('en-GB', options).split('/').reverse().join('-');
    };
    

   

    return (
        <div>
            <center>
                <h4>Update Train Details</h4> <br />
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
<input type="text" name="departureTime" value={trainDetails.departureTime} onChange={handleChange} placeholder="Enter Departure Time" required /><br />

<label>Arrival Time</label><br />
<input type="text" name="arrivalTime" value={trainDetails.arrivalTime} onChange={handleChange} placeholder="Enter Arrival Time" required /><br />

<label>Departure Date</label><br />
<input type="date" name="trainDepatureDate" value={formatDate(trainDetails.trainDepatureDate)} onChange={handleChange} required /><br />

<label>Arrival Date</label><br />
<input type="date" name="trainArrivalDate" value={formatDate(trainDetails.trainArrivalDate)} onChange={handleChange} required /><br />

                    <label>Sleeper Class Seats</label><br />
                    <input type="number" name="seatAvailability.SLEEPER" value={trainDetails.seatAvailability.SLEEPER} onChange={handleChange} required /><br />

                    <label>Third AC Class Seats</label><br />
                    <input type="number" name="seatAvailability.THIRDAC" value={trainDetails.seatAvailability.THIRDAC} onChange={handleChange} required /><br />

                    <label>Second AC Class Seats</label><br />
                    <input type="number" name="seatAvailability.SECONDAC" value={trainDetails.seatAvailability.SECONDAC} onChange={handleChange} required /><br />

                    <label>Sleeper Class Fare</label><br />
                    <input type="number" name="fares.SLEEPER" value={trainDetails.fares.SLEEPER} onChange={handleChange} required /><br />

                    <label>Third AC Class Fare</label><br />
                    <input type="number" name="fares.THIRDAC" value={trainDetails.fares.THIRDAC} onChange={handleChange} required /><br />

                    <label>Second AC Class Fare</label><br />
                    <input type="number" name="fares.SECONDAC" value={trainDetails.fares.SECONDAC} onChange={handleChange} required /><br />

                    <br />
                    <input className="btn btn-outline-success" type="submit" name="submit" /><br /><br />
                    <Link to="/trainlist">
                        <button className="btn btn-outline-danger">Go Back</button><br /><br />
                    </Link>
                </form>
            </center>
        </div>
    );
};

export default UpdateTrain;
