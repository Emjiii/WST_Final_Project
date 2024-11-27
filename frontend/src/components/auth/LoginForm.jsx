import React from 'react';

const LoginForm = ({ onSwitchToSignup }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your login logic here
    console.log('Login form submitted');
  };

  return (
    <form className="modal-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label>Email:</label>
        <input type="email" required className="form-input" />
      </div>
      <div className="form-group">
        <label>Password:</label>
        <input type="password" required className="form-input" />
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
  );
};

export default LoginForm; 