import React from 'react';
import PropTypes from 'prop-types';
import { LedIcon, RgbLedIcon, SpeakerIcon } from '../../icons/HeaderIcons';

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
      <div onClick={() => handleGateClick('ledOutput')}>
        <div className="logic-gate-card" role="button" tabIndex={0}>
          <div className="gate-icon-container">
            <LedIcon className="h-8 w-8" />
          </div>
          <span className="gate-label">LED Light</span>
        </div>
      </div>

      {/* RGB LED */}
      <div onClick={() => handleGateClick('rgbLedOutput')}>
        <div className="logic-gate-card" role="button" tabIndex={0}>
          <div className="gate-icon-container">
            <RgbLedIcon className="h-8 w-8" />
          </div>
          <span className="gate-label">RGB LED</span>
        </div>
      </div>

      {/* Speaker Output */}
      <div onClick={() => handleGateClick('speakerOutput')}>
        <div className="logic-gate-card" role="button" tabIndex={0}>
          <div className="gate-icon-container">
            <SpeakerIcon className="h-8 w-8" />
          </div>
          <span className="gate-label">Speaker</span>
        </div>
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