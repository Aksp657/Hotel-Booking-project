import React, { useState, useEffect } from 'react';
import { FaPlus, FaEdit, FaTrash } from 'react-icons/fa';
import axios from 'axios';

import "./location.css"

const API_URL = 'http://localhost:5000/api/locations';

const Location = () => {
  const [locations, setLocations] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editLocationId, setEditLocationId] = useState(null);

  const [newLocation, setNewLocation] = useState({
    country: '',
    city: '',
    name: '',
    address: '',
    coordinates: '',
    status: ''
  });

  // Load locations from localStorage on component mount
   useEffect(() => {
    fetchlocation();
  }, []);

  const fetchlocation = async () => {
         const res = await axios.get(API_URL);
        setLocations(res.data);
  };

 const handleAddLocation = async () => {
    const res = await axios.post(API_URL, newLocation);
    setLocations([...locations, res.data]);
    setShowAddModal(false);
    resetForm();
  };

  

  const handleEditLocation = (location) => {
    setNewLocation(location);
    setEditLocationId(location._id);
    setShowEditModal(true);
  };

  const handleUpdateLocation = async () => {
    const res = await axios.put(`${API_URL}/${editLocationId}`, newLocation);
    setLocations(locations.map(h => h._id === editLocationId ? res.data : h));
    setShowEditModal(false);
    resetForm();
  };

  const resetForm = () => {
    setNewLocation({
      country: '',
      city: '',
      name: '',
      address: '',
      coordinates: '',
      status: ''
    });
    setEditLocationId(null);
  };

  return (
    <div>
      <div className='Addhtl'>
        <div>
          <h1>All Locations</h1>
        </div>
        <div className='side-H'>
          <input
            type="text"
            placeholder="Search Location"
            className='htlsearch'
          />
          <button className='add_btn' onClick={() => setShowAddModal(true)}>
            <FaPlus /> Add New Location
          </button>
        </div>
      </div>

      {/* Add Location Modal */}
      {showAddModal && (
        <div>
          <div className='inp_main'>
            <h2>Add New Location</h2>
            <div className='input_name'>
              <input className='inp' type="text" placeholder="Name" value={newLocation.name}
                onChange={(e) => setNewLocation({ ...newLocation, name: e.target.value })} />
              <input className='inp' type="text" placeholder="Country" value={newLocation.country}
                onChange={(e) => setNewLocation({ ...newLocation, country: e.target.value })} />
              <input className='inp' type="text" placeholder="City" value={newLocation.city}
                onChange={(e) => setNewLocation({ ...newLocation, city: e.target.value })} />
           
            </div>
            <div className="btn3_main">
              <button className='btn3' onClick={() => setShowAddModal(false)}>Cancel</button>
              <button className='btn3' onClick={handleAddLocation}>Add Location</button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Location Modal */}
      {showEditModal && (
        <div>
          <div className='inp_main'>
            <h2>Edit Location</h2>
            <div className='input_name'>
              <input className='inp' type="text" placeholder="Name" value={newLocation.name}
                onChange={(e) => setNewLocation({ ...newLocation, name: e.target.value })} />
              <input className='inp' type="text" placeholder="Country" value={newLocation.country}
                onChange={(e) => setNewLocation({ ...newLocation, country: e.target.value })} />
              <input className='inp' type="text" placeholder="City" value={newLocation.city}
                onChange={(e) => setNewLocation({ ...newLocation, city: e.target.value })} />
            </div>
            <div className="btn3_main">
              <button className='btn3' onClick={() => setShowEditModal(false)}>Cancel</button>
              <button className='btn3' onClick={handleUpdateLocation}>Update Location</button>
            </div>
          </div>
        </div>
      )}

      {/* Locations Table */}
      <div>
        <table className='hotel-table'>
          <thead>
            <tr className='t_display'>
              <th>Name</th>
              <th>Country</th>
              <th>City</th>
              <th>Action</th>
              
            </tr>
          </thead>
          <tbody>
            {locations.map((location) => (
              <tr className='tn_display' key={location.id}>
                <td>{location.name}</td>
                <td>{location.country}</td>
                <td>{location.city}</td>
                <td>
                  <button onClick={() => handleEditLocation(location)}><FaEdit /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Location;
