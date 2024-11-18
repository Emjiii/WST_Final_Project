import React from 'react';
import PropTypes from 'prop-types';

const OutputComponentsSection = ({ expandedSections, toggleSection, handleGateClick }) => (
  <div className="drawer-section">
    <button 
      className="section-title-button"
      onClick={() => toggleSection('outputComponents')}
      type="button"
    >
      <h3 className="section-title">Output Components</h3>
      <span className={`section-arrow ${expandedSections.outputComponents ? 'expanded' : ''}`}>
        ▼
      </span>
    </button>
    
    <div className={`gates-grid ${expandedSections.outputComponents ? 'expanded' : 'collapsed'}`}>
      {/* LED Light */}
      <div 
        className="logic-gate-card"
        onClick={() => handleGateClick('ledOutput')}
        role="button"
        tabIndex={0}
      >
        <div className="gate-icon-container">
          {/* Add LED Light SVG or image here */}
        </div>
        <span className="gate-label">LED Light</span>
      </div>

      {/* RGB LED */}
      <div 
        className="logic-gate-card"
        onClick={() => handleGateClick('rgbLedOutput')}
        role="button"
        tabIndex={0}
      >
        <div className="gate-icon-container">
          {/* Add RGB LED SVG or image here */}
        </div>
        <span className="gate-label">RGB LED</span>
      </div>
    </div>
  </div>
);

OutputComponentsSection.propTypes = {
  expandedSections: PropTypes.object.isRequired,
  toggleSection: PropTypes.func.isRequired,
  handleGateClick: PropTypes.func.isRequired,
};

export default OutputComponentsSection; 