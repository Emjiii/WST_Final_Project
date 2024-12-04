import React from 'react';
import { useAuth } from "./auth/authContext"
import { doSignOut } from "./auth/firebase/auth";

const SignOutModal = ({ isOpen, onClose }) => {
  const { currentUser } = useAuth();

  if (!isOpen) return null;

  const handleLogOut = async (e) => {
    e.preventDefault();
    try {
      await doSignOut();
      setTimeout(() => {
        onClose(); // Close the modal after "signing out"
      }, 500); // Simulate a delay for the sign-out process
    } catch (error) {
      // Handle error (e.g., set error message)
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-button" onClick={onClose}>
          ×
        </button>
        <div className="modal-body">
          {/* Neutral gender avatar */}
          <img
            src="https://via.placeholder.com/80"
            alt="Neutral Avatar"
            className="avatar"
          />
          <div>
            <h2 className="modal-title">
              Hi {currentUser?.username || "User"}!
            </h2>
            <p className="modal-text">
              You are currently logged in.
            </p>
          </div>
        </div>
        <button
          className="sign-out-button"
          onClick={handleLogOut}
        >
          Sign Out
        </button>
      </div>
    </div>
  );
};

export default SignOutModal; 

