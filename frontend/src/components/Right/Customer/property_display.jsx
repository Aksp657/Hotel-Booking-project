import React from 'react';
import { UseHotelTab } from '../../Left/HotelTabContext';

import PropertyDetails from './property_details';

const PropertyDisplay = () => {
  const { selectedTab } = UseHotelTab();

  if (selectedTab === 'property') return <PropertyDetails />;
  
};

export default PropertyDisplay;