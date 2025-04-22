import React from 'react';
import { UseHotelTab } from './HotelTabContext';

import Vendor from '../Right/Vendors/vendor';

const VendorDisplay = () => {
  const { selectedTab } = UseHotelTab();

  if (selectedTab === 'vendor') return <Vendor />;
  
};

export default VendorDisplay;