import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// import AdminLogin from './Admin.jsx'
import App from './App.jsx'
import { HotelTabProvider } from "./components/Left/HotelTabContext.jsx"

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HotelTabProvider>
      {/* <AdminLogin></AdminLogin> */}
      <App />
    </HotelTabProvider>
  </StrictMode>,
)
