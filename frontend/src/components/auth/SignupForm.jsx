import React, { useState } from 'react';
import { Navigate, Link, useNavigate } from 'react-router-dom';
import { useAuth } from './authContext';
import { doCreateUserWithEmailAndPassword } from './firebase/auth';
import {db} from './firebase/firebaseConfig'
import {ref, set} from 'firebase/database';

const SignupForm = ({ onSwitchToLogin, onClose }) => {

  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false);
  
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Save user data to Firebase Realtime Database
  const saveUserToDatabase = async (userId, email, username) => {
    try {
      const dbRef = ref(db, `users/${userId}`); // Reference for the new user
      await set(dbRef, {
        email,
        username,
      });
      console.log('User data saved to database.');
    } catch (error) {
      console.error('Error saving user data to database:', error);
    }
  };



  
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match.');
      return;
    }

    setIsRegistering(true);
    setErrorMessage('');

    try {
      const userCredential = await doCreateUserWithEmailAndPassword(email, password); // Create user
      const userId = userCredential.user.uid; // Get the unique user ID from Firebase
      await saveUserToDatabase(userId, email, username); // Save username and email to the database
      console.log('Account created successfully.');
      navigate('/workspace'); 
    } catch (error) {
      console.error('Error creating account:', error);
      setErrorMessage(error.message);

    } finally {
      setIsRegistering(false);
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
\          <input type="text"
           required 
           className="form-input" 
           value={username}
           onChange={(e) => setUsername(e.target.value)}
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