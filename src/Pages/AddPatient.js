import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import './AddPatient.css';

const AddPatient = () => {
  const { id } = useParams();
  const [patient, setPatient] = useState({
    name: '',
    age: '',
    gender: '',
    address: ''
  });

  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      axios.get(`http://localhost:8080/api/v1/patients/${id}`)
        .then(response => {
          const data = response.data;
          if (data) {
            setPatient({
              name: data.name || '',
              age: data.age || '',
              gender: data.gender || '',
              address: data.address || ''
            });
          } else {
            setPatient({
              name: '',
              age: '',
              gender: '',
              address: ''
            });
          }
        })
        .catch(error => {
          console.error('Error fetching patient data:', error);
        });
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPatient({ ...patient, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Basic validation
    if (!patient.name || !patient.age || !patient.gender || !patient.address) {
      alert("All fields are required.");
      return;
    }

    const request = id 
      ? axios.put(`http://localhost:8080/api/v1/patients/${id}`, patient)
      : axios.post('http://localhost:8080/api/v1/patients', patient);

    request
      .then(response => {
        console.log('Patient saved successfully:', response.data);
        navigate('/Main/patient_list');
      })
      .catch(error => {
        console.error('Error saving patient:', error);
      });
  };

  const handleCancel = () => {
    navigate('/Main/patient_list');
  };

  return (
    <div className="patient-form-container">
      <h2>{id ? 'Update' : 'Add'} Patient</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input type="text" name="name" value={patient.name} onChange={handleChange} required />
        </label>
        <label>
          Age:
          <input type="number" name="age" value={patient.age} onChange={handleChange} required />
        </label>
        <label>
          Gender:
          <input type="text" name="gender" value={patient.gender} onChange={handleChange} required />
        </label>
        <label>
          Address:
          <input type="text" name="address" value={patient.address} onChange={handleChange} required />
        </label>
        <div className="form-buttons">
          <button type="submit">{id ? 'Save' : 'Add'}</button>
          <button type="button" onClick={handleCancel}>Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default AddPatient;
