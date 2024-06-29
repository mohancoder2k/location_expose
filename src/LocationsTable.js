import React, { useEffect, useState } from 'react';
import { database, ref, onValue } from './firebase';
import './App.css';

function LocationsTable() {
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    const locationRef = ref(database, 'locations');
    onValue(locationRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const locationsArray = Object.keys(data).map(key => ({ id: key, ...data[key] }));
        setLocations(locationsArray);
      }
    });
  }, []);

  return (
    <div className="container mt-4">
      <h2>Locations</h2>
      <div className="table-responsive">
        <table className="table table-bordered table-striped">
          <thead className="thead-dark">
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Age</th>
              <th>Latitude</th>
              <th>Longitude</th>
              <th>Street</th>
              <th>Area</th>
              <th>City</th>
              <th>Timestamp</th>
            </tr>
          </thead>
          <tbody>
            {locations.map((location) => (
              <tr key={location.id}>
                <td>{location.id}</td>
                <td>{location.name}</td>
                <td>{location.age}</td>
                <td>{location.latitude}</td>
                <td>{location.longitude}</td>
                <td>{location.street}</td>
                <td>{location.area}</td>
                <td>{location.city}</td>
                <td>{location.timestamp}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default LocationsTable;
