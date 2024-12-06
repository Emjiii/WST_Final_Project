import React, { useState } from 'react';
import {Navigate, Link} from 'react-router-dom'
import { doSignInWithEmailAndPassword, doSignInWithGoogle } from "./firebase/auth";
import { useAuth } from "./authContext";
import { getErrorMessage } from '../../utils/getErrorMessage';
import { getAuth, sendPasswordResetEmail } from "firebase/auth";

const LoginForm = ({ onSwitchToSignup, onLogInSuccess }) => {
  const {userLoggedIn} = useAuth()

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
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

const handleForgotPassword = async () => {
  if(!email) {
    setErrorMessage('Enter email address first.');
    return;
  }
  setIsLoading(true);
  setErrorMessage('');
  setSuccessMessage('');

  try {
    const auth = getAuth();
    await sendPasswordResetEmail(auth, email);
    setSuccessMessage('Password reset email sent!');
    setPassword('');
  } catch (error) {
    setErrorMessage(getErrorMessage(error.code));
    console.error('Error sending reset email for reset:', error);
  } finally {
    setIsLoading(false);
  }
};

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

        <p className="auth-forgot">
          <button 
            type="button" 
            className="forgot-button"
            onClick={handleForgotPassword} //to change for forgot password
            >
           Forgot Password
          </button>
        </p>
        
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