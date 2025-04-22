import { UseHotelTab } from './HotelTabContext';
import './Left.css'

const RegisterDropdown = () => {
  
  const { setSelectedTab } = UseHotelTab();



  return (
    <div>
          <li onClick={() => setSelectedTab("register")}>Vendor Registration</li>
      
    </div>
  );
};

export default RegisterDropdown;