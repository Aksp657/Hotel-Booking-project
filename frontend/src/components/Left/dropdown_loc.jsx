import React, { useState } from 'react';
import { UseHotelTab } from './HotelTabContext';
import './Left.css'

const Dropdown_loc = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { setSelectedTab } = UseHotelTab();

  const toggleDropdown = () => setIsOpen(!isOpen);

  return (
    <div>
      <li onClick={toggleDropdown}>Manage Locations</li>
      {isOpen && (
        <ul className='drpcss'>
          <li onClick={() => setSelectedTab("country")}>Countries</li>
          <li onClick={() => setSelectedTab("city")}>Cities</li>
          <li onClick={() => setSelectedTab("location")}>Locations</li>
        </ul>
      )}
    </div>
  );
};

export default Dropdown_loc