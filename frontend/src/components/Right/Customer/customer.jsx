import "./customer.css"
import { UseHotelTab } from '../../Left/HotelTabContext';

export default function Customer() {
  const { setSelectedTab } = UseHotelTab();
  
    return (
        <>
            <div>
                <div className='Addhtl'>
                        <div>
                          <h1>Active users</h1>
                        </div>
                        <div className='side-H'>
                          <input type="text" placeholder="UserName/Email" className='htlsearch' />
                          
                        </div>
                </div>
                <div>
        <table className='hotel-table'>
          <thead>
            <tr className='t_display'>
              <th className='cus_th'>User</th>
              <th className='cus_th'>Email-Phone</th>
              <th className='cus_th'>Country</th>
                  <th className='cus_th'>Joined At</th>
                  <th className='cus_th'>Total Amount</th>
              <th className='cus_th'>Booking Details</th>
            </tr>
          </thead>
          <tbody>
            
              <tr  className='tn_display'>
                
                <td className='cus_td'>Aryan</td>
                <td className='cus_td'>Aryan@gmail.com</td>
                <td className='cus_td'>India</td>
                  <td className='cus_td'>02-04-2025</td>
                  <td className='cus_td'>10000</td>

                <td className='cus_td'>
                    <button onClick={() => setSelectedTab("details")}   className='editt' >
                    Details
                    </button>
                    
                </td>
              </tr>
            
          </tbody>
            </table>
            
          </div>
         
        </div>
        
        </>
    )
    
};
