import "../Customer/customer.css"
import { useState, useEffect } from "react";
import axios from "axios";
import './vendor.css';

const API_URL = 'http://localhost:5000/api/hotels';
const VENDOR_API_URL = 'http://localhost:5000/api/register';

export default function Vendor() {
 
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedHotel, setSelectedHotel] = useState(null);
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    fetchHotels();
  }, []);

  const fetchHotels = async () => {
    try {
      const res = await axios.get(VENDOR_API_URL);
      setHotels(res.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching hotels:", error);
      setError("Failed to fetch hotels");
      setLoading(false);
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

  const handleApprove = async (hotel) => {
    try {
      // Transform the vendor data to match the hotel schema
      const hotelData = {
        hotelName: hotel.hotelName,
        vendorName: hotel.vendorName,
        country: hotel.country,
        city: hotel.city,
        location: hotel.location,
        email: hotel.email,
        phone: hotel.phone,
        tinNumber: hotel.tinNumber,
        propertyType: hotel.propertyType,
        description: hotel.description,
        roomType: hotel.roomType,
        facilities: hotel.facilities,
        status: true,
        hotelImages: hotel.hotelImages || [],
        hotelVideos: hotel.hotelVideos || [],
        licenseDocument: hotel.licenseDocument || "",
        isActive: true
      };

      // Create new hotel directly without FormData since files are already uploaded
      const res = await axios.post(API_URL, hotelData);

      // Update vendor status to approved
      await axios.put(`${VENDOR_API_URL}/${hotel._id}`, { status: 'approved' });

      // Remove the approved hotel from the list
      setHotels(hotels.filter(h => h._id !== hotel._id));
      setShowDetails(false);
      alert('Hotel approved successfully!');
    } catch (error) {
      console.error("Error approving hotel:", error);
      alert("Failed to approve hotel: " + (error.response?.data?.message || error.message));
    }
  };

  const handleReject = async (hotel) => {
    try {
      await axios.put(`${VENDOR_API_URL}/${hotel._id}`, { status: 'rejected' });
      setHotels(hotels.filter(h => h._id !== hotel._id));
      setShowDetails(false);
      alert('Hotel rejected successfully!');
    } catch (error) {
      console.error("Error rejecting hotel:", error);
      alert("Failed to reject hotel");
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <>
      <div>
        <div className='Addhtl'>
          <div>
            <h1>Vendor Requests</h1>
          </div>
          <div className='side-H'>
            <input type="text" placeholder="UserName/Email" className='htlsearch' />
          </div>
        </div>
        <div>
          <table className='hotel-table'>
            <thead>
              <tr className='t_display'>
                <th className='cus_th'>Hotel</th>
                <th className='cus_th'>Vendor</th>
                <th className='cus_th'>Location</th>
                <th className='cus_th'>City</th>
                <th className='cus_th'>Country</th>
                <th className='cus_th'>Request At</th>
                <th className='cus_th'>Action</th>
              </tr>
            </thead>
            <tbody>
              {hotels.map((hotel) => (
                <tr key={hotel._id} className='tn_display'>
                  <td className='cus_td'>{hotel.hotelName}</td>
                  <td className='cus_td'>{hotel.vendorName}</td>
                  <td className='cus_td'>{hotel.location}</td>
                  <td className='cus_td'>{hotel.city}</td>
                  <td className='cus_td'>{hotel.country}</td>
                  <td className='cus_td'>{new Date(hotel.createdAt).toLocaleDateString()}</td>
                  <td className='cus_td'>
                    <button onClick={() => handleViewDetails(hotel)} className='editt'>
                      Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
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
                <p><strong>City:</strong> {selectedHotel.city}</p>
                <p><strong>Country:</strong> {selectedHotel.country}</p>
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
              <div className="req_btn">
                <button className="req_btn2 red1" onClick={() => handleReject(selectedHotel)}>Reject</button>
                <button className="req_btn2" onClick={() => handleApprove(selectedHotel)}>Approve</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}