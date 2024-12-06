import React, { useState } from 'react';
import PropTypes from 'prop-types';
import LogicGatesSection from './LogicGateDrawer/sections/LogicGatesSection';
import InputComponentsSection from './LogicGateDrawer/sections/InputComponentsSection';
import OutputComponentsSection from './LogicGateDrawer/sections/OutputComponentsSection';
import '../styles/drawer.css';

const LogicGateDrawer = ({ isOpen, onClose, addGateNode }) => {
  const [expandedSections, setExpandedSections] = useState({
    logicGates: true,
    inputComponents: true,
    outputComponents: true
  });

  const toggleSection = (sectionName) => {
    setExpandedSections(prev => ({
      ...prev,
      [sectionName]: !prev[sectionName]
    }));
  };

  const handleGateClick = (gateType) => {
    const isInputOutput = ['inputNode', 'inputButton', 'ledOutput','speakerOutput'].includes(gateType);
  
    const nodeType = isInputOutput ? gateType : `${gateType}Node`;
    addGateNode(nodeType);
    onClose();
  };

  return (
    <>
      {/* Backdrop */}
      <div 
        className={`drawer-backdrop ${isOpen ? 'drawer-backdrop-open' : 'drawer-backdrop-closed'}`}
        onClick={onClose}
      />

      {/* Drawer */}
      <div 
        className={`drawer-container ${isOpen ? 'drawer-open' : 'drawer-closed'}`}
      >
        {/* Drawer Header */}
        <div className="drawer-header">
          <h2 className="drawer-title">Circuit Elements</h2>
        </div>

        <LogicGatesSection 
          expandedSections={expandedSections}
          toggleSection={toggleSection}
          handleGateClick={handleGateClick}
        />
        <InputComponentsSection 
          expandedSections={expandedSections}
          toggleSection={toggleSection}
          handleGateClick={handleGateClick}
        />
        <OutputComponentsSection 
          expandedSections={expandedSections}
          toggleSection={toggleSection}
          handleGateClick={handleGateClick}
        />
      </div>
    </>
  );
};

LogicGateDrawer.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  addGateNode: PropTypes.func.isRequired,
};

export default LogicGateDrawer; 