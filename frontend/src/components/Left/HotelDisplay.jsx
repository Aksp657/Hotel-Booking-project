import React from 'react';
import { UseHotelTab } from './HotelTabContext';

import ActiveHotels from '../Right/Hotels/Active/ActiveHotels';
import Banned from '../Right/Hotels/Inactive';
import Allhotel from '../Right/Hotels/allhotel';
import Notification from '../Right/Hotels/notification';

const HotelDisplay = () => {
  const { selectedTab } = UseHotelTab();

  if (selectedTab === 'active') return <ActiveHotels />;
  if (selectedTab === 'banned') return <Banned />;
  if (selectedTab === 'allhotel') return <Allhotel />;
  if (selectedTab === 'notification')return <Notification />;
};

export default HotelDisplay;
