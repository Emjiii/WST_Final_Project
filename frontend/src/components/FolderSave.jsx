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
              <td className={styles.valueCell}>Example Circuit</td>
              <td className={styles.valueCell}>2024-03-21</td>
              <td className={styles.valueCell}>
                <button className={styles.actionButton}>Load</button>
                <button className={styles.actionButton}>Delete</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FolderSave; 