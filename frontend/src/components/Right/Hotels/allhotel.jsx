import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './ActiveHotel.css';

const API_URL = 'http://localhost:5000/api/hotels';

const AllHotels = () => {
  const [allHotels, setAllHotels] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchAllHotels();
  }, []);

  const fetchAllHotels = async () => {
    try {
      const res = await axios.get(API_URL);
      setAllHotels(res.data);
    } catch (err) {
      console.error('Error fetching all hotels:', err);
    }
  };

  // Filter hotels by search term
  const filteredHotels = allHotels.filter(hotel =>
    hotel.hotelName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="all-hotels">
      <div className='Addhtl'>
        <div>
          <h1>All Hotels</h1>
        </div>
        <div className='side-H'>
          <input
            type="text"
            placeholder="Search hotels..."
            className='htlsearch'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <table className="hotel-table">
        <thead>
          <tr className='t_display'>
            <th className='loc_th'>Image</th>
            <th className='loc_th'>Hotel Name</th>
            <th className='loc_th'>Location</th>
            <th className='loc_th'>Vendor</th>
            <th className='loc_th'>Phone</th>
            <th className='loc_th'>Joined At</th>
            <th className='loc_th'>Status</th>
          </tr>
        </thead>
        <tbody>
          {filteredHotels.map((hotel) => (
            <tr className='tn_display' key={hotel._id}>
              <td className='loc_td'>
                {hotel.hotelImages && hotel.hotelImages.length > 0 ? (
                  <img
                    src={`http://localhost:5000/uploads/${hotel.hotelImages[0]}`}
                    alt={hotel.hotelName}
                    style={{ width: '80px', height: '60px', objectFit: 'cover', cursor: 'pointer' }}
                  />
                ) : (
                  <div style={{
                    width: '80px', height: '60px', backgroundColor: '#f0f0f0',
                    display: 'flex', alignItems: 'center', justifyContent: 'center'
                  }}>
                    No Image
                  </div>
                )}
              </td>
              <td className='loc_td'>{hotel.hotelName}</td>
              <td className='loc_td'>{hotel.location}</td>
              <td className='loc_td'>{hotel.vendorName}</td>
              <td className='loc_td'>{hotel.phone}</td>
              <td className='loc_td'>{new Date(hotel.createdAt).toLocaleDateString()}</td>
              <td className='loc_td'>{hotel.status ? 'Active' : 'Inactive'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AllHotels;

