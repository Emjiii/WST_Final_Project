// src/components/ControlPanel.jsx

import React, { useState } from 'react';
import '../styles/modern.css';
// Import icons (assuming you're using the same icons)
import gateIcon from '../assets/icons/gateIcon.png';
import arrowhead from '../assets/icons/arrowhead.png';
import bulbOff from '../assets/icons/bulbOff.png';
import powerSwitch from '../assets/icons/power-switch.png';
import download from '../assets/icons/download.png';
import theme from '../assets/icons/theme.png';

const ControlPanel = ({ addGateNode }) => {
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [showCustomization, setShowCustomization] = useState(false);

  const gates = [
    { type: 'andNode', label: 'AND Gate', description: 'Output is HIGH only when all inputs are HIGH' },
    { type: 'nandNode', label: 'NAND Gate', description: 'Inverse of AND gate' },
    { type: 'orNode', label: 'OR Gate', description: 'Output is HIGH when any input is HIGH' },
    { type: 'norNode', label: 'NOR Gate', description: 'Inverse of OR gate' },
    { type: 'xorNode', label: 'XOR Gate', description: 'Output is HIGH when inputs are different' },
    { type: 'xnorNode', label: 'XNOR Gate', description: 'Output is HIGH when inputs are the same' },
    { type: 'notNode', label: 'NOT Gate', description: 'Inverts the input' },
    { type: 'bufferNode', label: 'BUFFER Gate', description: 'Maintains the input signal' }
  ];

  return (
    <div className={`simulator-container ${isDarkMode ? 'dark-mode' : ''}`}>
      {/* Modern Header */}
      <header className="modern-header">
        <div className="header-content">
          <h1>Logic Gate Simulator</h1>
          <div className="header-actions">
            <button className="theme-toggle" onClick={() => setIsDarkMode(!isDarkMode)}>
              {isDarkMode ? '☀️' : '🌙'}
            </button>
          </div>
        </div>
      </header>

      {/* Main Workspace */}
      <main className="workspace">
        {/* Side Toolbar */}
        <div className="side-toolbar">
          {gates.map(gate => (
            <div className="gate-card" key={gate.type} onClick={() => addGateNode(gate.type)}>
              <div className="gate-icon">
                <img src={gateIcon} alt={gate.label} />
              </div>
              <div className="gate-info">
                <h3>{gate.label}</h3>
                <p>{gate.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Action Bar */}
        <div className="action-bar">
          <div className="tool-group">
            <button className="action-button">
              <img src={powerSwitch} alt="Input" />
              <span>Add Input</span>
            </button>
            <button className="action-button">
              <img src={bulbOff} alt="Output" />
              <span>Add Output</span>
            </button>
            <button className="action-button">
              <img src={download} alt="Save" />
              <span>Save Circuit</span>
            </button>
            <button 
              className={`action-button ${showCustomization ? 'active' : ''}`}
              onClick={() => setShowCustomization(!showCustomization)}
            >
              <img src={theme} alt="Customize" />
              <span>Customize</span>
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ControlPanel;