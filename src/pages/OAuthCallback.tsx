import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

function OAuthCallback() {
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const code = searchParams.get('code');
  const provider = location.pathname.includes('google') ? 'google' : 'github';

  useEffect(() => {
    if (code) {
      handleOAuthCallback(code, provider);
    }
  }, [code, provider]);

  const handleOAuthCallback = async (code: string, provider: string) => {
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/oauth/callback/${provider}`, {
        code,
        redirect_uri: `${window.location.origin}/oauth/callback/${provider}`
      });

      const { token } = response.data;
      localStorage.setItem('token', token);
      navigate('/');
    } catch (error) {
      console.error('OAuth callback error:', error);
      navigate('/login');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
        <p className="mt-4 text-gray-600">Completing authentication...</p>
      </div>
    </div>
  );
}

export default OAuthCallback;