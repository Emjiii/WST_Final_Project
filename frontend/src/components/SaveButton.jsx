import React, { useState } from 'react';
import { SaveIcon } from './icons/HeaderIcons';
import styles from '../styles/SaveButton.module.css';

const SaveButton = ({ onSave }) => {
  const [isSaveModalOpen, setIsSaveModalOpen] = useState(false);

  const handleSaveOption = (option) => {
    onSave(option);
    setIsSaveModalOpen(false);
  };

  return (
    <>
      <button 
        className="save-button"
        aria-label="Save Project"
        onClick={() => setIsSaveModalOpen(true)}
      >
        <SaveIcon className="header-icon" />
      </button>

      {isSaveModalOpen && (
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
                onClick={() => setIsSaveModalOpen(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SaveButton; 