import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { TableIcon, SunIcon, MoonIcon, MenuIcon, SaveIcon, ImportIcon } from './icons/HeaderIcons';
import LogicGateDrawer from './LogicGateDrawer';
import SaveButton from './SaveButton';
import '../styles/header.css';
import { saveCircuit, saveCircuitAsImage, importCircuit } from '../utils/circuitOperations';

  const Header = ({ addGateNode, isDarkMode, setIsDarkMode, onTruthTableClick, getNodes, getEdges }) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const [isSavePopupOpen, setIsSavePopupOpen] = useState(false);
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);

  useEffect(() => {
    console.log('Nodes or edges have changed:', { nodes, edges });
  }, [nodes, edges]);

  const handleSaveAsFile = () => {
    saveCircuit(getNodes, getEdges);
    setIsSavePopupOpen(false);
  };

  const handleSaveAsImage = () => {
    saveCircuitAsImage('circuitCanvas');
    setIsSavePopupOpen(false);
  };

  const handleImportCircuit = () => {
    importCircuit(setNodes, setEdges);
    //setIsSavePopupOpen(false);
  };

  const handleSave = (option) => {
    console.log(`Selected save option: ${option}`);
  };

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
                className="header-button"
                aria-label="Import"
              >
                <ImportIcon className="header-icon" />
              </button>

              <button 
                className="header-button"
                aria-label="Save"
                onClick={() => setIsSavePopupOpen(true)}
              >
                <SaveIcon className="header-icon" />
              </button>

              {isSaveModalOpen && (
                <SaveButton 
                  onSave={handleSave} 
                  onClose={() => setIsSaveModalOpen(false)}
                />
              )}

              <button 
                className="header-button"
                aria-label="Truth Table"
                onClick={onTruthTableClick}
              >
                <TableIcon className="header-icon" />
              </button>

              <button 
                className="header-button"
                aria-label="Toggle Theme"
                onClick={() => setIsDarkMode(!isDarkMode)}
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

      {isSavePopupOpen && (
        <div className="save-popup">
          <div className="save-popup-content">
            <h3 className="save-popup-title">Save Options</h3>
            <button className="save-option-button" onClick={handleSaveAsFile}>Save as File</button>
            <button className="save-option-button" onClick={handleSaveAsImage}>Save as Image</button>
            <button className="close-button" onClick={() => setIsSavePopupOpen(false)}>Close</button>
          </div>
        </div>
      )}

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
  getNodes: PropTypes.func.isRequired,
  getEdges: PropTypes.func.isRequired,
  onTruthTableClick: PropTypes.func.isRequired,
};

export default Header;