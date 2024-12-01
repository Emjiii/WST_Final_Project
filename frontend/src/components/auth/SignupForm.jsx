import React, { useState } from 'react';
import { Navigate, Link, useNavigate } from 'react-router-dom';
import { useAuth } from './authContext';
import { doCreateUserWithEmailAndPassword } from './firebase/auth';

const SignupForm = ({ onSwitchToLogin, onClose }) => {

  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false);

  const [userName, setUserName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [isRegistering, setIsRegistering] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      if(!isRegistering){
        setIsRegistering(true)
        await doCreateUserWithEmailAndPassword(email, password)
      }
    
    // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate delay
      console.log('Signup form submitted');
        // Clear input fields after successful account creation
      
      setUserName('');
      setEmail('');
      setPassword('');
      setConfirmPassword('')

      if (onClose) onClose();


    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
    {useAuth.userLoggedIn && (<Navigate to={'/workspace'} replace={true} />)}
    
    {/* Loader Overlay */}
    {isLoading && (
        <div className="loader-overlay">
          <div className="loader"></div>
        </div>
    )}
    
    
    <form className="modal-form" onSubmit={handleSubmit}>
      <div className="signup-form-grid">
        <div className="form-group">
          <label>Username:</label>
          <input type="name" 
            required 
            className="form-input" 
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Email:</label>
          <input 
            type="email" 
            required 
            className="form-input" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input 
            type="password" 
            required 
            className="form-input" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Confirm:</label>
          <input 
            type="password" 
            required 
            className="form-input" 
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
      </div>
      
      <button 
        type="submit" 
        className={`auth-submit-button ${isLoading ? 'loading' : ''}`}
        disabled={isLoading}
      >
        {isLoading ? 'Creating Account...' : 'Sign Up'}
      </button>

      <button 
        type="button" 
        className={`auth-submit-button ${isLoading ? 'loading' : ''}`}
        disabled={isLoading}
      >
        {isLoading ? 'Creating Account...' : 'Sign in with Google'}
      </button>
      
      <p className="auth-switch">
        Already have an account?{' '}
        <button 
          type="button" 
          className="switch-button"
          onClick={onSwitchToLogin}
          disabled={isLoading}
        >
          Login
        </button>
      </p>
    </form>
    </>
  );
};

export default SignupForm; 