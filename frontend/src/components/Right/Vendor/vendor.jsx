import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';

const Vendor = () => {
  const [vendors, setVendors] = useState([]);

  const handleApprove = async (id) => {
    try {
      const response = await axios.put(`${API_URL}/api/register/${id}`, {
        status: "approved"
      });
      
      if (response.status === 200) {
        // Update the local state to reflect the change
        setVendors(vendors.map(vendor => 
          vendor._id === id ? { ...vendor, status: "approved" } : vendor
        ));
        toast.success("Vendor approved successfully");
      }
    } catch (error) {
      console.error("Error approving vendor:", error);
      toast.error(error.response?.data?.message || "Failed to approve vendor");
    }
  };

  return (
    <div>
      {/* Render your component content here */}
    </div>
  );
};

export default Vendor; 