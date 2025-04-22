import React, { useState, useEffect } from 'react';
import { FaPlus, FaEdit, FaTrash } from 'react-icons/fa';
import axios from 'axios';
import '../Hotels/ActiveHotel.css';

const API_URL = 'http://localhost:5000/api/countries';

const Countries = () => {
  const [countries, setCountries] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editCountryId, setEditCountryId] = useState(null);
  

  const [newCountry, setNewCountry] = useState({
    name: '',
    code: '',
    dialcode: '',
    cities: '',
    status: '',
    image: '' // base64 image data
  });

  // Load countries from localStorage on component mount
 useEffect(() => {
    fetchcountries();
  }, []);

  const fetchcountries = async () => {
         const res = await axios.get(API_URL);
        setCountries(res.data);
  };

  const handleAddCountry = async () => {
    const res = await axios.post(API_URL, newCountry);
    setCountries([...countries, res.data]);
    setShowAddModal(false);
    resetForm();
  };

 

  const handleEditCountry = (country) => {
    setNewCountry(country);
    setEditCountryId(country._id);
    setShowEditModal(true);
  };

  const handleUpdateCountry = async () => {
    const res = await axios.put(`${API_URL}/${editCountryId}`, newCountry);
    setCountries(countries.map(h => h._id === editCountryId ? res.data : h));
    setShowEditModal(false);
    resetForm();
  };

 

  const resetForm = () => {
    setNewCountry({
      name: '',
      code: '',
      dialcode: '',
      cities: '',
      status: '',
      image: ''
    });
    setEditCountryId(null);
  };

  return (
    <div>
      <div className='Addhtl'>
        <div>
          <h1>All Countries</h1>
        </div>
        <div className='side-H'>
          <input
            type="text"
            placeholder="Search Countries"
            className='htlsearch'
          />
          <button className='add_btn' onClick={() => setShowAddModal(true)}>
            <FaPlus /> Add New Country
          </button>
        </div>
      </div>

      {/* Add Country Modal */}
      {showAddModal && (
        <div>
          <div className='inp_main'>
            <h2>Add New Country</h2>
            <div className='input_name'>
              <input className='inp' type="text" placeholder="Country Name" value={newCountry.name}
                onChange={(e) => setNewCountry({ ...newCountry, name: e.target.value })} />
              <input className='inp' type="text" placeholder="Country Code" value={newCountry.code}
                onChange={(e) => setNewCountry({ ...newCountry, code: e.target.value })} />
              <input className='inp' type="text" placeholder="Dial Code" value={newCountry.dialcode}
                onChange={(e) => setNewCountry({ ...newCountry, dialcode: e.target.value })} />
            
            </div>
            <div className="btn3_main">
              <button className='btn3' onClick={() => setShowAddModal(false)}>Cancel</button>
              <button className='btn3' onClick={handleAddCountry}>Add Country</button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Country Modal */}
      {showEditModal && (
        <div>
          <div className='inp_main'>
            <h2>Edit Country</h2>
            <div className='input_name'>
              <input className='inp' type="text" placeholder="Country Name" value={newCountry.name}
                onChange={(e) => setNewCountry({ ...newCountry, name: e.target.value })} />
              <input className='inp' type="text" placeholder="Country Code" value={newCountry.code}
                onChange={(e) => setNewCountry({ ...newCountry, code: e.target.value })} />
              <input className='inp' type="text" placeholder="Dial Code" value={newCountry.dialcode}
                onChange={(e) => setNewCountry({ ...newCountry, dialcode: e.target.value })} />

            </div>
            <div className="btn3_main">
              <button className='btn3' onClick={() => setShowEditModal(false)}>Cancel</button>
              <button className='btn3' onClick={handleUpdateCountry}>Update Country</button>
            </div>
          </div>
        </div>
      )}

      {/* Countries Table */}
      <div>
        <table className='hotel-table'>
          <thead>
            <tr className='t_display'>
              <th>Name</th>
              <th>Code</th>
              <th>Dial Code</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {countries.map((country) => (
              <tr className='tn_display' key={country.id}>
                <td>{country.name}</td>
                <td>{country.code}</td>
                <td>{country.dialcode}</td>
                <td>
                  <button onClick={() => handleEditCountry(country)}><FaEdit /></button>
                  
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Countries;