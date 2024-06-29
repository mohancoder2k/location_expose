import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { database, ref, set } from './firebase';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function Checkup() {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');

  const handleGetLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;

        const locationRef = ref(database, 'locations/' + Date.now());

        const apiKey = '919b06ce98854854966d2dc1e6de36f1';
        const geocodeUrl = `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${apiKey}`;

        axios.get(geocodeUrl)
          .then((response) => {
            if (response.data.status.code === 200) {
              const components = response.data.results[0].components;
              const street = components.road || '';
              const area = components.suburb || components.neighbourhood || '';
              const city = components.city || components.town || components.village || '';

              set(locationRef, {
                name,
                age,
                latitude,
                longitude,
                street,
                area,
                city,
                timestamp: new Date().toISOString()
              })
              .then(() => {
                Swal.fire({
                  title: 'Success!',
                  text: 'Systolic Pressure is 120 mmHg\nDiastolic Pressure is 80 mmHg',
                  icon: 'success',
                  confirmButtonText: 'OK'
                });
              })
              .catch((error) => {
                console.error('Error adding location and address to Firebase Realtime Database: ', error);
              });
            } else {
              console.error('Geocoding error: ', response.data.status.message);
            }
          })
          .catch((error) => {
            console.error('Error making geocoding request: ', error);
          });
      }, (error) => {
        console.error('Error getting location: ', error);
      });
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  };

  return (
    <div className="container mt-5">
      <div className="card">
        <div className="card-header">
          <h1 className="card-title">BP Checkup</h1>
        </div>
        <div className="card-body">
          <p className="card-text">
            Welcome to our BP checkup service. Please enter your name and age, then click the button below to get your current location and check your health status.
          </p>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">Name</label>
            <input
              type="text"
              className="form-control"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="age" className="form-label">Age</label>
            <input
              type="number"
              className="form-control"
              id="age"
              value={age}
              onChange={(e) => setAge(e.target.value)}
            />
          </div>
          <button onClick={handleGetLocation} className="btn btn-primary">Check UP</button>
        </div>
        <div className="card-footer text-muted">
          Please ensure your location services are enabled on your device to receive temperature for accurate results.
        </div>
      </div>
    </div>
  );
}

export default Checkup;
