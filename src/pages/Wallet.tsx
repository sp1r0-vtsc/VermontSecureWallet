import React, { useState } from 'react';
import { useWallet } from '../context/WalletContext';
import { useAuth } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';
import { CreditCard, ArrowUpRight, ArrowDownLeft, History } from 'lucide-react';

function Wallet() {
  const { isAuthenticated } = useAuth();
  const { balance, loading } = useWallet();
  const [activeTab, setActiveTab] = useState<'transactions' | 'send' | 'receive'>('transactions');

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (loading) {
    return <div className="text-center">Loading...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">Your Wallet</h1>
          <CreditCard className="w-8 h-8 text-blue-600" />
        </div>

        <div className="bg-gradient-to-r from-blue-600 to-blue-400 rounded-lg p-6 text-white">
          <p className="text-sm opacity-80 mb-2">Total Balance</p>
          <h2 className="text-4xl font-bold">${balance.toFixed(2)} USD</h2>
        </div>

        <div className="mt-6 border-b border-gray-200">
          <nav className="flex space-x-8">
            <button
              onClick={() => setActiveTab('transactions')}
              className={`pb-4 px-1 ${
                activeTab === 'transactions'
                  ? 'border-b-2 border-blue-600 text-blue-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <div className="flex items-center space-x-2">
                <History className="w-4 h-4" />
                <span>Transactions</span>
              </div>
            </button>
            <button
              onClick={() => setActiveTab('send')}
              className={`pb-4 px-1 ${
                activeTab === 'send'
                  ? 'border-b-2 border-blue-600 text-blue-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <div className="flex items-center space-x-2">
                <ArrowUpRight className="w-4 h-4" />
                <span>Send</span>
              </div>
            </button>
            <button
              onClick={() => setActiveTab('receive')}
              className={`pb-4 px-1 ${
                activeTab === 'receive'
                  ? 'border-b-2 border-blue-600 text-blue-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <div className="flex items-center space-x-2">
                <ArrowDownLeft className="w-4 h-4" />
                <span>Receive</span>
              </div>
            </button>
          </nav>
        </div>

        <div className="mt-6">
          {activeTab === 'transactions' && (
            <div className="text-center text-gray-500 py-8">
              No transactions yet
            </div>
          )}
          {activeTab === 'send' && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Recipient Address</label>
                <input
                  type="text"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  placeholder="Enter recipient's wallet address"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Amount (USD)</label>
                <input
                  type="number"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  placeholder="0.00"
                />
              </div>
              <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors">
                Send Payment
              </button>
            </div>
          )}
          {activeTab === 'receive' && (
            <div className="text-center py-8">
              <p className="text-gray-600 mb-4">Your Wallet Address:</p>
              <div className="bg-gray-50 p-4 rounded-lg">
                <code className="text-sm">wallet_address_here</code>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Wallet;