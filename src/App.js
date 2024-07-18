import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from './Pages/Navbar';
import PatientList from './Pages/PatientList';
import AddPatient from './Pages/AddPatient';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
        
          <Route path='nav'element={<Navbar/>}/>
          <Route path="/Main/patient_add" element={<AddPatient />} />
          <Route path="/Main/patient_update/:id" element={<AddPatient />} />
          <Route path="/" element={<PatientList />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
