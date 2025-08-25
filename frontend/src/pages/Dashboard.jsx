import React from 'react'
import { useAuth } from '../context/AuthContext';
import CreatorDashboard from '../components/CreatorDashboard';
import InvestorDashboard from '../components/InvestorDashboard';

const Dashboard = () => {
     const { user } = useAuth();
  if (!user) {
    return <div>Please log in to access the dashboard.</div>;
  }
  return (
    <div className="min-h-screen bg-gray-50">
 
      {user.userType === 'creator' ? <CreatorDashboard /> : <InvestorDashboard />}
    </div>
  )
}

export default Dashboard