import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './ActiveHotel.css'; // Optional: Style file

const API_URL = 'http://localhost:5000/api/hotels';

const InactiveHotels = () => {
  const [inactiveHotels, setInactiveHotels] = useState([]);

  useEffect(() => {
    fetchInactiveHotels();
  }, []);

  const fetchInactiveHotels = async () => {
    try {
      const res = await axios.get(API_URL);
      const filtered = res.data.filter(hotel => hotel.status === false);
      setInactiveHotels(filtered);
    } catch (err) {
      console.error("Error fetching inactive hotels:", err);
    }
  };

  const handleReactivate = async (hotelId) => {
  try {
    await axios.put(`${API_URL}/${hotelId}`, { status: true });
    setInactiveHotels(prev => prev.filter(h => h._id !== hotelId));
  } catch (err) {
    console.error("Error reactivating hotel:", err);
  }
};


  return (
    <div className="inactive-container">
      <div className='Addhtl'>
        <div>
          <h1>Inactive Hotel</h1>
        </div>
        <div className='side-H'>
          <input
            type="text"
            placeholder="Search hotels..."
            className='htlsearch'
          />
          
        </div>
      </div>
      <table className='hotel-table'>
        <thead>
          <tr className='t_display'>
            <th className='loc_th'>Image</th>
            <th className='loc_th'>Hotel Name</th>
            <th className='loc_th'>Location</th>
            <th className='loc_th'>Vendor</th>
            <th className='loc_th'>Phone</th>
            <th className='loc_th'>Joined At</th>
            <th className='loc_th'>Reactivate</th>
          </tr>
        </thead>
        <tbody>
          {inactiveHotels.map((hotel) => (
            <tr className='tn_display' key={hotel._id}>
              <td className='loc_td'>
                {hotel.images && hotel.images.length > 0 ? (
                  <img
                    src={hotel.images[0]}
                    alt={hotel.name}
                    style={{ width: '80px', height: '60px', objectFit: 'cover' }}
                  />
                ) : 'No Image'}
              </td>
              <td className='loc_td'>{hotel.name}</td>
              <td className='loc_td'>{hotel.location}</td>
              <td className='loc_td'>{hotel.vendor}</td>
              <td className='loc_td'>{hotel.phone}</td>
              <td className='loc_td'>{hotel.joinedAt}</td>
              <td className='loc_td'>
                <button className="edit" onClick={() => handleReactivate(hotel._id)}>
                  Reactivate
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default InactiveHotels;
