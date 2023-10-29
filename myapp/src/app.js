import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import AddTrain from './component/AddTrain';
import './index.css';

import {Routes,Route} from 'react-router-dom';
import TrainList from './component/TrainList';
import UpdateTrain from './component/UpdateTrain';
function App(){
    return(<div className="bg">
        <BrowserRouter>
        <Routes>
            <Route path="/addtrain" element={<AddTrain/>}/> 
            <Route path="/trainlist" element={<TrainList/>}/> 
            <Route path="/update/:trainNumber" element={<UpdateTrain />} />
            </Routes>
        </BrowserRouter>
        </div>
    );
}
export default App;