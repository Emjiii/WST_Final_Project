import React from 'react';
import PropTypes from 'prop-types';

const InputComponentsSection = ({ expandedSections, toggleSection, handleGateClick }) => (
  <div className="drawer-section">
    <button 
      className="section-title-button"
      onClick={() => toggleSection('inputComponents')}
      type="button"
    >
      <h3 className="section-title">Input Components</h3>
      <span className={`section-arrow ${expandedSections.inputComponents ? 'expanded' : ''}`}>
        ▼
      </span>
    </button>
    
    <div className={`gates-grid ${expandedSections.inputComponents ? 'expanded' : 'collapsed'}`}>
      
      {/* Separate click handler from card styling */}
      <div onClick={() => handleGateClick('switch')}>
        <div className="logic-gate-card" role="button" tabIndex={0}>
          <div className="gate-icon-container">
            {/* Add Toggle Switch SVG or image here */}
          </div>
          <span className="gate-label">Toggle Switch</span>
        </div>
      </div>

      <div onClick={() => handleGateClick('button')}>
        <div className="logic-gate-card" role="button" tabIndex={0}>
          <div className="gate-icon-container">
            {/* Add Push Button SVG or image here */}
          </div>
          <span className="gate-label">Push Button</span>
        </div>
      </div>
    </div>
  </div>
);

InputComponentsSection.propTypes = {
  expandedSections: PropTypes.object.isRequired,
  toggleSection: PropTypes.func.isRequired,
  handleGateClick: PropTypes.func.isRequired,
};

export default InputComponentsSection; 