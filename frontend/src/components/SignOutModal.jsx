import React from 'react';
import { useAuth } from "./auth/authContext"
import { doSignOut } from "./auth/firebase/auth";

const SignOutModal = ({ isOpen, onClose }) => {
  const { userLoggedIn } = useAuth();
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
      <div className="modal-signout-content">
        <button className="close-button" onClick={onClose}>×</button>
          <div className="logged-in-view">
            <h2>
              Hi {currentUser?.username||currentUser?.displayName || "User"}! You are currently logged in.
            </h2>
            <button className="sign-out-button" onClick={handleLogOut}>
              Sign Out
            </button>
          </div>
      </div>
    </div>
  );
};

export default SignOutModal; 

