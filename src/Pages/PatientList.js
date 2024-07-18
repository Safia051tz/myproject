import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar'; // Import the Navbar component
import './PatientList.css';

const PatientList = () => {
    const [patients, setPatients] = useState([]);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    // Fetch patients from the backend
    const fetchPatients = () => {
        axios.get('http://localhost:8080/api/v1/patients')
            .then(response => {
                setPatients(response.data);
            })
            .catch(error => {
                console.error('Error fetching patient data:', error);
                setError(error);
            });
    };

    useEffect(() => {
        fetchPatients();
    }, []);

    const handleUpdatePatient = (id) => {
        navigate(`/Main/patient_update/${id}`);
    };

    const handleDeletePatient = (id) => {
        axios.delete(`http://localhost:8080/api/v1/patients/${id}`)
            .then(() => {
                setPatients(patients.filter(patient => patient.id !== id));
            })
            .catch(error => {
                console.error('Error deleting patient:', error);
            });
    };

    return (
        <div className="patient-table-container">
            <Navbar /> {/* Add the Navbar here */}
            <h2>Patient List</h2>
            {error && <div className="error-message">Error fetching patient data: {error.message}</div>}
            <button className="add-patient" onClick={() => navigate('/Main/patient_add')}>Add</button>
            <table id="patientTable" className="patient-table">
                <thead>
                    <tr>
                        <th className="small-col">ID</th>
                        <th>Name</th>
                        <th>Age</th>
                        <th>Gender</th>
                        <th>Address</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {patients.map(patient => (
                        <tr key={patient.id}>
                            <td>{patient.id}</td>
                            <td>{patient.name}</td>
                            <td>{patient.age}</td>
                            <td>{patient.gender}</td>
                            <td>{patient.address}</td>
                            <td>
                                <button onClick={() => handleUpdatePatient(patient.id)}>Update</button>
                                <button onClick={() => handleDeletePatient(patient.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default PatientList;
