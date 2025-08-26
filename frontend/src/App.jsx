import React from 'react'
import Navbar from './components/Navbar'
import Homepage from './pages/Homepage'
import Login from './pages/Login'
import Assets from './pages/Assets'
import Dashboard from './pages/Dashboard'
import Register from './pages/Register'
import AssetUploadForm from './components/AssetUploadForm'
import WalletPage from './pages/WalletPage'
import ProtectedRoute from './components/ProtectedRoute';
import FundingPage from './pages/FundingPage'
import PortfolioPage from './pages/PortfolioPage'
import InvestmentAlertsModal from './components/InvestmentAlertsModal'
import { AuthProvider } from './context/Authcontext'    
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

const App = () => {
  return (
    <div className='min-h-screen bg-gradient-to-br from-navy-900 via-blue-900 to-slate-900 text-white overflow-hidden relative' style={{background: 'linear-gradient(135deg, #1e293b 0%, #1e3a8a 35%, #0f172a 100%)'}}>
      <AuthProvider>
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<Homepage />} />
             <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/funding" element={<FundingPage />} />
            <Route path="/portfolio" element={<PortfolioPage />} />
            <Route path="/investment-alerts" element={<InvestmentAlertsModal />} />
            <Route path="/assets" element={
              <ProtectedRoute>
                <Assets />
              </ProtectedRoute>
            } />
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } />
            <Route path="/asset-upload" element={
              <ProtectedRoute>
                <AssetUploadForm />
              </ProtectedRoute>
            } />
            <Route path="/wallet" element={
              <ProtectedRoute>
                <WalletPage />
              </ProtectedRoute>
            } />
        </Routes>
      </Router>
      </AuthProvider>
    </div>
  )
}

export default App