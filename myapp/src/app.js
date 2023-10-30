import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import AddTrain from './component/AddTrain';
import './index.css';

import {Routes,Route} from 'react-router-dom';
import TrainList from './component/TrainList';
import UpdateTrain from './component/UpdateTrain';
import TrainSearch from './component/TrainSearch';
import BookingForm from './component/BookingForm';
import BookingList from './component/BookingList';
import ViewBookings from './component/ViewBookings';
import ViewPassengerDetails from './component/ViewPassengerDetails';
import ViewPassengerDetailsByUser from './component/ViewPassengerDetailsByUser';
function App(){
    return(<div className="bg">
        <BrowserRouter>
        <Routes>
            <Route path="/addtrain" element={<AddTrain/>}/> 
            <Route path="/trainlist" element={<TrainList/>}/> 
            <Route path="/update/:trainNumber" element={<UpdateTrain />} />
            <Route path="/trainsearch" element={<TrainSearch/>}/> 
            <Route path="/trainbooking" element={<BookingForm/>}/>
            <Route path="/trainbookinglist" element={<BookingList/>}/> 
            <Route path="/viewbookings" element={<ViewBookings/>}/> 
            <Route path="/passengerdetails/:pnrNo" element={<ViewPassengerDetails/>} />
            <Route path="/passengerdetailsbyuser/:pnrNo" element={<ViewPassengerDetailsByUser/>} />
            
            </Routes>
        </BrowserRouter>
        </div>
    );
}
export default App;