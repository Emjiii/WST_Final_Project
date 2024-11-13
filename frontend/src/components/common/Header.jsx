import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';
//import './Header.css';

const Header = () => {
  return (
    <header className="header">
      <div className="header-container">
        {/* Logo Section */}
        <div className="logo-section">
          <Link to="/" className="logo-link">
            <img 
              src="/logo.svg" 
              alt="Logo" 
              className="logo-image"
            />
            <span className="logo-text">LogicSim</span>
          </Link>
        </div>

        {/* Navigation */}
        <Navbar />
      </div>
    </header>
  );
};

export default Header;
