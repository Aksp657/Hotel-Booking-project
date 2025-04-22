import "./property.css"
import img1 from "./Hotel.jpg"
export default function PropertyDetails() {
    
    return (
        <>
        <div className='pr_mainhead'>
                        <div>
                          <h2>Property Details</h2>
                        </div>
                        
            </div>
            <div className="pr_container ">
                <div className="pr_head">
                <h2>Sea Land</h2>
                <p>Mangalore</p>
                </div>
                <div className="imagess">
                    <img height={300} src={img1} alt="" />
                    
                </div>
                <div className="pr_box">
                    <div className="pr_box1">
                        <h4>Vendor Name</h4>
                        <p>Sathish</p>
                    </div>
                    <div className="pr_box2">
                        <h4>Property Type</h4>
                        <p>Appartment</p>
                    </div>
                    <div className="pr_box2">
                        <h4>Room Type</h4>
                        <p>Family</p>
                    </div>
                    <div className="pr_box2">
                        <h4>Bed Type</h4>
                        <p>Double Bed</p>
                    </div>
                    <div className="pr_box2">
                        <h4>Check-In Date</h4>
                        <p>19-04-2025</p>
                    </div>
                    <div className="pr_box2">
                        <h4>Check-Out Date</h4>
                        <p>25-04-2025</p>
                    </div>
                </div>
             </div>
        </>
    )    
};