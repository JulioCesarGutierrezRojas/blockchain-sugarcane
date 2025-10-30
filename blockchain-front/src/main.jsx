import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import AppRouter from './routes/router.jsx'
import { WalletProvider } from './contexts/WalletContext.jsx'
import { AuthProvider } from './contexts/AuthContext.jsx'


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <WalletProvider>
          <AppRouter/>
        </WalletProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
