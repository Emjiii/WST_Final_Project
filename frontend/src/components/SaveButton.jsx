import React from 'react';
import styles from '../styles/SaveButton.module.css';

const SaveButton = ({ onSave, onClose }) => {
  const handleSaveOption = (option) => {
    onSave(option);
    onClose();
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
            onClick={() => handleSaveOption('file')}
          >
            Save as File
          </button>
          <button 
            className={`${styles.modalButton} ${styles.saveImageBtn}`}
            onClick={() => handleSaveOption('image')}
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

export default SaveButton; 