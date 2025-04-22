import { UseHotelTab } from '../../Left/HotelTabContext';
export default function Details() {
  const { setSelectedTab } = UseHotelTab();
    return (
        <>
        <div className='Addhtl'>
                        <div>
                          <h1>Booking Details</h1>
                        </div>
                        <div className='side-H'>
                          <input type="text" placeholder="Search hotels..." className='htlsearch' />
                          
                        </div>
            </div>
             <table className='hotel-table'>
          <thead>
            <tr className='t_display'>
              <th className='cus_th'>Hotel Name</th>
              <th className='cus_th'>Booking date</th> 
              <th className='cus_th'>No of people</th>
              <th className='cus_th'>Status</th>
              <th className='cus_th'>Total Cost</th>
              <th className='cus_th'>Payment status</th>
              <th className='cus_th'>Review</th>
              <th className='cus_th'>Property Details</th>
            </tr>
          </thead>
          <tbody>
            
              <tr  className='tn_display'>
                
                <td className='cus_td'>Sea land</td>
                <td className='cus_td'>01-04-2025</td>
                <td className='cus_td'>5</td>
                <td className='cus_td'>Booked</td>
                <td className='cus_td'>15000</td>
              <td className='cus_td'>Advance</td>
              <td className='cus_td'>Good</td>
                <td className='cus_td'>
                <button onClick={() => setSelectedTab("property")}  className='editt' >
                    Details
                    </button>
                    
                </td>
              </tr>
            
          </tbody>
            </table>
        </>
    )    
};
