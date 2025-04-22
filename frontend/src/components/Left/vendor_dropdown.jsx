import { UseHotelTab } from './HotelTabContext';
import './Left.css'

const VendorDropdown = () => {
  
  const { setSelectedTab } = UseHotelTab();



  return (
    <div>
          <li onClick={() => setSelectedTab("vendor")}>Vendors Requests</li>
      
    </div>
  );
};

export default VendorDropdown;