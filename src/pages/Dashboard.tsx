import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useWallet } from '../context/WalletContext';
import { Wallet, ArrowUpRight, ArrowDownLeft } from 'lucide-react';

function Dashboard() {
  const { isAuthenticated, user } = useAuth();
  const { balance, loading } = useWallet();

  if (!isAuthenticated) {
    return (
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-4">Welcome to Vermont Secure Wallets</h1>
        <p className="text-gray-600">Please login to access your wallet.</p>
      </div>
    );
  }

  if (loading) {
    return <div className="text-center">Loading...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold">Welcome, {user?.name}</h1>
            <p className="text-gray-600">{user?.email}</p>
          </div>
          <Wallet className="w-12 h-12 text-blue-600" />
        </div>
        
        <div className="bg-blue-50 rounded-lg p-6">
          <p className="text-sm text-blue-600 mb-2">Available Balance</p>
          <h2 className="text-4xl font-bold">${balance.toFixed(2)} USD</h2>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <button className="flex items-center justify-center gap-2 bg-green-600 text-white p-4 rounded-lg hover:bg-green-700 transition-colors">
          <ArrowUpRight className="w-5 h-5" />
          Send Money
        </button>
        <button className="flex items-center justify-center gap-2 bg-blue-600 text-white p-4 rounded-lg hover:bg-blue-700 transition-colors">
          <ArrowDownLeft className="w-5 h-5" />
          Receive Money
        </button>
      </div>
    </div>
  );
}

export default Dashboard;