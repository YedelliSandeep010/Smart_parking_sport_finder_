import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css' // Global styles
import App from './App.jsx'
import { ParkingProvider } from './context/ParkingContext.jsx'
import { AuthProvider } from './context/AuthContext.jsx'
import { ThemeProvider } from './context/ThemeContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider>
      <AuthProvider>
        <ParkingProvider>
          <App />
        </ParkingProvider>
      </AuthProvider>
    </ThemeProvider>
  </StrictMode>,
)
