import React from 'react';
import { UseHotelTab } from './HotelTabContext';

import Countries from '../Right/Manage_Location/countries';
import Cities from '../Right/Manage_Location/cities';
import Location from '../Right/Manage_Location/location';

const Loc_display = () => {
  const { selectedTab } = UseHotelTab();

    if (selectedTab === 'country') return <Countries />;
    if (selectedTab === 'city') return <Cities />;
    if (selectedTab === 'location') return <Location/>;
  
  
};

export default Loc_display;