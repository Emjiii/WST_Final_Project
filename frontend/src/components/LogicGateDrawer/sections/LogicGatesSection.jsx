import React from 'react';
import PropTypes from 'prop-types';

const LogicGatesSection = ({ expandedSections, toggleSection, handleGateClick }) => (
  <div className="drawer-section">
    <button 
      className="section-title-button"
      onClick={() => toggleSection('logicGates')}
      type="button"
    >
      <h3 className="section-title">Logic Gates</h3>
      <span className={`section-arrow ${expandedSections.logicGates ? 'expanded' : ''}`}>
        ▼
      </span>
    </button>
    
    <div className={`gates-grid ${expandedSections.logicGates ? 'expanded' : 'collapsed'}`}>
      <div onClick={() => handleGateClick('and')}>
        <div className="logic-gate-card" role="button" tabIndex={0}>
          <div className="gate-icon-container">
            {/* Add AND gate SVG or image here */}
          </div>
          <span className="gate-label">AND Gate</span>
        </div>
      </div>

      <div onClick={() => handleGateClick('nand')}>
        <div className="logic-gate-card" role="button" tabIndex={0}>
          <div className="gate-icon-container">
            {/* Add NAND gate SVG or image here */}
          </div>
          <span className="gate-label">NAND Gate</span>
        </div>
      </div>

      <div onClick={() => handleGateClick('or')}>
        <div className="logic-gate-card" role="button" tabIndex={0}>
          <div className="gate-icon-container">
            {/* Add OR gate SVG or image here */}
          </div>
          <span className="gate-label">OR Gate</span>
        </div>
      </div>

      <div onClick={() => handleGateClick('nor')}>
        <div className="logic-gate-card" role="button" tabIndex={0}>
          <div className="gate-icon-container">
            {/* Add NOR gate SVG or image here */}
          </div>
          <span className="gate-label">NOR Gate</span>
        </div>
      </div>

      <div onClick={() => handleGateClick('xor')}>
        <div className="logic-gate-card" role="button" tabIndex={0}>
          <div className="gate-icon-container">
            {/* Add XOR gate SVG or image here */}
          </div>
          <span className="gate-label">XOR Gate</span>
        </div>
      </div>

      <div onClick={() => handleGateClick('xnor')}>
        <div className="logic-gate-card" role="button" tabIndex={0}>
          <div className="gate-icon-container">
            {/* Add XNOR gate SVG or image here */}
          </div>
          <span className="gate-label">XNOR Gate</span>
        </div>
      </div>

      <div onClick={() => handleGateClick('not')}>
        <div className="logic-gate-card" role="button" tabIndex={0}>
          <div className="gate-icon-container">
            {/* Add NOT gate SVG or image here */}
          </div>
          <span className="gate-label">NOT Gate</span>
        </div>
      </div>

      <div onClick={() => handleGateClick('buffer')}>
        <div className="logic-gate-card" role="button" tabIndex={0}>
          <div className="gate-icon-container">
            {/* Add BUFFER gate SVG or image here */}
          </div>
          <span className="gate-label">BUFFER Gate</span>
        </div>
      </div>
    </div>
  </div>
);

LogicGatesSection.propTypes = {
  expandedSections: PropTypes.object.isRequired,
  toggleSection: PropTypes.func.isRequired,
  handleGateClick: PropTypes.func.isRequired,
};

export default LogicGatesSection; 