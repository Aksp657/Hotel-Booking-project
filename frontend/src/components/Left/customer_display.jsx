import React from 'react';
import { UseHotelTab } from './HotelTabContext';

import Customer from '../Right/Customer/customer';

const CustomerDisplay = () => {
  const { selectedTab } = UseHotelTab();

  if (selectedTab === 'customer') return <Customer />;
  
};

export default CustomerDisplay;