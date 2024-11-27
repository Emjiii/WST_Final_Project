import React, { useState } from 'react';

const SignupForm = ({ onSwitchToLogin }) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    try {
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate delay
      console.log('Signup form submitted');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form className="modal-form" onSubmit={handleSubmit}>
      <div className="signup-form-grid">
        <div className="form-group">
          <label>Username:</label>
          <input type="text" required className="form-input" />
        </div>
        <div className="form-group">
          <label>Email:</label>
          <input type="email" required className="form-input" />
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input type="password" required className="form-input" />
        </div>
        <div className="form-group">
          <label>Confirm:</label>
          <input type="password" required className="form-input" />
        </div>
      </div>
      
      <button 
        type="submit" 
        className={`auth-submit-button ${isLoading ? 'loading' : ''}`}
        disabled={isLoading}
      >
        {isLoading ? 'Creating Account...' : 'Sign Up'}
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
  );
};

export default SignupForm; 