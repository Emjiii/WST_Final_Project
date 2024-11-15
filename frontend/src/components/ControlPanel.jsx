// src/components/ControlPanel.jsx

import React, { useState } from 'react';
import '../styles/ControlPanel.css';
// Import icons (assuming you're using the same icons)
import gateIcon from '../assets/icons/gateIcon.png';
import arrowhead from '../assets/icons/arrowhead.png';
import bulbOff from '../assets/icons/bulbOff.png';
import powerSwitch from '../assets/icons/power-switch.png';
import download from '../assets/icons/download.png';
import theme from '../assets/icons/theme.png';
import PushButton from './inputs/PushButton';
import LedOutput from './outputs/LedOutput';

const ControlPanel = ({ addGateNode, setNodes }) => {
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [showCustomization, setShowCustomization] = useState(false);
  const [showInputMenu, setShowInputMenu] = useState(false);
  const [showOutputMenu, setShowOutputMenu] = useState(false);

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

  // Input options handling
  const handleAddInput = (type) => {
    const nodeId = `${type}-${Date.now()}`;
    const inputTypes = {
      switch: {
        nodeType: 'inputSwitch',
        label: 'Toggle Switch',
        initialState: false,
        setValue: (newValue) => {
          if (setNodes) {
            setNodes((nds) =>
              nds.map((node) => {
                if (node.id === nodeId) {
                  return {
                    ...node,
                    data: {
                      ...node.data,
                      value: newValue
                    }
                  };
                }
                return node;
              })
            );
          }
        }
      },
      button: {
        nodeType: 'inputButton',
        label: 'Push Button',
        initialState: false,
        setValue: (newValue) => {
          if (setNodes) {
            setNodes((nds) =>
              nds.map((node) => {
                if (node.id === nodeId) {
                  return {
                    ...node,
                    data: {
                      ...node.data,
                      value: newValue
                    }
                  };
                }
                return node;
              })
            );
          }
        }
      },
      clock: {
        nodeType: 'inputClock',
        label: 'Clock Signal',
        initialState: false
      }
    };

    const newNode = {
      id: nodeId,
      type: inputTypes[type].nodeType,
      position: { 
        x: Math.random() * 500, 
        y: Math.random() * 300 
      },
      data: {
        label: inputTypes[type].label,
        value: inputTypes[type].initialState,
        setValue: inputTypes[type].setValue
      }
    };

    addGateNode(newNode);
    setShowInputMenu(false);
  };

  // Output options handling
  const handleAddOutput = (type) => {
    const outputTypes = {
        'led': {
            id: `led-${Date.now()}`,
            type: 'ledOutput',
            label: 'LED Output'
        },
        'rgb': {
            id: `rgb-${Date.now()}`,
            type: 'rgbLedOutput',
            label: 'RGB LED'
        }
    };

    const selectedOutput = outputTypes[type];
    
    const newNode = {
        id: selectedOutput.id,
        type: selectedOutput.type,
        position: { x: Math.random() * 500, y: Math.random() * 300 },
        data: {
            label: selectedOutput.label,
            value: false
        }
    };

    addGateNode(newNode);
    setShowOutputMenu(false);
  };

  // Save circuit handling
  const handleSaveCircuit = () => {
    const circuitData = {
      nodes: getNodes(),
      edges: getEdges(),
      timestamp: new Date().toISOString(),
    };

    try {
      localStorage.setItem('saved-circuit', JSON.stringify(circuitData));
      alert('Circuit saved successfully!');
    } catch (error) {
      alert('Failed to save circuit: ' + error.message);
    }
  };

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
            <div className="input-button-container">
              <button 
                className="action-button"
                onClick={() => setShowInputMenu(!showInputMenu)}
              >
                <img src={powerSwitch} alt="Input" />
                <span>Add Input</span>
              </button>
              
              {/* Input Options Menu */}
              {showInputMenu && (
                <div className="options-menu">
                  <button onClick={() => handleAddInput('switch')}>
                    Toggle Switch
                  </button>
                  <button onClick={() => handleAddInput('button')}>
                    Push Button
                  </button>
                  <button onClick={() => handleAddInput('clock')}>
                    Clock Signal
                  </button>
                </div>
              )}
            </div>

            <div className="output-button-container">
              <button 
                className="action-button"
                onClick={() => setShowOutputMenu(!showOutputMenu)}
              >
                <img src={bulbOff} alt="Output" />
                <span>Add Output</span>
              </button>

              {/* Output Options Menu */}
              {showOutputMenu && (
                <div className="options-menu">
                  <button onClick={() => handleAddOutput('led')}>
                    LED Light
                  </button>
                  <button onClick={() => handleAddOutput('rgb')}>
                    RGB LED
                  </button>
                  <button onClick={() => handleAddOutput('buzzer')}>
                    Buzzer
                  </button>
                </div>
              )}
            </div>

            <button 
              className="action-button"
              onClick={handleSaveCircuit}
            >
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