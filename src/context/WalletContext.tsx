import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import axios from 'axios';

interface WalletContextType {
  walletId: string | null;
  balance: number;
  loading: boolean;
  createWallet: () => Promise<void>;
  getBalance: () => Promise<void>;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

export function WalletProvider({ children }: { children: React.ReactNode }) {
  const { user, isAuthenticated } = useAuth();
  const [walletId, setWalletId] = useState<string | null>(null);
  const [balance, setBalance] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);

  const apiClient = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    }
  });

  const createWallet = async () => {
    if (!isAuthenticated || !user) return;

    try {
      const response = await apiClient.post('/wallet/create', {
        userId: user.id,
        email: user.email
      });

      setWalletId(response.data.walletId);
    } catch (error) {
      console.error('Error creating wallet:', error);
    }
  };

  const getBalance = async () => {
    if (!walletId) return;

    try {
      const response = await apiClient.get(`/wallet/${walletId}/balance`);
      setBalance(Number(response.data.balance));
    } catch (error) {
      console.error('Error fetching balance:', error);
    }
  };

  useEffect(() => {
    if (isAuthenticated && user) {
      createWallet();
    }
    setLoading(false);
  }, [isAuthenticated, user]);

  useEffect(() => {
    if (walletId) {
      getBalance();
    }
  }, [walletId]);

  return (
    <WalletContext.Provider value={{
      walletId,
      balance,
      loading,
      createWallet,
      getBalance,
    }}>
      {children}
    </WalletContext.Provider>
  );
}

export function useWallet() {
  const context = useContext(WalletContext);
  if (context === undefined) {
    throw new Error('useWallet must be used within a WalletProvider');
  }
  return context;
}