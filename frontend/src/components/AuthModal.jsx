import React, { useState } from 'react';
import LoginForm from './auth/LoginForm';
import SignupForm from './auth/SignupForm';

const AuthModal = ({ isOpen, onClose }) => {
  const [isLogin, setIsLogin] = useState(true);
  
  if (!isOpen) return null;

  const handleLogInSuccess = () => {
    onClose();
  }

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-button" onClick={onClose}>×</button>
        
        <div className={`auth-tabs ${isLogin ? 'login' : 'signup'}`}>
          <button 
            className={`tab-button ${isLogin ? 'active' : ''}`}
            onClick={() => setIsLogin(true)}
          >
            Login
          </button>
          <button 
            className={`tab-button ${!isLogin ? 'active' : ''}`}
            onClick={() => setIsLogin(false)}
          >
            Sign Up
          </button>
        </div>

        {isLogin ? (
          <LoginForm onSwitchToSignup={() => setIsLogin(false)} onLogInSuccess={handleLogInSuccess} />
        ) : (
          <SignupForm onSwitchToLogin={() => setIsLogin(true)} onClose={onClose} />
        )}
      </div>
    </div>
  );
};

export default AuthModal; 