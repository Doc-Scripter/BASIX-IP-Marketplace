import React, { useState } from 'react';
import {featuredAssets} from '../constants'
import { Plus, TrendingUp, DollarSign, Package, Eye, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import AssetUploadForm from './AssetUploadForm';

const CreatorDashboard = () => {
   const [showUploadForm, setShowUploadForm] = useState(false);

  return (
    <div>
        <div className="max-w-7xl mx-auto px-4 py-8" id='creator-dashboard'>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Creator Dashboard</h1>
        <p className="text-gray-600">Manage your assets and track performance</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Assets</p>
              <p className="text-2xl font-bold text-navy-900">12</p>
            </div>
            <Package className="h-8 w-8 text-blue-600" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Revenue</p>
              <p className="text-2xl font-bold text-green-600">$16,170</p>
            </div>
            <DollarSign className="h-8 w-8 text-green-600" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Avg. Funding</p>
              <p className="text-2xl font-bold text-blue-600">47%</p>
            </div>
            <TrendingUp className="h-8 w-8 text-blue-600" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Investors</p>
              <p className="text-2xl font-bold text-purple-600">147</p>
            </div>
            <Users className="h-8 w-8 text-purple-600" />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid lg:grid-cols-3 gap-8">
        {/* Assets List */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100">
            <div className="p-6 border-b border-gray-100">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold text-gray-900">Your Assets</h2>
               <Link to="/asset-upload"
                 className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-cyan-600 to-blue-600 text-white rounded-xl hover:shadow-xl transition-all duration-300 font-semibold"
                 >
                <Plus className="w-5 h-5" />
                <span>Create Asset</span>
               </Link>
              </div>
            </div>
            
            <div className="p-6">
              <div className="space-y-4">
                {featuredAssets.map((featuredAsset) => (
                  <div key={featuredAsset.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
                    <div className="flex items-center space-x-4">
                      <img 
                        src={featuredAsset.image} 
                        alt={featuredAsset.title}
                        className="w-16 h-16 rounded-lg object-cover"
                      />
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h3 className="font-semibold text-gray-900">{featuredAsset.title}</h3>
                          <span className={`px-2 py-1 text-xs rounded-full ${
                            featuredAsset.status === 'Active' ? 'bg-green-100 text-green-800' :
                            featuredAsset.status === 'Funding' ? 'bg-blue-100 text-blue-800' :
                            'bg-gray-100 text-gray-800'
                          }`}>
                            {featuredAsset.status}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 mt-1">{featuredAsset.type}</p>
                        <div className="flex items-center justify-between mt-2">
                          <div className="flex items-center space-x-4">
                            <span className="text-sm text-gray-600">
                              Funded: <span className="font-medium">{featuredAsset.funded}%</span>
                            </span>
                            <span className="text-sm text-gray-600">
                              Revenue: <span className="font-medium text-green-600">{featuredAsset.revenue}</span>
                            </span>
                          </div>
                          <Link 
                            to={`/asset/${featuredAsset.id}`}
                            className="flex items-center text-blue-600 hover:text-blue-700 text-sm"
                          >
                            <Eye className="h-4 w-4 mr-1" />
                            View
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* AI Insights */}
          <div className="bg-gradient-to-r from-blue-600 to-cyan-600 p-6 rounded-xl text-white">
            <h3 className="font-semibold mb-4">AI Market Insights</h3>
            <div className="space-y-3">
              <div className="bg-white/20 p-3 rounded-lg">
                <p className="text-sm font-medium">Coffee NFTs trending</p>
                <p className="text-xs opacity-80">+35% interest this week</p>
              </div>
              <div className="bg-white/20 p-3 rounded-lg">
                <p className="text-sm font-medium">Optimal pricing detected</p>
                <p className="text-xs opacity-80">Consider 15% price adjustment</p>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h3 className="font-semibold text-gray-900 mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <Link 
                to="/asset/new" 
                className="block w-full text-left p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center space-x-3">
                  <Plus className="h-5 w-5 text-blue-600" />
                  <span className="font-medium">Create New Asset</span>
                </div>
              </Link>
              <Link 
                to="/funding" 
                className="block w-full text-left p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center space-x-3">
                  <TrendingUp className="h-5 w-5 text-green-600" />
                  <span className="font-medium">View Funding</span>
                </div>
              </Link>
              <Link 
                to="/wallet" 
                className="block w-full text-left p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center space-x-3">
                  <DollarSign className="h-5 w-5 text-purple-600" />
                  <span className="font-medium">Manage Wallet</span>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  )
}

export default CreatorDashboard