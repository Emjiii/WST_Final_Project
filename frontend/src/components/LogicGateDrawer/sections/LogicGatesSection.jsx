import React from 'react';
import PropTypes from 'prop-types';
import {
  AndGateIcon,
  NandGateIcon,
  OrGateIcon,
  NorGateIcon,
  XorGateIcon,
  XnorGateIcon,
  NotGateIcon,
  BufferGateIcon
} from '../../icons/HeaderIcons';

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
            <AndGateIcon className="h-8 w-8" />
          </div>
          <span className="gate-label">AND Gate</span>
        </div>
      </div>

      <div onClick={() => handleGateClick('nand')}>
        <div className="logic-gate-card" role="button" tabIndex={0}>
          <div className="gate-icon-container">
            <NandGateIcon className="h-8 w-8" />
          </div>
          <span className="gate-label">NAND Gate</span>
        </div>
      </div>

      <div onClick={() => handleGateClick('or')}>
        <div className="logic-gate-card" role="button" tabIndex={0}>
          <div className="gate-icon-container">
            <OrGateIcon className="h-8 w-8" />
          </div>
          <span className="gate-label">OR Gate</span>
        </div>
      </div>

      <div onClick={() => handleGateClick('nor')}>
        <div className="logic-gate-card" role="button" tabIndex={0}>
          <div className="gate-icon-container">
            <NorGateIcon className="h-8 w-8" />
          </div>
          <span className="gate-label">NOR Gate</span>
        </div>
      </div>

      <div onClick={() => handleGateClick('xor')}>
        <div className="logic-gate-card" role="button" tabIndex={0}>
          <div className="gate-icon-container">
            <XorGateIcon className="h-8 w-8" />
          </div>
          <span className="gate-label">XOR Gate</span>
        </div>
      </div>

      <div onClick={() => handleGateClick('xnor')}>
        <div className="logic-gate-card" role="button" tabIndex={0}>
          <div className="gate-icon-container">
            <XnorGateIcon className="h-8 w-8" />
          </div>
          <span className="gate-label">XNOR Gate</span>
        </div>
      </div>

      <div onClick={() => handleGateClick('not')}>
        <div className="logic-gate-card" role="button" tabIndex={0}>
          <div className="gate-icon-container">
            <NotGateIcon className="h-8 w-8" />
          </div>
          <span className="gate-label">NOT Gate</span>
        </div>
      </div>

      <div onClick={() => handleGateClick('buffer')}>
        <div className="logic-gate-card" role="button" tabIndex={0}>
          <div className="gate-icon-container">
            <BufferGateIcon className="h-8 w-8" />
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