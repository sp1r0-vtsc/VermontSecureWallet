import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { WalletProvider } from './context/WalletContext';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import Wallet from './pages/Wallet';
import Login from './pages/Login';
import OAuthCallback from './pages/OAuthCallback';

function App() {
  return (
    <AuthProvider>
      <WalletProvider>
        <Router>
          <div className="min-h-screen bg-gray-50">
            <Navbar />
            <div className="container mx-auto px-4 py-8">
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/wallet" element={<Wallet />} />
                <Route path="/login" element={<Login />} />
                <Route path="/oauth/callback/:provider" element={<OAuthCallback />} />
              </Routes>
            </div>
          </div>
        </Router>
      </WalletProvider>
    </AuthProvider>
  );
}

export default App;