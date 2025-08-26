import React, { useState } from 'react';
import { TrendingUp, TrendingDown, DollarSign, PieChart, Calendar, Filter, Download, ArrowUpRight, ArrowDownRight } from 'lucide-react';


const PortfolioPage = () => {
  const [timeRange, setTimeRange] = useState('1M');
  const [selectedMetric, setSelectedMetric] = useState('value');

  const portfolioData = {
    totalValue: 13250,
    totalInvested: 10700,
    totalReturns: 2550,
    roiPercentage: 23.8,
    assets: [
      {
        id: 1,
        name: "Kenyan Coffee Collection NFT",
        invested: 5000,
        currentValue: 6225,
        returns: 1225,
        roi: 24.5,
        allocation: 47,
        performance: [100, 105, 110, 115, 120, 125, 124.5]
      },
      {
        id: 2,
        name: "Traditional Maasai Art Series",
        invested: 3200,
        currentValue: 3782,
        returns: 582,
        roi: 18.2,
        allocation: 28.5,
        performance: [100, 102, 108, 112, 118, 118.2]
      },
      {
        id: 3,
        name: "Sustainable Fashion Line",
        invested: 2500,
        currentValue: 2803,
        returns: 303,
        roi: 12.1,
        allocation: 21.2,
        performance: [100, 98, 103, 107, 110, 112.1]
      }
    ],
    monthlyPerformance: [
      { month: 'Jan', value: 10700, returns: 0 },
      { month: 'Feb', value: 11200, returns: 500 },
      { month: 'Mar', value: 11800, returns: 1100 },
      { month: 'Apr', value: 12400, returns: 1700 },
      { month: 'May', value: 12900, returns: 2200 },
      { month: 'Jun', value: 13250, returns: 2550 }
    ]
  };

  return (
    <div className="min-h-screen bg-gray-50">  
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Portfolio Performance</h1>
              <p className="text-gray-600">Track your investment performance and analytics</p>
            </div>
            <div className="flex items-center space-x-4">
              <select 
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
              >
                <option value="1W">1 Week</option>
                <option value="1M">1 Month</option>
                <option value="3M">3 Months</option>
                <option value="6M">6 Months</option>
                <option value="1Y">1 Year</option>
              </select>
              <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                <Download className="h-4 w-4 mr-2" />
                Export
              </button>
            </div>
          </div>
        </div>

        {/* Performance Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm font-medium text-gray-600">Total Portfolio Value</p>
              <DollarSign className="h-5 w-5 text-blue-600" />
            </div>
            <p className="text-2xl font-bold text-gray-900">${portfolioData.totalValue.toLocaleString()}</p>
            <div className="flex items-center mt-2">
              <ArrowUpRight className="h-4 w-4 text-green-600 mr-1" />
              <span className="text-sm text-green-600 font-medium">+{portfolioData.roiPercentage}%</span>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm font-medium text-gray-600">Total Invested</p>
              <TrendingUp className="h-5 w-5 text-purple-600" />
            </div>
            <p className="text-2xl font-bold text-gray-900">${portfolioData.totalInvested.toLocaleString()}</p>
            <p className="text-sm text-gray-500 mt-2">Principal amount</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm font-medium text-gray-600">Total Returns</p>
              <TrendingUp className="h-5 w-5 text-green-600" />
            </div>
            <p className="text-2xl font-bold text-green-600">+${portfolioData.totalReturns.toLocaleString()}</p>
            <p className="text-sm text-green-600 mt-2">Profit earned</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm font-medium text-gray-600">Active Assets</p>
              <PieChart className="h-5 w-5 text-orange-600" />
            </div>
            <p className="text-2xl font-bold text-gray-900">{portfolioData.assets.length}</p>
            <p className="text-sm text-gray-500 mt-2">Diversified portfolio</p>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Performance Chart */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-900">Performance Chart</h2>
                <div className="flex space-x-2">
                  <button 
                    onClick={() => setSelectedMetric('value')}
                    className={`px-3 py-1 text-sm rounded-lg transition-colors ${
                      selectedMetric === 'value' ? 'bg-blue-100 text-blue-700' : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    Value
                  </button>
                  <button 
                    onClick={() => setSelectedMetric('returns')}
                    className={`px-3 py-1 text-sm rounded-lg transition-colors ${
                      selectedMetric === 'returns' ? 'bg-blue-100 text-blue-700' : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    Returns
                  </button>
                </div>
              </div>
              
              {/* Simple Chart Visualization */}
              <div className="h-64 flex items-end space-x-4">
                {portfolioData.monthlyPerformance.map((data) => (
                  <div key={data.month} className="flex-1 flex flex-col items-center">
                    <div 
                      className="w-full bg-blue-600 rounded-t-lg transition-all duration-300 hover:bg-blue-700"
                      style={{
                        height: `${selectedMetric === 'value' 
                          ? (data.value / 15000) * 200 
                          : Math.max((data.returns / 3000) * 200, 10)
                        }px`
                      }}
                    ></div>
                    <p className="text-xs text-gray-600 mt-2">{data.month}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Asset Performance */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100">
              <div className="p-6 border-b border-gray-100">
                <h2 className="text-xl font-semibold text-gray-900">Asset Performance</h2>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {portfolioData.assets.map((asset) => (
                    <div key={asset.id} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="font-semibold text-gray-900">{asset.name}</h3>
                        <div className="flex items-center space-x-2">
                          {asset.roi > 0 ? (
                            <ArrowUpRight className="h-4 w-4 text-green-600" />
                          ) : (
                            <ArrowDownRight className="h-4 w-4 text-red-600" />
                          )}
                          <span className={`font-semibold ${asset.roi > 0 ? 'text-green-600' : 'text-red-600'}`}>
                            {asset.roi > 0 ? '+' : ''}{asset.roi}%
                          </span>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-4 gap-4 text-sm">
                        <div>
                          <p className="text-gray-600">Invested</p>
                          <p className="font-semibold">${asset.invested.toLocaleString()}</p>
                        </div>
                        <div>
                          <p className="text-gray-600">Current Value</p>
                          <p className="font-semibold">${asset.currentValue.toLocaleString()}</p>
                        </div>
                        <div>
                          <p className="text-gray-600">Returns</p>
                          <p className={`font-semibold ${asset.returns > 0 ? 'text-green-600' : 'text-red-600'}`}>
                            {asset.returns > 0 ? '+' : ''}${asset.returns.toLocaleString()}
                          </p>
                        </div>
                        <div>
                          <p className="text-gray-600">Allocation</p>
                          <p className="font-semibold">{asset.allocation}%</p>
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
            {/* Portfolio Allocation */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <h3 className="font-semibold text-gray-900 mb-4">Portfolio Allocation</h3>
              <div className="space-y-3">
                {portfolioData.assets.map((asset, index) => (
                  <div key={asset.id} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div 
                        className="w-3 h-3 rounded-full"
                        style={{backgroundColor: `hsl(${index * 120}, 70%, 50%)`}}
                      ></div>
                      <span className="text-sm text-gray-700 truncate">{asset.name.split(' ').slice(0, 2).join(' ')}</span>
                    </div>
                    <span className="text-sm font-medium">{asset.allocation}%</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Performance Metrics */}
            <div className="bg-gradient-to-r from-green-600 to-emerald-600 p-6 rounded-xl text-white">
              <h3 className="font-semibold mb-4">Key Metrics</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="opacity-80">Best Performer</span>
                  <span className="font-semibold">Coffee NFT</span>
                </div>
                <div className="flex justify-between">
                  <span className="opacity-80">Avg. Hold Time</span>
                  <span className="font-semibold">4.2 months</span>
                </div>
                <div className="flex justify-between">
                  <span className="opacity-80">Success Rate</span>
                  <span className="font-semibold">87%</span>
                </div>
                <div className="flex justify-between">
                  <span className="opacity-80">Risk Score</span>
                  <span className="font-semibold">Low</span>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <h3 className="font-semibold text-gray-900 mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <button className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors text-left flex items-center">
                  <TrendingUp className="h-5 w-5 mr-3" />
                  Rebalance Portfolio
                </button>
                <button className="w-full border border-gray-200 text-gray-700 py-3 px-4 rounded-lg hover:bg-gray-50 transition-colors text-left flex items-center">
                  <Filter className="h-5 w-5 mr-3" />
                  Set Performance Alerts
                </button>
                <button className="w-full border border-gray-200 text-gray-700 py-3 px-4 rounded-lg hover:bg-gray-50 transition-colors text-left flex items-center">
                  <Download className="h-5 w-5 mr-3" />
                  Download Report
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PortfolioPage;