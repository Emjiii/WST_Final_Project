import React, { useState, useEffect } from 'react';
import styles from '../styles/FolderPanel.module.css';
import { useDarkMode } from '../utils/useDarkMode';

const FolderSave = ({ isVisible, onClose }) => {
  const [isDarkMode] = useDarkMode();
  const [isExiting, setIsExiting] = useState(false);
  const [shouldRender, setShouldRender] = useState(isVisible);

  useEffect(() => {
    if (isVisible) {
      setShouldRender(true);
      setIsExiting(false);
    } else {
      setIsExiting(true);
      const timer = setTimeout(() => {
        setShouldRender(false);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [isVisible]);

  const handleLoadCircuit = (circuitName) => {
    console.log(`Loading circuit: ${circuitName}`);
  };

  const handleDeleteCircuit = (circuitName) => {
    console.log(`Deleting circuit: ${circuitName}`);
  };

  if (!shouldRender) return null;

  return (
    <div 
      className={`
        ${styles.folderContainer} 
        ${isExiting ? styles.slideOut : styles.slideIn}
        ${isDarkMode ? 'dark' : ''}
      `}
      style={{ 
        transformStyle: 'preserve-3d',
        perspective: '2000px'
      }}
    >
      <div className={styles.titleWrapper}>
        <h3 className={styles.title}>Saved Circuits</h3>
      </div>
      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr className={styles.headerRow}>
              <th className={styles.headerCell}>Circuit Name</th>
              <th className={styles.headerCell}>Last Modified</th>
              <th className={styles.headerCell}>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr className={styles.tableRow}>
              <td className={styles.valueCell}>Example Circuit 1</td>
              <td className={styles.valueCell}>2024-03-21</td>
              <td className={styles.actionCell}>
                <button 
                  className={styles.actionButton} 
                  onClick={() => handleLoadCircuit('Example Circuit 1')}
                >
                  Load
                </button>
                <button 
                  className={styles.actionButton} 
                  onClick={() => handleDeleteCircuit('Example Circuit 1')}
                >
                  Delete
                </button>
              </td>
            </tr>
            <tr className={styles.tableRow}>
              <td className={styles.valueCell}>Example Circuit 2</td>
              <td className={styles.valueCell}>2024-03-22</td>
              <td className={styles.actionCell}>
                <button 
                  className={styles.actionButton} 
                  onClick={() => handleLoadCircuit('Example Circuit 2')}
                >
                  Load
                </button>
                <button 
                  className={styles.actionButton} 
                  onClick={() => handleDeleteCircuit('Example Circuit 2')}
                >
                  Delete
                </button>
              </td>
            </tr>
            <tr className={styles.tableRow}>
              <td className={styles.valueCell}>Example Circuit 3</td>
              <td className={styles.valueCell}>2024-03-23</td>
              <td className={styles.actionCell}>
                <button 
                  className={styles.actionButton} 
                  onClick={() => handleLoadCircuit('Example Circuit 3')}
                >
                  Load
                </button>
                <button 
                  className={styles.actionButton} 
                  onClick={() => handleDeleteCircuit('Example Circuit 3')}
                >
                  Delete
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FolderSave; 