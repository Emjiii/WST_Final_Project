import React, { useState } from 'react';
import {Navigate, Link} from 'react-router-dom'
import { doSignInWithEmailAndPassword, doSignInWithGoogle } from "./firebase/auth";
import { useAuth } from "./authContext";
import { getErrorMessage } from '../../utils/getErrorMessage';

const LoginForm = ({ onSwitchToSignup, onLogInSuccess }) => {
  const {userLoggedIn} = useAuth()

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false); // Added loading state


  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true); // Start loading
    setErrorMessage(''); // Reset error message

    try {
        await doSignInWithEmailAndPassword(email, password);
        onLogInSuccess(); // Call the success callback
    } catch (error) {
        setErrorMessage(getErrorMessage(error.code)); // Set the error message
        console.error('Error logging in:', error);
    } finally {
        setIsLoading(false); // Stop loading regardless of success or failure
    }
};

  const onGoogleSignIn = (e) => {
    e.preventDefault()
    if(!isSigningIn){
      setIsSigningIn(true)
      setIsLoading(true); // Reset loading state
      doSignInWithGoogle().catch(err =>{
        setIsSigningIn(false)
        setIsLoading(false); // Reset loading state
      })

    }
  }

  return (
    <div>
      {userLoggedIn && (<Navigate to={'/workspace'} replace={true} />)}
       {/* Loader Overlay */}
       {isLoading && (
        <div className="loader-overlay">
          <div className="loader"></div>
        </div>
      )}
      
      <form className="modal-form" onSubmit={handleSubmit}>
        {errorMessage && <div className="error-notification">{errorMessage}</div>} {/* Display error message */}
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
        
        <button type="submit" className="auth-submit-button" disabled={isLoading}>
          {isLoading ? 'Logging In...' : 'Login'}
        </button>
        
        <p className="auth-switch">
          Don't have an account?{' '}
          <button 
            type="button" 
            className="switch-button"
            onClick={onSwitchToSignup}
            >
            Sign Up
          </button>
        </p>
      </form>
    </div>
  );
};

export default LoginForm; 