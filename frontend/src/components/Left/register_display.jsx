import React from 'react';
import { UseHotelTab } from './HotelTabContext';

import RegistrationForm from '../Right/Vendors/Vendor_register';

const RegisterDisplay = () => {
  const { selectedTab } = UseHotelTab();

  if (selectedTab === 'register') return <RegistrationForm />;
  
};

export default RegisterDisplay;