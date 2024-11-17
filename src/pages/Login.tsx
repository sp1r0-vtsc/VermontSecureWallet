import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';
import { Github, Mail } from 'lucide-react';

function Login() {
  const { isAuthenticated, loginWithGoogle, loginWithGithub } = useAuth();

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h1 className="text-2xl font-bold text-center mb-8">Welcome to Vermont Secure Wallets</h1>
        
        <div className="space-y-4">
          <button
            onClick={loginWithGoogle}
            className="w-full flex items-center justify-center space-x-2 bg-white border border-gray-300 text-gray-700 px-4 py-3 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <Mail className="w-5 h-5" />
            <span>Continue with Google</span>
          </button>
          
          <button
            onClick={loginWithGithub}
            className="w-full flex items-center justify-center space-x-2 bg-gray-900 text-white px-4 py-3 rounded-lg hover:bg-gray-800 transition-colors"
          >
            <Github className="w-5 h-5" />
            <span>Continue with GitHub</span>
          </button>
        </div>

        <p className="mt-6 text-center text-sm text-gray-600">
          By continuing, you agree to our Terms of Service and Privacy Policy
        </p>
      </div>
    </div>
  );
}

export default Login;