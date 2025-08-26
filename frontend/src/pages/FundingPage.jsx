import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Calculator, TrendingUp, Shield, Clock, ArrowRight } from 'lucide-react';
import InvestmentAlertsModal from '../components/InvestmentAlertsModal';

const FundingPage = () => {
  const [investmentAmount, setInvestmentAmount] = useState(1000);
  const [investmentTerm, setInvestmentTerm] = useState(12);
  const [isAlertsModalOpen, setIsAlertsModalOpen] = useState(false);

  const calculateReturns = () => {
    const monthlyRate = 0.02; // 2% monthly return
    return investmentAmount * Math.pow(1 + monthlyRate, investmentTerm);
  };

  const projectedReturns = calculateReturns();
  const totalGain = projectedReturns - investmentAmount;
  const roiPercentage = ((totalGain / investmentAmount) * 100).toFixed(1);

  return (
    <div className="min-h-screen bg-gray-50">
 
      
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Investment & Funding</h1>
          <p className="text-gray-600">Manage your investments and explore funding opportunities</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Investment Calculator */}
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
              <div className="flex items-center space-x-3 mb-6">
                <Calculator className="h-6 w-6 text-blue-600" />
                <h2 className="text-2xl font-semibold text-gray-900">Investment Calculator</h2>
              </div>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Investment Amount (USD)
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                      <input
                        type="number"
                        value={investmentAmount}
                        onChange={(e) => setInvestmentAmount(Number(e.target.value))}
                        className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                        min="100"
                        step="100"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Investment Term (Months)
                    </label>
                    <input
                      type="range"
                      min="3"
                      max="24"
                      value={investmentTerm}
                      onChange={(e) => setInvestmentTerm(Number(e.target.value))}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                    />
                    <div className="flex justify-between text-sm text-gray-600 mt-1">
                      <span>3 months</span>
                      <span className="font-medium">{investmentTerm} months</span>
                      <span>24 months</span>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gradient-to-r from-blue-50 to-cyan-50 p-6 rounded-lg">
                  <h3 className="font-semibold text-gray-900 mb-4">Projected Returns</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Initial Investment:</span>
                      <span className="font-semibold">${investmentAmount.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Projected Value:</span>
                      <span className="font-semibold text-green-600">${projectedReturns.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Total Gain:</span>
                      <span className="font-semibold text-green-600">+${totalGain.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between border-t border-gray-200 pt-3">
                      <span className="text-gray-900 font-medium">ROI:</span>
                      <span className="font-bold text-green-600 text-lg">+{roiPercentage}%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Funding Opportunities */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100">
              <div className="p-6 border-b border-gray-100">
                <h2 className="text-xl font-semibold text-gray-900">Featured Opportunities</h2>
              </div>
              <div className="p-6">
                <div className="space-y-6">
                  {[
                    {
                      title: "Organic Tea Plantation Tokens",
                      creator: "David Mwangi",
                      target: 25000,
                      raised: 18500,
                      backers: 47,
                      roi: "28.5%",
                      risk: "Low",
                      term: "12 months",
                      image: "https://images.pexels.com/photos/1638280/pexels-photo-1638280.jpeg?auto=compress&cs=tinysrgb&w=300"
                    },
                    {
                      title: "Handwoven Textile Collection",
                      creator: "Mary Nyokabi",
                      target: 15000,
                      raised: 8200,
                      backers: 23,
                      roi: "22.1%",
                      risk: "Medium",
                      term: "8 months",
                      image: "https://images.pexels.com/photos/3985062/pexels-photo-3985062.jpeg?auto=compress&cs=tinysrgb&w=300"
                    }
                  ].map((opportunity, index) => (
                    <div key={index} className="border border-gray-200 rounded-lg p-6 hover:bg-gray-50 transition-colors">
                      <div className="flex items-start space-x-6">
                        <img 
                          src={opportunity.image} 
                          alt={opportunity.title}
                          className="w-20 h-20 rounded-lg object-cover flex-shrink-0"
                        />
                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-2">
                            <div>
                              <h3 className="font-semibold text-gray-900 text-lg">{opportunity.title}</h3>
                              <p className="text-gray-600">by {opportunity.creator}</p>
                            </div>
                            <div className="text-right">
                              <p className="text-2xl font-bold text-green-600">{opportunity.roi}</p>
                              <p className="text-sm text-gray-600">Expected ROI</p>
                            </div>
                          </div>
                          
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                            <div>
                              <p className="text-sm text-gray-600">Target</p>
                              <p className="font-semibold">${opportunity.target.toLocaleString()}</p>
                            </div>
                            <div>
                              <p className="text-sm text-gray-600">Raised</p>
                              <p className="font-semibold text-blue-600">${opportunity.raised.toLocaleString()}</p>
                            </div>
                            <div>
                              <p className="text-sm text-gray-600">Risk Level</p>
                              <p className={`font-semibold ${
                                opportunity.risk === 'Low' ? 'text-green-600' : 
                                opportunity.risk === 'Medium' ? 'text-yellow-600' : 'text-red-600'
                              }`}>{opportunity.risk}</p>
                            </div>
                            <div>
                              <p className="text-sm text-gray-600">Term</p>
                              <p className="font-semibold">{opportunity.term}</p>
                            </div>
                          </div>
                          
                          <div className="mb-4">
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div 
                                className="bg-blue-600 h-2 rounded-full" 
                                style={{width: `${(opportunity.raised / opportunity.target) * 100}%`}}
                              ></div>
                            </div>
                          </div>
                          
                          <div className="flex items-center justify-between">
                            <div className="text-sm text-gray-600">
                              {opportunity.backers} backers • {Math.round((opportunity.raised / opportunity.target) * 100)}% funded
                            </div>
                            <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center">
                              Invest Now
                              <ArrowRight className="h-4 w-4 ml-2" />
                            </button>
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
            {/* Market Insights */}
            <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-6 rounded-xl text-white">
              <h3 className="font-semibold mb-4 flex items-center">
                <TrendingUp className="h-5 w-5 mr-2" />
                Market Insights
              </h3>
              <div className="space-y-3">
                <div className="bg-white/20 p-3 rounded-lg">
                  <p className="text-sm font-medium">Hot Sector</p>
                  <p className="text-xs opacity-80">Sustainable Agriculture +42%</p>
                </div>
                <div className="bg-white/20 p-3 rounded-lg">
                  <p className="text-sm font-medium">AI Prediction</p>
                  <p className="text-xs opacity-80">Coffee assets trending up</p>
                </div>
                <div className="bg-white/20 p-3 rounded-lg">
                  <p className="text-sm font-medium">Risk Alert</p>
                  <p className="text-xs opacity-80">Diversification recommended</p>
                </div>
              </div>
            </div>

            {/* Investment Tips */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
                <Shield className="h-5 w-5 mr-2 text-green-600" />
                Smart Investing
              </h3>
              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-sm text-gray-700">Diversify across multiple assets to reduce risk</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-sm text-gray-700">Start with smaller amounts to test the market</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-sm text-gray-700">Consider longer terms for better returns</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-sm text-gray-700">Monitor AI insights for market trends</p>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <h3 className="font-semibold text-gray-900 mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <Link 
                  to="/portfolio"
                  onClick={() => setIsAlertsModalOpen(true)}
                  className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors text-left flex items-center"
                >
                  <TrendingUp className="h-5 w-5 mr-3" />
                  View Portfolio Performance
                </Link>

                <Link to="/investment-alerts" className="w-full border border-gray-200 text-gray-700 py-3 px-4 rounded-lg hover:bg-gray-50 transition-colors text-left flex items-center">
                  <Clock className="h-5 w-5 mr-3" />
                  Set Investment Alerts
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <InvestmentAlertsModal 
        isOpen={isAlertsModalOpen} 
        onClose={() => setIsAlertsModalOpen(false)} 
      />
    </div>
  );
};

export default FundingPage;