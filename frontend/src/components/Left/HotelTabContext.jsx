import React, { createContext, useState, useContext } from 'react';

const HotelTabContext = createContext();

export const HotelTabProvider = ({ children }) => {
  const [selectedTab, setSelectedTab] = useState(false);

  return (
    <HotelTabContext.Provider value={{ selectedTab, setSelectedTab }}>
      {children}
    </HotelTabContext.Provider>
  );
};

export const UseHotelTab = () => useContext(HotelTabContext);
