import React, { useState, useEffect } from 'react';
import { FaPlus, FaEdit, FaTrash } from 'react-icons/fa';
import axios from 'axios';
import '../Hotels/Active/ActiveHotels';

const API_URL = 'http://localhost:5000/api/cities';

const ActiveHotels = () => {
  const [cities, setCity] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editCityId, setEditCityId] = useState(null);

  const [newCity, setNewCity] = useState({
    name: '',
    country: '',
    city: '',
    is_popular:'',
    location: '',
    joinedAt: '',
    isFeatured: false,
    image: '' // base64 image data
  });

  useEffect(() => {
    fetchcities();
  }, []);

  const fetchcities = async () => {
         const res = await axios.get(API_URL);
        setCity(res.data);
  };

  const handleAddCity = async () => {
    const res = await axios.post(API_URL, newCity);
    setCity([...cities, res.data]);
    setShowAddModal(false);
    resetForm();
  };

  
  const handleEditCity = (city) => {
    setNewCity(city);
    setEditCityId(city._id);
    setShowEditModal(true);
  };

  const handleUpdateCity = async () => {
    const res = await axios.put(`${API_URL}/${editCityId}`, newCity);
    setCity(cities.map(h => h._id === editCityId ? res.data : h));
    setShowEditModal(false);
    resetForm();
  };

  

  const resetForm = () => {
    setNewCity({
      country: '',
      location: '',
      name: '',
      city: '',
      is_popular:'',
      isFeatured: false,
      image: ''
    });
    setEditCityId(null);
  };

  return (
    <div>
      <div className='Addhtl'>
        <div>
          <h1>All Cities</h1>
        </div>
        <div className='side-H'>
          <input
            type="text"
            placeholder="Search Cities"
            className='htlsearch'
          />
          <button className='add_btn' onClick={() => setShowAddModal(true)}>
            <FaPlus /> Add New
          </button>
        </div>
      </div>

      {/* Add Hotel Modal */}
      {showAddModal && (
        <div>
          <div className='inp_main'>
            <h2>Add New Hotel</h2>
            <div className='input_name'>
              <input className='inp' type="text" placeholder="Country" value={newCity.country}
                onChange={(e) => setNewCity({ ...newCity, country: e.target.value })} />
              <input className='inp' type="text" placeholder="Name" value={newCity.city}
                onChange={(e) => setNewCity({ ...newCity, city: e.target.value })} />
              <input className='inp' type="text" placeholder="Is popular" value={newCity.is_popular}
                onChange={(e) => setNewCity({ ...newCity, is_popular: e.target.value })} />
            </div>
            <div className="btn3_main">
              <button className='btn3' onClick={() => setShowAddModal(false)}>Cancel</button>
              <button className='btn3' onClick={handleAddCity}>Add Hotel</button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Hotel Modal */}
      {showEditModal && (
        <div>
          <div className='inp_main'>
            <h2>Edit Hotel</h2>
            <div className='input_name'>
              <input className='inp' type="text" placeholder="Country" value={newCity.country}
                onChange={(e) => setNewCity({ ...newCity, country: e.target.value })} />
              <input className='inp' type="text" placeholder="Name" value={newCity.city}
                onChange={(e) => setNewCity({ ...newCity, city: e.target.value })} />
              <input className='inp' type="text" placeholder="Is Popular" value={newCity.is_popular}
                onChange={(e) => setNewCity({ ...newCity, is_popular: e.target.value })} />
            </div>
            <div className="btn3_main">
              <button className='btn3' onClick={() => setShowEditModal(false)}>Cancel</button>
              <button className='btn3' onClick={handleUpdateCity}>Update Hotel</button>
            </div>
          </div>
        </div>
      )}

      {/* Hotels Table */}
      <div>
        <table className='hotel-table'>
          <thead>
            <tr className='t_display'>
              <th>City</th>
              <th>Country</th>
              <th>Is Popular</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {cities.map((hotel) => (
              <tr className='tn_display' key={hotel.id}>
                
                <td>{hotel.city}</td>
                <td>{hotel.country}</td>
                <td>{hotel.is_popular}</td>
                
                <td>
                  <button onClick={() => handleEditCity(hotel)}><FaEdit /></button>
                
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ActiveHotels;
