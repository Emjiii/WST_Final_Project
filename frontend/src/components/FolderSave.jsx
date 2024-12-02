import React, { useState, useEffect } from 'react';
import styles from '../styles/FolderPanel.module.css';
import { useDarkMode } from '../utils/useDarkMode';
import { auth } from './auth/firebase/firebaseConfig';
import { listUserFiles, loadFromFirebase } from '../utils/store';

const FolderSave = ({ isVisible, onClose, onLoadCircuit, setNodes, setEdges }) => {
  const [isDarkMode] = useDarkMode();
  const [isExiting, setIsExiting] = useState(false);
  const [shouldRender, setShouldRender] = useState(isVisible);

  const [files, setFiles] = useState([]);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    // Check if user is authenticated and set userId
    const currentUser = auth.currentUser;
    if (currentUser) {
      setUserId(currentUser.uid);
    } else {
      console.error('User is not authenticated');
    }
  }, []);

  useEffect(() => {
    if (isVisible && userId) {
      setShouldRender(true);
      setIsExiting(false);

      // Fetch saved files from database once the component is visible and userId is available
      const fetchFiles = async () => {
        try {
          const fileList = await listUserFiles(userId);
          setFiles(fileList);
        } catch (error) {
          console.error('Error fetching files:', error);
        }
      };

      fetchFiles();
    } else {
      setIsExiting(true);
      const timer = setTimeout(() => {
        setShouldRender(false);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [isVisible, userId]);

  const handleLoad = async (fileName) => {
    if (typeof onLoadCircuit !== 'function') {
      console.error('onLoadCircuit is not a function.');
      return;
    }

    if (!userId) {
      console.error('User is not authenticated, cannot load circuit.');
      return;
    }

    try {
      const circuit = await loadFromFirebase(userId, fileName, setNodes, setEdges);
      if (circuit) {
        onLoadCircuit(circuit); // Pass the loaded circuit data to the parent
      } else {
        console.log('No circuit data to load.');
      }
    } catch (error) {
      console.error('Error loading circuit:', error);
    }
  };

  if (!shouldRender) return null;

  return (
    <div
      className={`${styles.folderContainer} ${isExiting ? styles.slideOut : styles.slideIn} ${isDarkMode ? 'dark' : ''}`}
      style={{
        transformStyle: 'preserve-3d',
        perspective: '2000px',
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
              <th className={styles.headerCell}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {files.length > 0 ? (
              files.map((file, index) => (
                <tr key={index} className={styles.tableRow}>
                  <td className={styles.valueCell}>{file}</td>
                  <td className={styles.valueCell}>
                    <button className={styles.actionButton} onClick={() => handleLoad(file)}>
                      Load
                    </button>
                    {/* Add delete logic if required */}
                  </td>
                </tr>
              ))
            ) : (
              <tr className={styles.tableRow}>
                <td className={styles.valueCell} colSpan={2}>
                  No saved circuits found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <button className={styles.closeButton} onClick={onClose}>
        Close
      </button>
    </div>
  );
};

export default FolderSave;
