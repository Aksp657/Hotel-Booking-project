
import logo from "../assets/logo2.svg"
import "./Left.css"
import Dropdown from "./drop_down"
import Dropdown_loc from './dropdown_loc'
import CustomerDropdown from "./customer_dropdown"
import VendorDropdown from "./vendor_dropdown"
import RegisterDropdown from "./register_dropdown"



function Right()
{
    
    return (
        <>
           
            <div className="container">
                <div className="logo">
                    <img  className='logo' src={logo} alt="" />
                </div>
                <div className="menu">
                    <ul>
                        <li className="list" >Dashboard</li>
                        <li className="list"><Dropdown_loc></Dropdown_loc></li>
                        <li className="list">Manage Ads</li>
                        <li className="list">Hotel Attribute</li>
                        <li className="list">Registered User</li>
                        <li className='hotel list'><Dropdown></Dropdown>   </li>
                        <li className="list"><CustomerDropdown></CustomerDropdown></li>
                        <li className="list"><VendorDropdown></VendorDropdown></li>
                        <li className="list"><RegisterDropdown></RegisterDropdown></li>
                        <li className="list">Payments
                            
                        </li>
                        <li className="list">Withdraws</li>
                    </ul>
                </div>
                
            </div>
        </>
    )
}
export default Right