import React, { useState, useEffect } from 'react';
import { FaPlus, FaEdit, FaTrash } from 'react-icons/fa';
import axios from 'axios';
import "./Active.css"
import "../../Vendors/vendor.css"
import "../../Vendors/RegisterForm.css"

const API_URL = 'http://localhost:5000/api/hotels';
const facilityOptions = [
  'Parking',
  'Restaurant',
  'Pets allowed',
  'Room service',
  '24-hour front desk',
  'Fitness centre',
  'Non-smoking rooms',
  'Airport shuttle',
  'Spa and wellness centre',
  'Free WiFi',
  'Electric vehicle charging station',
  'Wheelchair accessible',
  'Swimming Pool',
];

const roomtypeOptions = [
  'Single Room',
  'Double Room',
  'Triple Room',
  'Family Room',
  'Suite',
  'Deluxe Room',
];

const ActiveHotels = () => {
  const [hotels, setHotels] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editHotelId, setEditHotelId] = useState(null);
  const [previewHotel, setPreviewHotel] = useState(null);
  const [selectedHotel, setSelectedHotel] = useState(null);
  const [showDetails, setShowDetails] = useState(false);

  // Form state
  const [step, setStep] = useState(1);
  const [hotelImages, setHotelImages] = useState([]);
  const [hotelVideos, setHotelVideos] = useState([]);
  const [licenseDocumentFile, setLicenseDocumentFile] = useState(null);
  const [hotelName, setHotelName] = useState('');
  const [vendorName, setVendorName] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [location, setLocation] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [tinNumber, setTinNumber] = useState('');
  const [propertyType, setPropertyType] = useState('');
  const [facilities, setFacilities] = useState([]);
  const [customFacility, setCustomFacility] = useState('');
  const [roomtypes, setRoomType] = useState([]);
  const [customRoomType, setCustomRoomType] = useState('');
  const [countries, setCountries] = useState([]);
  const [cities, setCity] = useState([]);
  const [description, setDescription] = useState('');

  useEffect(() => {
    fetchHotels();
    fetchCountries();
    fetchCities();
  }, []);

  const fetchHotels = async () => {
    try {
      const res = await axios.get(API_URL);
      setHotels(res.data.filter(h => h.status));
    } catch (error) {
      console.error("Error fetching hotels:", error);
    }
  };

  const fetchCountries = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/countries');
      setCountries(response.data);
    } catch (error) {
      console.error('Error fetching countries:', error);
    }
  };

  const fetchCities = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/cities');
      setCity(response.data);
    } catch (error) {
      console.error('Error fetching cities:', error);
    }
  };

  const handleViewDetails = (hotel) => {
    setSelectedHotel(hotel);
    setShowDetails(true);
  };

  const handleCloseDetails = () => {
    setShowDetails(false);
    setSelectedHotel(null);
  };

  const handleNext = (e) => {
    e.preventDefault();
    setStep(step + 1);
  };

  const handleBack = (e) => {
    e.preventDefault();
    setStep(step - 1);
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setHotelImages(files);
  };

  const handleVideoChange = (e) => {
    const files = Array.from(e.target.files);
    setHotelVideos(files);
  };

  const handleAddFacility = () => {
    const trimmed = customFacility.trim();
    if (trimmed && !facilities.includes(trimmed)) {
      setFacilities([...facilities, trimmed]);
      setCustomFacility('');
    }
  };

  const handleAddRoomType = () => {
    const trimmed = customRoomType.trim();
    if (trimmed && !roomtypes.includes(trimmed)) {
      setRoomType([...roomtypes, trimmed]);
      setCustomRoomType('');
    }
  };

  const handleRemoveFacility = (facility) => {
    setFacilities(facilities.filter((f) => f !== facility));
  };

  const handleRemoveRoomType = (roomType) => {
    setRoomType(roomtypes.filter((f) => f !== roomType));
  };

  const handleAddHotel = async (e) => {
    e.preventDefault();

    // Validate required fields
    const requiredFields = ['hotelName', 'vendorName', 'location', 'phone', 'email', 'propertyType', 'description'];
    const missingFields = requiredFields.filter(field => {
      if (field === 'propertyType') return !propertyType;
      if (field === 'roomType') return roomtypes.length === 0;
      return !eval(field) || eval(field).trim() === '';
    });

    if (missingFields.length > 0) {
      alert(`Please fill in all required fields: ${missingFields.join(', ')}`);
      return;
    }

    try {
      const formData = new FormData();
      formData.append('hotelName', hotelName);
      formData.append('vendorName', vendorName);
      formData.append('country', selectedCountry);
      formData.append('city', selectedCity);
      formData.append('location', location);
      formData.append('email', email);
      formData.append('phone', phone);
      formData.append('tinNumber', tinNumber);
      formData.append('description', description);
      formData.append('propertyType', propertyType);
      formData.append('roomType', JSON.stringify(roomtypes));
      formData.append('facilities', JSON.stringify(facilities));
      formData.append('status', 'true');

      if (licenseDocumentFile) formData.append('licenseDocument', licenseDocumentFile);
      hotelImages.forEach(file => formData.append('images', file));
      hotelVideos.forEach(file => formData.append('videos', file));

      const res = await axios.post(API_URL, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      setHotels([...hotels, res.data]);
      setShowAddModal(false);
      resetForm();
      alert('Hotel added successfully!');
    } catch (error) {
      console.error("Add hotel failed:", error.response?.data || error.message);
      alert("Failed to add hotel");
    }
  };

  const handleUpdateHotel = async (e) => {
    e.preventDefault();

    // Validate required fields
    const requiredFields = ['hotelName', 'vendorName', 'location', 'phone', 'email', 'propertyType'];
    const missingFields = requiredFields.filter(field => {
      if (field === 'propertyType') return !propertyType;
      if (field === 'roomType') return roomtypes.length === 0;
      return !eval(field) || eval(field).trim() === '';
    });

    if (missingFields.length > 0) {
      alert(`Please fill in all required fields: ${missingFields.join(', ')}`);
      return;
    }

    try {
      const formData = new FormData();
      formData.append('hotelName', hotelName);
      formData.append('vendorName', vendorName);
      formData.append('country', selectedCountry);
      formData.append('city', selectedCity);
      formData.append('location', location);
      formData.append('email', email);
      formData.append('phone', phone);
      formData.append('tinNumber', tinNumber);
      formData.append('propertyType', propertyType);
      formData.append('roomType', JSON.stringify(roomtypes));
      formData.append('facilities', JSON.stringify(facilities));
      formData.append('status', 'true');

      if (licenseDocumentFile) formData.append('licenseDocument', licenseDocumentFile);
      hotelImages.forEach(file => formData.append('images', file));
      hotelVideos.forEach(file => formData.append('videos', file));

      const res = await axios.put(`${API_URL}/${editHotelId}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      setHotels(hotels.map(h => h._id === editHotelId ? res.data : h));
      setShowEditModal(false);
      resetForm();
      alert('Hotel updated successfully!');
    } catch (error) {
      console.error("Update hotel failed:", error.response?.data || error.message);
      alert("Failed to update hotel");
    }
  };

  const handleEditHotel = (hotel) => {
    setHotelName(hotel.hotelName);
    setVendorName(hotel.vendorName);
    setSelectedCountry(hotel.country || '');
    setSelectedCity(hotel.city || '');
    setLocation(hotel.location);
    setEmail(hotel.email);
    setPhone(hotel.phone);
    setTinNumber(hotel.tinNumber);
    setDescription(hotel.description || '');
    setPropertyType(hotel.propertyType);
    setRoomType(Array.isArray(hotel.roomType) ? hotel.roomType : JSON.parse(hotel.roomType || '[]'));
    setFacilities(Array.isArray(hotel.facilities) ? hotel.facilities : JSON.parse(hotel.facilities || '[]'));
    setEditHotelId(hotel._id);
    setStep(2);
    setShowEditModal(true);
  };

  const resetForm = () => {
    setHotelName('');
    setVendorName('');
    setSelectedCountry('');
    setSelectedCity('');
    setLocation('');
    setEmail('');
    setPhone('');
    setTinNumber('');
    setDescription('');
    setPropertyType('');
    setRoomType([]);
    setFacilities([]);
    setHotelImages([]);
    setHotelVideos([]);
    setLicenseDocumentFile(null);
    setStep(1);
    setEditHotelId(null);
  };

  const handleStatusToggle = async (hotel) => {
    try {
      await axios.put(`${API_URL}/${hotel._id}`, { ...hotel, status: false });
      setHotels(hotels.filter(h => h._id !== hotel._id));
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };


  return (
    <div>
      <div className='Addhtl'>
        <div>
          <h1>Active Hotels</h1>
        </div>
        <div className='side-H'>
          <input type="text" placeholder="Search hotels..." className='htlsearch' />
          <button className='add_btn' onClick={() => {
            resetForm();
            setShowAddModal(true);
          }}>
            <FaPlus /> Add Hotel
          </button>
        </div>
      </div>

      {/* Add Hotel Modal */}
      {showAddModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h2>Add New Hotel</h2>
              <button className="close-button" onClick={() => setShowAddModal(false)}>×</button>
            </div>
            <div className="modal-body">
              <form onSubmit={step === 2 ? handleAddHotel : handleNext}>
                {step === 1 && (
                  <>
                    <div className="form-group">
                      <label>Hotel Name:</label>
                      <input
                        type="text"
                        placeholder="Enter hotel name"
                        value={hotelName}
                        onChange={(e) => setHotelName(e.target.value)}
                      />
                    </div>

                    <div className="form-group">
                      <label>Vendor Name:</label>
                      <input
                        type="text"
                        placeholder="Enter vendor name"
                        value={vendorName}
                        onChange={(e) => setVendorName(e.target.value)}
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="country">Select Country:</label>
                      <select
                        id="country"
                        name="country"
                        value={selectedCountry}
                        onChange={(e) => setSelectedCountry(e.target.value)}
                      >
                        <option value="">--Select a country--</option>
                        {countries.map((country) => (
                          <option key={country._id} value={country.name}>
                            {country.name} ({country.dialCode})
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="form-group">
                      <label htmlFor="city">Select City:</label>
                      <select
                        id="city"
                        name="city"
                        value={selectedCity}
                        onChange={(e) => setSelectedCity(e.target.value)}
                      >
                        <option value="">--Select a city--</option>
                        {cities.map((city) => (
                          <option key={city._id} value={city.city}>
                            {city.city} ({city.dialCode})
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="form-group">
                      <label>Location:</label>
                      <input
                        type="text"
                        placeholder="Enter full address"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                      />
                    </div>

                    <div className="form-group">
                      <label>Email:</label>
                      <input
                        type="email"
                        placeholder="Enter email address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>

                    <div className="form-group">
                      <label>Phone:</label>
                      <input
                        type="tel"
                        placeholder="Enter phone number"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                      />
                    </div>

                    <div className="form-group">
                      <label>TIN No:</label>
                      <input
                        type="tel"
                        placeholder="Enter TIN No"
                        value={tinNumber}
                        onChange={(e) => setTinNumber(e.target.value)}
                      />
                    </div>

                    <div className="form-group">
                      <label>Description:</label>
                      <textarea
                        placeholder="Enter hotel description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        rows="4"
                        style={{
                          width: '100%',
                          padding: '8px 12px',
                          border: '1px solid #ddd',
                          borderRadius: '4px',
                          resize: 'vertical',
                          minHeight: '100px'
                        }}
                      ></textarea>
                    </div>

                    <div className="form-buttons">
                      <button type="button" className="button3" onClick={() => setShowAddModal(false)}>Cancel</button>
                      <button type="submit" className="button3">Next</button>
                    </div>
                  </>
                )}

                {step === 2 && (
                  <>
                    <div className="form-group">
                      <label>Property Type:</label>
                      <select
                        value={propertyType}
                        onChange={(e) => setPropertyType(e.target.value)}
                      >
                        <option value="">Select Property Type</option>
                        {[
                          'Hotels', 'Apartments', 'Guest houses', 'Hostels', 'Homestays',
                          'Bed and breakfasts', 'Villas', 'Resorts', 'Lodges',
                          'Holiday homes', 'Campsites', 'Capsule hotels',
                          'Farm stays', 'Love hotels'
                        ].map((type) => (
                          <option key={type} value={type}>{type}</option>
                        ))}
                      </select>
                    </div>

                    <div className="form-group">
                      <label>Room Type:</label>
                      <div style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
                        <select
                          value=""
                          onChange={(e) => {
                            const selected = e.target.value;
                            if (selected && !roomtypes.includes(selected)) {
                              setRoomType([...roomtypes, selected]);
                            }
                          }}
                        >
                          <option value="">Select from list</option>
                          {roomtypeOptions.map((roomType, index) => (
                            <option key={index} value={roomType}>
                              {roomType}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
                        <input
                          type="text"
                          value={customRoomType}
                          onChange={(e) => setCustomRoomType(e.target.value)}
                          placeholder="Add custom room type"
                        />
                        <button type="button" onClick={handleAddRoomType}>Add</button>
                      </div>

                      <div className="selected-facilities" style={{ marginBottom: '15px' }}>
                        {roomtypes.map((roomType, index) => (
                          <span
                            key={index}
                            style={{
                              display: 'inline-block',
                              backgroundColor: '#f0f0f0',
                              padding: '5px 10px',
                              borderRadius: '15px',
                              marginRight: '5px',
                              marginBottom: '5px',
                              fontSize: '14px',
                            }}
                          >
                            {roomType}
                            <button
                              type="button"
                              onClick={() => handleRemoveRoomType(roomType)}
                              style={{
                                background: 'none',
                                border: 'none',
                                color: 'red',
                                marginLeft: '5px',
                                cursor: 'pointer',
                              }}
                            >×</button>
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="form-group">
                      <label>Facilities:</label>
                      <div style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
                        <select
                          value=""
                          onChange={(e) => {
                            const selected = e.target.value;
                            if (selected && !facilities.includes(selected)) {
                              setFacilities([...facilities, selected]);
                            }
                          }}
                        >
                          <option value="">Select from list</option>
                          {facilityOptions.map((facility, index) => (
                            <option key={index} value={facility}>
                              {facility}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
                        <input
                          type="text"
                          value={customFacility}
                          onChange={(e) => setCustomFacility(e.target.value)}
                          placeholder="Add custom facility"
                        />
                        <button type="button" onClick={handleAddFacility}>Add</button>
                      </div>

                      <div className="selected-facilities" style={{ marginBottom: '15px' }}>
                        {facilities.map((facility, index) => (
                          <span
                            key={index}
                            style={{
                              display: 'inline-block',
                              backgroundColor: '#f0f0f0',
                              padding: '5px 10px',
                              borderRadius: '15px',
                              marginRight: '5px',
                              marginBottom: '5px',
                              fontSize: '14px',
                            }}
                          >
                            {facility}
                            <button
                              type="button"
                              onClick={() => handleRemoveFacility(facility)}
                              style={{
                                background: 'none',
                                border: 'none',
                                color: 'red',
                                marginLeft: '5px',
                                cursor: 'pointer',
                              }}
                            >×</button>
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="form-group">
                      <label>License Document Upload:</label>
                      <input
                        type="file"
                        accept=".pdf,.jpg,.jpeg,.png"
                        onChange={(e) => setLicenseDocumentFile(e.target.files[0])}
                      />
                    </div>

                    <div className="form-group">
                      <label>Hotel Images:</label>
                      <input
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={handleImageChange}
                      />

                      <div className="image-preview">
                        {hotelImages.map((file, index) => (
                          <img
                            key={index}
                            src={URL.createObjectURL(file)}
                            alt={`Preview ${index}`}
                            style={{ width: '100px', margin: '5px' }}
                          />
                        ))}
                      </div>
                    </div>

                    <div className="form-group">
                      <label>Hotel Videos:</label>
                      <input
                        type="file"
                        accept="video/*"
                        multiple
                        onChange={handleVideoChange}
                      />
                    </div>

                    <div className="form-buttons">
                      <button type="button" className="button3" onClick={handleBack}>Back</button>
                      <button type="submit" className="button3">Add Hotel</button>
                    </div>
                  </>
                )}
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Edit Hotel Modal */}
      {showEditModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h2>Edit Hotel</h2>
              <button className="close-button" onClick={() => setShowEditModal(false)}>×</button>
            </div>
            <div className="modal-body">
              <form onSubmit={step === 2 ? handleUpdateHotel : handleNext}>
                {step === 1 && (
                  <>
                    <div className="form-group">
                      <label>Hotel Name:</label>
                      <input
                        type="text"
                        placeholder="Enter hotel name"
                        value={hotelName}
                        onChange={(e) => setHotelName(e.target.value)}
                      />
                    </div>

                    <div className="form-group">
                      <label>Vendor Name:</label>
                      <input
                        type="text"
                        placeholder="Enter vendor name"
                        value={vendorName}
                        onChange={(e) => setVendorName(e.target.value)}
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="country">Select Country:</label>
                      <select
                        id="country"
                        name="country"
                        value={selectedCountry}
                        onChange={(e) => setSelectedCountry(e.target.value)}
                      >
                        <option value="">--Select a country--</option>
                        {countries.map((country) => (
                          <option key={country._id} value={country.name}>
                            {country.name} ({country.dialCode})
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="form-group">
                      <label htmlFor="city">Select City:</label>
                      <select
                        id="city"
                        name="city"
                        value={selectedCity}
                        onChange={(e) => setSelectedCity(e.target.value)}
                      >
                        <option value="">--Select a city--</option>
                        {cities.map((city) => (
                          <option key={city._id} value={city.city}>
                            {city.city} ({city.dialCode})
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="form-group">
                      <label>Location:</label>
                      <input
                        type="text"
                        placeholder="Enter full address"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                      />
                    </div>

                    <div className="form-group">
                      <label>Email:</label>
                      <input
                        type="email"
                        placeholder="Enter email address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>

                    <div className="form-group">
                      <label>Phone:</label>
                      <input
                        type="tel"
                        placeholder="Enter phone number"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                      />
                    </div>

                    <div className="form-group">
                      <label>TIN No:</label>
                      <input
                        type="tel"
                        placeholder="Enter TIN No"
                        value={tinNumber}
                        onChange={(e) => setTinNumber(e.target.value)}
                      />
                    </div>

                    <div className="form-group">
                      <label>Description:</label>
                      <textarea
                        placeholder="Enter hotel description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        rows="4"
                        style={{
                          width: '100%',
                          padding: '8px 12px',
                          border: '1px solid #ddd',
                          borderRadius: '4px',
                          resize: 'vertical',
                          minHeight: '100px'
                        }}
                      ></textarea>
                    </div>

                    <div className="form-buttons">
                      <button type="button" className="button3" onClick={() => setShowEditModal(false)}>Cancel</button>
                      <button type="submit" className="button3">Next</button>
                    </div>
                  </>
                )}

                {step === 2 && (
                  <>
                    <div className="form-group">
                      <label>Property Type:</label>
                      <select
                        value={propertyType}
                        onChange={(e) => setPropertyType(e.target.value)}
                      >
                        <option value="">Select Property Type</option>
                        {[
                          'Hotels', 'Apartments', 'Guest houses', 'Hostels', 'Homestays',
                          'Bed and breakfasts', 'Villas', 'Resorts', 'Lodges',
                          'Holiday homes', 'Campsites', 'Capsule hotels',
                          'Farm stays', 'Love hotels'
                        ].map((type) => (
                          <option key={type} value={type}>{type}</option>
                        ))}
                      </select>
                    </div>

                    <div className="form-group">
                      <label>Room Type:</label>
                      <div style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
                        <select
                          value=""
                          onChange={(e) => {
                            const selected = e.target.value;
                            if (selected && !roomtypes.includes(selected)) {
                              setRoomType([...roomtypes, selected]);
                            }
                          }}
                        >
                          <option value="">Select from list</option>
                          {roomtypeOptions.map((roomType, index) => (
                            <option key={index} value={roomType}>
                              {roomType}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
                        <input
                          type="text"
                          value={customRoomType}
                          onChange={(e) => setCustomRoomType(e.target.value)}
                          placeholder="Add custom room type"
                        />
                        <button type="button" onClick={handleAddRoomType}>Add</button>
                      </div>

                      <div className="selected-facilities" style={{ marginBottom: '15px' }}>
                        {roomtypes.map((roomType, index) => (
                          <span
                            key={index}
                            style={{
                              display: 'inline-block',
                              backgroundColor: '#f0f0f0',
                              padding: '5px 10px',
                              borderRadius: '15px',
                              marginRight: '5px',
                              marginBottom: '5px',
                              fontSize: '14px',
                            }}
                          >
                            {roomType}
                            <button
                              type="button"
                              onClick={() => handleRemoveRoomType(roomType)}
                              style={{
                                background: 'none',
                                border: 'none',
                                color: 'red',
                                marginLeft: '5px',
                                cursor: 'pointer',
                              }}
                            >×</button>
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="form-group">
                      <label>Facilities:</label>
                      <div style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
                        <select
                          value=""
                          onChange={(e) => {
                            const selected = e.target.value;
                            if (selected && !facilities.includes(selected)) {
                              setFacilities([...facilities, selected]);
                            }
                          }}
                        >
                          <option value="">Select from list</option>
                          {facilityOptions.map((facility, index) => (
                            <option key={index} value={facility}>
                              {facility}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
                        <input
                          type="text"
                          value={customFacility}
                          onChange={(e) => setCustomFacility(e.target.value)}
                          placeholder="Add custom facility"
                        />
                        <button type="button" onClick={handleAddFacility}>Add</button>
                      </div>

                      <div className="selected-facilities" style={{ marginBottom: '15px' }}>
                        {facilities.map((facility, index) => (
                          <span
                            key={index}
                            style={{
                              display: 'inline-block',
                              backgroundColor: '#f0f0f0',
                              padding: '5px 10px',
                              borderRadius: '15px',
                              marginRight: '5px',
                              marginBottom: '5px',
                              fontSize: '14px',
                            }}
                          >
                            {facility}
                            <button
                              type="button"
                              onClick={() => handleRemoveFacility(facility)}
                              style={{
                                background: 'none',
                                border: 'none',
                                color: 'red',
                                marginLeft: '5px',
                                cursor: 'pointer',
                              }}
                            >×</button>
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="form-group">
                      <label>License Document Upload:</label>
                      <input
                        type="file"
                        accept=".pdf,.jpg,.jpeg,.png"
                        onChange={(e) => setLicenseDocumentFile(e.target.files[0])}
                      />
                    </div>

                    <div className="form-group">
                      <label>Hotel Images:</label>
                      <input
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={handleImageChange}
                      />

                      <div className="image-preview">
                        {hotelImages.map((file, index) => (
                          <img
                            key={index}
                            src={URL.createObjectURL(file)}
                            alt={`Preview ${index}`}
                            style={{ width: '100px', margin: '5px' }}
                          />
                        ))}
                      </div>
                    </div>

                    <div className="form-group">
                      <label>Hotel Videos:</label>
                      <input
                        type="file"
                        accept="video/*"
                        multiple
                        onChange={handleVideoChange}
                      />
                    </div>

                    <div className="form-buttons">
                      <button type="button" className="button3" onClick={handleBack}>Back</button>
                      <button type="submit" className="button3">Update Hotel</button>
                    </div>
                  </>
                )}
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Hotels Table */}
      <div>
        <table className='hotel-table'>
          <thead>
            <tr className='t_display'>
              <th className='loc_th'>Image</th>
              <th className='loc_th'>Hotel Name</th>
              <th className='loc_th'>Location</th>
              <th className='loc_th'>Vendor</th>
              <th className='loc_th'>Phone</th>
              <th className='loc_th'>Joined At</th>
              <th className='loc_th'>Status</th>
              <th className='loc_th'>Edit</th>
              <th className='loc_th'>Details</th>
            </tr>
          </thead>
          <tbody>
            {hotels.map((hotel, index) => (
              <tr className='tn_display' key={hotel._id}>
                <td className='loc_td'>
                  {hotel.hotelImages && hotel.hotelImages.length > 0 ? (
                    <img
                      src={`http://localhost:5000/uploads/${hotel.hotelImages[0]}`}
                      alt={hotel.hotelName}
                      style={{ width: '80px', height: '60px', objectFit: 'cover', cursor: 'pointer' }}
                      onClick={() => setPreviewHotel(hotel)}
                    />
                  ) : (
                    <div style={{ width: '80px', height: '60px', backgroundColor: '#f0f0f0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      No Image
                    </div>
                  )}
                </td>
                <td className='loc_td'>{hotel.hotelName}</td>
                <td className='loc_td'>{hotel.location}</td>
                <td className='loc_td'>{hotel.vendorName}</td>
                <td className='loc_td'>{hotel.phone}</td>
                <td className='loc_td'>{new Date(hotel.createdAt).toLocaleDateString()}</td>
                <td className='loc_td'>
                  <label className="switch">
                    <input
                      type="checkbox"
                      checked={hotel.status}
                      onChange={() => handleStatusToggle(hotel)}
                    />
                    <span className="slider round"></span>
                  </label>
                </td>
                <td className='loc_td'>
                  <button className='edit' onClick={() => handleEditHotel(hotel)}>
                    Edit
                  </button>
                </td>
                <td className='loc_td'>
                  <button onClick={() => handleViewDetails(hotel)} className='editt'>
                    Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>


      {showDetails && selectedHotel && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h2>Hotel Details</h2>
              <button className="close-button" onClick={handleCloseDetails}>×</button>
            </div>
            <div className="modal-body">
              <div className="detail-section">
                <h3>Basic Information</h3>
                <p><strong>Hotel Name:</strong> {selectedHotel.hotelName}</p>
                <p><strong>Vendor Name:</strong> {selectedHotel.vendorName}</p>
                <p><strong>Location:</strong> {selectedHotel.location}</p>
                <p><strong>Description:</strong> {selectedHotel.description}</p>
              </div>

              <div className="detail-section">
                <h3>Contact Information</h3>

                <p><strong>Email:</strong> {selectedHotel.email}</p>
                <p><strong>Phone:</strong> {selectedHotel.phone}</p>
                <p><strong>TIN Number:</strong> {selectedHotel.tinNumber}</p>

              </div>

              <div className="detail-section">
                <h3>Property Details</h3>
                <p><strong>Property Type:</strong> {selectedHotel.propertyType}</p>
                <p><strong>Room Type:</strong> {selectedHotel.roomType}</p>
                <p><strong>Facilities:</strong> {selectedHotel.facilities.join(', ')}</p>
              </div>



              {selectedHotel.hotelImages && selectedHotel.hotelImages.length > 0 && (
                <div className="detail-section">
                  <h3>Images</h3>
                  <div className="image-grid">
                    {selectedHotel.hotelImages.map((image, index) => (
                      <img
                        key={index}
                        src={`http://localhost:5000/uploads/${image}`}
                        alt={`${selectedHotel.hotelName} - Image ${index + 1}`}

                      />
                    ))}
                  </div>
                </div>
              )}

              {selectedHotel.licenseDocument && (
                <div className="detail-section">
                  <h3>License Document</h3>
                  <a
                    href={`http://localhost:5000/uploads/${selectedHotel.licenseDocument}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="license-link"
                  >
                    View License Document
                  </a>
                </div>
              )}

            </div>
          </div>
        </div>
      )}

      {/* Preview Modal */}
      {previewHotel && (
        <div className="preview-modal">
          <div className="preview-content">
            <h3>{previewHotel.name}</h3>
            <div className="preview-grid">
              {previewHotel.hotelImages.map((img, idx) => (
                <img
                  key={idx}
                  src={`http://localhost:5000/uploads/${img}`}
                  onError={(e) => (e.target.src = "/images/default-hotel.jpg")}
                  alt={`img-${idx}`}
                  style={{ width: "150px", margin: "10px" }}
                />
              ))}
              {previewHotel.video && (
                <video width="300" controls style={{ margin: '10px' }}>
                  <source src={previewHotel.video} />
                </video>
              )}
            </div>
            <button onClick={() => setPreviewHotel(null)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ActiveHotels;