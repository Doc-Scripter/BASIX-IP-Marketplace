import React, { useState } from 'react';
import { Wallet, Send, ArrowDownLeft, ArrowUpRight, Shield, Copy, ExternalLink, CreditCard } from 'lucide-react';
import {walletData} from '../constants';



const WalletPage = () => {
  const [selectedTab, setSelectedTab] = useState('overview');

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    alert('Address copied to clipboard!');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50" id='wallet'>
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent mb-2">
            Cardano Wallet
          </h1>
          <p className="text-blue-800 text-lg">Manage your ADA and asset tokens</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Wallet Overview */}
          <div className="lg:col-span-2 space-y-8">
            {/* Balance Card */}
            <div className="bg-gradient-to-br  from-cyan-600 to-blue-600 p-8 rounded-2xl text-white shadow-xl border border-blue-500/20">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                  <div className="bg-white/20 p-3 rounded-xl backdrop-blur-sm">
                    <Wallet className="h-8 w-8" />
                  </div>
                  <h2 className="text-2xl font-bold">Main Wallet</h2>
                </div>
                <div className="bg-emerald-500/20 p-2 rounded-lg">
                  <Shield className="h-6 w-6 text-emerald-300" />
                </div>
              </div>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <p className="text-blue-200 mb-2 text-sm font-medium">ADA Balance</p>
                  <p className="text-5xl font-bold mb-2">{walletData.balance.ada.toLocaleString()}</p>
                  <p className="text-blue-300 text-lg">≈ ${walletData.balance.usd.toLocaleString()} USD</p>
                </div>
                <div className="flex flex-col justify-center">
                  <div className="bg-white/10 p-5 rounded-xl backdrop-blur-sm border border-white/20">
                    <p className="text-sm text-blue-200 mb-2 font-medium">Wallet Address</p>
                    <div className="flex items-center space-x-3">
                      <code className="text-sm font-mono truncate text-white/90">
                        {walletData.address.substring(0, 20)}...
                      </code>
                      <button 
                        onClick={() => copyToClipboard(walletData.address)}
                        className="bg-white/20 hover:bg-white/30 p-2 rounded-lg transition-all duration-200 hover:scale-105"
                      >
                        <Copy className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <button className="bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-lg border border-white/50 hover:bg-white hover:shadow-xl transition-all duration-300 hover:scale-105 group">
                <div className="bg-blue-100 p-3 rounded-xl mx-auto mb-3 w-fit group-hover:bg-blue-200 transition-colors">
                  <Send className="h-6 w-6 text-blue-600" />
                </div>
                <p className="font-semibold text-slate-800">Send</p>
              </button>
              <button className="bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-lg border border-white/50 hover:bg-white hover:shadow-xl transition-all duration-300 hover:scale-105 group">
                <div className="bg-emerald-100 p-3 rounded-xl mx-auto mb-3 w-fit group-hover:bg-emerald-200 transition-colors">
                  <ArrowDownLeft className="h-6 w-6 text-emerald-600" />
                </div>
                <p className="font-semibold text-slate-800">Receive</p>
              </button>
              <button className="bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-lg border border-white/50 hover:bg-white hover:shadow-xl transition-all duration-300 hover:scale-105 group">
                <div className="bg-purple-100 p-3 rounded-xl mx-auto mb-3 w-fit group-hover:bg-purple-200 transition-colors">
                  <CreditCard className="h-6 w-6 text-purple-600" />
                </div>
                <p className="font-semibold text-slate-800">Buy ADA</p>
              </button>
              <button className="bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-lg border border-white/50 hover:bg-white hover:shadow-xl transition-all duration-300 hover:scale-105 group">
                <div className="bg-orange-100 p-3 rounded-xl mx-auto mb-3 w-fit group-hover:bg-orange-200 transition-colors">
                  <ExternalLink className="h-6 w-6 text-orange-600" />
                </div>
                <p className="font-semibold text-slate-800">Stake</p>
              </button>
            </div>

            {/* Tabs */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/50">
              <div className="border-b border-slate-200/50">
                <nav className="flex space-x-8 px-6">
                  {[
                    { id: 'overview', label: 'Overview' },
                    { id: 'transactions', label: 'Transactions' },
                    { id: 'tokens', label: 'Assets & Tokens' }
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setSelectedTab(tab.id)}
                      className={`py-4 px-2 border-b-2 font-semibold text-sm transition-all duration-200 ${
                        selectedTab === tab.id
                          ? 'border-blue-500 text-blue-600'
                          : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </nav>
              </div>

              <div className="p-6">
                {selectedTab === 'overview' && (
                  <div className="grid md:grid-cols-2 gap-8">
                    <div>
                      <h3 className="font-bold text-slate-800 mb-6 text-lg">Portfolio Value</h3>
                      <div className="space-y-4">
                        <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                          <span className="text-slate-600 font-medium">ADA Holdings</span>
                          <span className="font-bold text-blue-700">${walletData.balance.usd.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg">
                          <span className="text-slate-600 font-medium">Asset Tokens</span>
                          <span className="font-bold text-purple-700">$3,640.00</span>
                        </div>
                        <div className="flex justify-between items-center p-4 bg-gradient-to-r from-slate-100 to-slate-200 rounded-lg border-t border-slate-300">
                          <span className="font-bold text-slate-800">Total Value</span>
                          <span className="font-bold text-xl text-slate-800">${(walletData.balance.usd + 3640).toLocaleString()}</span>
                        </div>
                      </div>
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-800 mb-6 text-lg">Recent Activity</h3>
                      <div className="space-y-4">
                        {walletData.transactions.slice(0, 3).map((tx) => (
                          <div key={tx.id} className="flex items-center justify-between p-4 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors">
                            <div className="flex items-center space-x-4">
                              <div className={`p-2 rounded-lg ${
                                tx.type === 'receive' ? 'bg-emerald-100' : 'bg-red-100'
                              }`}>
                                {tx.type === 'receive' ? (
                                  <ArrowDownLeft className="h-5 w-5 text-emerald-600" />
                                ) : (
                                  <ArrowUpRight className="h-5 w-5 text-red-600" />
                                )}
                              </div>
                              <div>
                                <p className="font-semibold text-slate-800">{tx.type === 'receive' ? 'Received' : 'Sent'}</p>
                                <p className="text-sm text-slate-500">{tx.timestamp}</p>
                              </div>
                            </div>
                            <span className={`font-bold ${tx.type === 'receive' ? 'text-emerald-600' : 'text-red-600'}`}>
                              {tx.type === 'receive' ? '+' : '-'}{tx.amount} ADA
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {selectedTab === 'transactions' && (
                  <div className="space-y-6">
                    <div className="flex justify-between items-center">
                      <h3 className="font-bold text-slate-800 text-lg">Transaction History</h3>
                      <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold transition-colors">
                        View All
                      </button>
                    </div>
                    {walletData.transactions.map((tx) => (
                      <div key={tx.id} className="bg-slate-50 border border-slate-200 rounded-xl p-5 hover:shadow-lg transition-all duration-200">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4">
                            <div className={`p-3 rounded-xl ${
                              tx.type === 'receive' ? 'bg-emerald-100' : 'bg-red-100'
                            }`}>
                              {tx.type === 'receive' ? (
                                <ArrowDownLeft className="h-6 w-6 text-emerald-600" />
                              ) : (
                                <ArrowUpRight className="h-6 w-6 text-red-600" />
                              )}
                            </div>
                            <div>
                              <p className="font-bold text-slate-800">{tx.type === 'receive' ? tx.from : tx.to}</p>
                              <p className="text-slate-600">{tx.timestamp}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className={`font-bold text-lg ${
                              tx.type === 'receive' ? 'text-emerald-600' : 'text-red-600'
                            }`}>
                              {tx.type === 'receive' ? '+' : '-'}{tx.amount} {tx.asset}
                            </p>
                            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold bg-emerald-100 text-emerald-800">
                              {tx.status}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {selectedTab === 'tokens' && (
                  <div className="space-y-6">
                    <h3 className="font-bold text-slate-800 text-lg">Your Assets & Tokens</h3>
                    {walletData.tokens.map((token, index) => (
                      <div key={index} className="bg-slate-50 border border-slate-200 rounded-xl p-5 hover:shadow-lg transition-all duration-200">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4">
                            <div className="w-14 h-14 bg-gradient-to-r from-cyan-600 to-blue-600 rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-lg">
                              {token.symbol.charAt(0)}
                            </div>
                            <div>
                              <p className="font-bold text-slate-800 text-lg">{token.name}</p>
                              <p className="text-slate-600 font-medium">{token.symbol}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="font-bold text-xl text-slate-800">{token.balance.toLocaleString()}</p>
                            <div className="flex items-center space-x-3">
                              <span className="text-slate-600 font-medium">{token.value}</span>
                              <span className={`text-sm font-bold px-2 py-1 rounded-full ${
                                token.change.startsWith('+') 
                                  ? 'bg-emerald-100 text-emerald-700' 
                                  : 'bg-red-100 text-red-700'
                              }`}>
                                {token.change}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Staking Rewards */}
            <div className="bg-gradient-to-br from-emerald-500 via-emerald-600 to-teal-700 p-6 rounded-2xl text-white shadow-xl border border-emerald-400/20">
              <h3 className="font-bold mb-6 text-lg flex items-center">
                <div className="bg-white/20 p-2 rounded-lg mr-3">
                  <ExternalLink className="h-5 w-5" />
                </div>
                Staking Rewards
              </h3>
              <div className="space-y-4">
                <div className="bg-white/10 p-4 rounded-xl backdrop-blur-sm">
                  <p className="text-emerald-200 text-sm font-medium mb-1">Staked Amount</p>
                  <p className="text-3xl font-bold">1,500 ADA</p>
                </div>
                <div className="bg-white/10 p-4 rounded-xl backdrop-blur-sm">
                  <p className="text-emerald-200 text-sm font-medium mb-1">Rewards Earned</p>
                  <p className="text-xl font-bold text-emerald-100">+68.5 ADA</p>
                </div>
                <div className="bg-white/10 p-4 rounded-xl backdrop-blur-sm">
                  <p className="text-emerald-200 text-sm font-medium mb-1">APY</p>
                  <p className="text-xl font-bold text-emerald-100">4.2%</p>
                </div>
              </div>
            </div>

            {/* Wallet Security */}
            <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-white/50">
              <h3 className="font-bold text-slate-800 mb-6 flex items-center text-lg">
                <div className="bg-emerald-100 p-2 rounded-lg mr-3">
                  <Shield className="h-5 w-5 text-emerald-600" />
                </div>
                Security Status
              </h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-emerald-50 rounded-lg">
                  <span className="font-medium text-slate-700">Hardware Wallet</span>
                  <span className="text-emerald-700 font-bold">Connected</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                  <span className="font-medium text-slate-700">2FA Enabled</span>
                  <span className="text-blue-700 font-bold">Active</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                  <span className="font-medium text-slate-700">Backup Status</span>
                  <span className="text-purple-700 font-bold">Complete</span>
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-white/50">
              <h3 className="font-bold text-slate-800 mb-6 text-lg">Network Stats</h3>
              <div className="space-y-4">
                <div className="flex justify-between p-3 bg-slate-50 rounded-lg">
                  <span className="font-medium text-slate-600">Current Epoch</span>
                  <span className="font-bold text-slate-800">428</span>
                </div>
                <div className="flex justify-between p-3 bg-slate-50 rounded-lg">
                  <span className="font-medium text-slate-600">Block Height</span>
                  <span className="font-bold text-slate-800">8,234,567</span>
                </div>
                <div className="flex justify-between p-3 bg-slate-50 rounded-lg">
                  <span className="font-medium text-slate-600">Network Fee</span>
                  <span className="font-bold text-slate-800">0.17 ADA</span>
                </div>
                <div className="flex justify-between p-3 bg-slate-50 rounded-lg">
                  <span className="font-medium text-slate-600">Confirmation Time</span>
                  <span className="font-bold text-slate-800">~20 sec</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WalletPage;