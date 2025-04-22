import React, { useState } from 'react';
import { UseHotelTab } from './HotelTabContext';
import './Left.css'

const Dropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { setSelectedTab } = UseHotelTab();

  const toggleDropdown = () => setIsOpen(!isOpen);

  return (
    <div>
      <li onClick={toggleDropdown}>Hotel</li>
      {isOpen && (
        <ul className='drpcss'>
          <li onClick={() => setSelectedTab("active")}>Active Hotels</li>
          <li onClick={() => setSelectedTab("banned")}>Inactive Hotels</li>
          <li onClick={() => setSelectedTab("allhotel")}>All Hotels</li>
          <li onClick={() => setSelectedTab("notification")}>Send Notifications</li>
        </ul>
      )}
    </div>
  );
};

export default Dropdown;
