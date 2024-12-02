import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { TableIcon, SunIcon, MoonIcon, MenuIcon, SaveIcon, ImportIcon, FolderIcon } from './icons/HeaderIcons';
import LogicGateDrawer from './LogicGateDrawer';
import SaveButton from './SaveButton';
import '../styles/header.css';
import { saveCircuit, saveCircuitAsImage, importCircuit } from '../utils/circuitOperations';
import { useAuth } from "./auth/authContext";
import AuthModal from "./AuthModal";
import { saveToFireBase } from "../utils/store";
import FolderSave from './FolderSave';

  const Header = ({ addGateNode, isDarkMode, setIsDarkMode, onTruthTableClick, onFolderClick, getNodes, getEdges, setNodes, setEdges }) => {

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const [isSaveModalOpen, setIsSaveModalOpen] = useState(false);
  const [nodes, setNodesState] = useState([]);
  const [edges, setEdgesState] = useState([]);

  const { userLoggedIn } = useAuth();

  const [isModalOpen, setModalOpen] = useState(false);

  const [isTableOpen, setTableOpen] = useState(false);
  const [modalType, setModalType] = useState('');  // 'folder' or 'table'

  useEffect(() => {
    console.log('Nodes or edges have changed:', { nodes, edges });
  }, [nodes, edges]);

  const handleImportCircuit = () => {
    importCircuit(setNodes, setEdges);
  };

  const handleSave = (option) => {
    try {
      if (option === 'file') {
        saveCircuit(getNodes, getEdges);
      } else if (option === 'image') {
        saveCircuitAsImage('circuitCanvas');
      } else if (option=='saveOnDatabase'){
        saveToFireBase(getEdges, getEdges);
      }
      setIsSaveModalOpen(false);
    } catch (error) {
      console.error('Error in handleSave:', error);
    }
  };

  const handleTruthTableClick = () => {
    setModalType('table');
    setTableOpen(true);
  };

  const handleFolderClick = () => {
    setModalType('folder');
    setTableOpen(true);
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
                <a href="/" className="header-title">
                  <h1>GateWorks Simulator</h1>
                </a>
              </div>
            </div>

            {/* Right section */}
            <div className="header-right">
              
            <button 
                className="header-button"
                aria-label="Open Folder"
                onClick={onFolderClick}
              >
                <FolderIcon className="header-icon" />
              </button>
              <button
                className="header-button"
                aria-label="Import"
                onClick={handleImportCircuit}
              >
                <ImportIcon className="header-icon" />
              </button>

            {/*Save*/}
              <button 
                className="header-button"
                aria-label="Save Project"
                onClick={() => {
                  if (!userLoggedIn) {
                    setModalOpen(true) // Show login modal if not logged in
                    if (userLoggedIn){
                      setModalOpen(false)
                    }
                  } else {
                    setIsSaveModalOpen(true); // Open save modal if logged in
                  }
                }}
              >
                <SaveIcon className="header-icon" />
              </button> 

              {isSaveModalOpen && (
                <SaveButton 
                  onClose={() => setIsSaveModalOpen(false)}
                  onSave={handleSave}
                  getNodes={getNodes}
                  getEdges={getEdges}
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

      <AuthModal isOpen={isModalOpen} onClose={() => setModalOpen(false)} />

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
  onFolderClick: PropTypes.func.isRequired,
};

export default Header;