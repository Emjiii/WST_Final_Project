import React from 'react';
import styles from '../styles/SaveButton.module.css';
import PropTypes from 'prop-types';

console.log('SaveButton styles:', styles);

const SaveButton = ({ onClose, onSave, getNodes, getEdges }) => {
  const handleSaveAsFile = () => {
    console.log('onSave called with file option');
    try {
      onSave('file');
      // Modal will be closed by the onSave function
    } catch (error) {
      console.error('Error in handleSaveAsFile:', error);
      onClose(); // Close modal even if there's an error
    }
  };

  const handleSaveAsImage = () => {
    try {
      onSave('image');
      // Modal will be closed by the onSave function
    } catch (error) {
      console.error('Error in handleSaveAsImage:', error);
      onClose(); // Close modal even if there's an error
    }
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <div className={styles.modalHeader}>
          <h2 className={styles.modalTitle}>Save Options</h2>
        </div>
        <div className={styles.modalBody}>
          <button 
            className={`${styles.modalButton} ${styles.saveFileBtn}`}
            onClick={handleSaveAsFile}
          >
            Save as File
          </button>
          <button 
            className={`${styles.modalButton} ${styles.saveImageBtn}`}
            onClick={handleSaveAsImage}
          >
            Save as Image
          </button>
          <button 
            className={`${styles.modalButton} ${styles.closeButton}`}
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

SaveButton.propTypes = {
  onClose: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  getNodes: PropTypes.func.isRequired,
  getEdges: PropTypes.func.isRequired
};

export default SaveButton; 