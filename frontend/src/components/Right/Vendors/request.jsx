import "./request.css"
export default function Request() {
    return (
        <>
            <div>
                <h1 className="heading">Vendor Request</h1>
                <div className="ven_main">
                <div className="ven">
                    <h3>Vendor Information</h3>
                    <p>Name: Sathish</p>
                    <p>Phone: 123456789</p>
                    <p>Email: 2G6oT@example.com</p>
                </div>
                <div className="inf">
                    <h3>Hotel Information</h3>
                    <p>Hotel Name: Thrupthi</p>
                    <p>Location: Vijay Nagar</p>
                    <p>Country: India</p>
                </div>
                <div className="doc">
                    <h3>Submitte documents for attachment</h3>
                    <p>TIN No: 123456</p>
                    <p>License Picture: document</p>
                    </div>    
                </div>
                <button>Reject</button>
                <button>Approve</button>
            </div>
        </>
    )
    
};
