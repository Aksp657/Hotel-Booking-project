import React from 'react';
import { UseHotelTab } from '../../Left/HotelTabContext';

import Details from './details';

const DetailsDisplay = () => {
  const { selectedTab } = UseHotelTab();

  if (selectedTab === 'details') return <Details />;
  
};

export default DetailsDisplay;