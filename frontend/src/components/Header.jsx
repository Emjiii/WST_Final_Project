import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { TableIcon, SunIcon, MoonIcon, MenuIcon, SaveIcon } from './icons/HeaderIcons';
import LogicGateDrawer from './LogicGateDrawer';
import '../styles/header.css';

const Header = ({ addGateNode, isDarkMode, setIsDarkMode, onTruthTableClick }) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  return (
    <>
      <header className="header">
        <div className="header-container">
          <div className="header-content">
            {/* Left section with Menu and Title */}
            <div className="header-left">
              <button 
                className="header-button"
                aria-label="Menu"
                onClick={() => setIsDrawerOpen(true)}
              >
                <MenuIcon className="header-icon" />
              </button>

              <div className="logo-title-container">
                <img 
                  src="/logo.svg" 
                  alt="Logic Gate Logo" 
                  className="header-logo"
                />
                <h1 className="header-title">
                  Logic Gate Simulator
                </h1>
              </div>
            </div>

            {/* Right section */}
            <div className="header-right">
              <button 
                className="save-button"
                aria-label="Save Project"
                onClick={() => {/* Add save logic */}}
              >
                <SaveIcon className="header-icon" />
              </button>

              <button 
                className="header-button"
                aria-label="Truth Table"
                onClick={onTruthTableClick}
              >
                <TableIcon className="header-icon" />
              </button>

              <button 
                onClick={() => setIsDarkMode(!isDarkMode)}
                className="header-button"
                aria-label="Toggle Theme"
              >
                {isDarkMode ? 
                  <SunIcon className="header-icon" /> : 
                  <MoonIcon className="header-icon" />
                }
              </button>
            </div>
          </div>
        </div>
      </header>

      <LogicGateDrawer 
        isOpen={isDrawerOpen} 
        onClose={() => setIsDrawerOpen(false)} 
        addGateNode={addGateNode}
      />
    </>
  );
};

Header.propTypes = {
  addGateNode: PropTypes.func.isRequired,
  isDarkMode: PropTypes.bool.isRequired,
  setIsDarkMode: PropTypes.func.isRequired,
  onTruthTableClick: PropTypes.func.isRequired,
};

export default Header;