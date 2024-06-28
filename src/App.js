import React from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { database, ref, set } from './firebase';
import './App.css';

function App() {
  const handleGetLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;

        // Create a unique key for each location entry
        const locationRef = ref(database, 'locations/' + Date.now());

        // Reverse geocode to get the address
        const apiKey = '919b06ce98854854966d2dc1e6de36f1';
        const geocodeUrl = `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${apiKey}`;

        axios.get(geocodeUrl)
          .then((response) => {
            if (response.data.status.code === 200) {
              const components = response.data.results[0].components;
              const street = components.road || '';
              const area = components.suburb || components.neighbourhood || '';
              const city = components.city || components.town || components.village || '';

              // Store location and address in Firebase Realtime Database
              set(locationRef, {
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
                  text: 'Yes you are healthy',
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
    <div className="App">
      <h1>Lets do an BP Checkup</h1>
      <button onClick={handleGetLocation}>Check UP</button>
    </div>
  );
}

export default App;
