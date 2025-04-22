import { UseHotelTab } from './HotelTabContext';
import './Left.css'

const CustomerDropdown = () => {
  
  const { setSelectedTab } = UseHotelTab();



  return (
    <div>
          <li onClick={() => setSelectedTab("customer")}>Customers</li>
      
    </div>
  );
};

export default CustomerDropdown;