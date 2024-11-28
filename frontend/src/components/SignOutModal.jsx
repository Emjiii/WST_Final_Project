import React from 'react';
import { useAuth } from "./auth/authContext"
import { doSignOut } from "./auth/firebase/auth";

const SignOutModal = ({ isOpen, onClose }) => {
  const { userLoggedIn } = useAuth();

  if (!isOpen) return null;

  const handleLogOut = async (e) => {
    e.preventDefault();
    try {
      alert("Signing out...");
      await doSignOut();
      onClose();
    } catch (error) {
      // Handle error (e.g., set error message)
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-button" onClick={onClose}>×</button>
          <div className="logged-in-view">
            <h2>You are already logged in.</h2>
            <button className="sign-out-button" onClick={handleLogOut}>
              Sign Out
            </button>
          </div>
      </div>
    </div>
  );
};

export default SignOutModal; 