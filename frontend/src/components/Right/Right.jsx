import "./Right.css"
import internet from "../assets/internet-svgrepo-com.svg"
import notification from "../assets/icons8-notification.svg"
import tools from "../assets/tools-svgrepo-com.svg"
import dropdown from "../assets/dropdown-svgrepo-com.svg"
import HotelDisplay from "../Left/HotelDisplay"
import Loc_display from "../Left/Loc_display"
import Customer_display from "../Left/customer_display"
import DetailsDisplay from "./Customer/details_display"
import PropertyDisplay from "./Customer/property_display"
import VendorDisplay from "../Left/vendor_display"
import RequestDisplay from "./Vendors/request_diplay"
import RegisterDisplay from "../Left/register_display"


let SelectedComponent;
function Left()
{
    
    return (
        <>
            <div className="l_container">
                <div className="nav">
                    <div className="box">
                        <div className="A">
                        <input className="search" placeholder="Search here" type="text" />
                        </div>
                        <div className="B">
                        <img width={20} src={internet} alt="" />
                        <img width={20} src={notification} alt="" />
                        <img width={20} src={tools} alt="" />
                            <p className="admin">admin</p>
                            <img width={20} src={dropdown } alt="" />
                        </div>

                    </div>

                </div>
                <HotelDisplay></HotelDisplay>
                <Loc_display></Loc_display>
                <Customer_display></Customer_display>
                <DetailsDisplay></DetailsDisplay>
                <PropertyDisplay></PropertyDisplay>
                <VendorDisplay></VendorDisplay>
                <RequestDisplay></RequestDisplay>   
                <RegisterDisplay></RegisterDisplay>
               
                
                
                
                
                
                
            </div>
        </>
    )
}
export default Left

