import React, { useState } from 'react';
import {Navigate, Link} from 'react-router-dom'
import { doSignInWithEmailAndPassword, doSignInWithGoogle } from "./firebase/auth";
import { useAuth } from "./authContext";

const LoginForm = ({ onSwitchToSignup }) => {
  const {userLoggedIn} = useAuth()

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isSigningIn) {
      setIsSigningIn(true);
      try {
        await doSignInWithEmailAndPassword(email, password);
      } catch (error) {
        setErrorMessage(error.message);
      } finally {
        setIsSigningIn(false);
      }
    }
  };

  const onGoogleSignIn = (e) => {
    e.preventDefault()
    if(!isSigningIn){
      setIsSigningIn(true)
      doSignInWithGoogle().catch(err =>{
        setIsSigningIn(false)
      })

    }
  }

  return (
    <div>
      {userLoggedIn && (<Navigate to={'/workspace'} replace={true} />)}
      <form className="modal-form" onSubmit={handleSubmit}>
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
        
        <button type="submit" className="auth-submit-button">
          Login
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