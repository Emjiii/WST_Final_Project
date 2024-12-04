import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import styles from '../styles/TruthTable.module.css';
import { useDarkMode } from '../utils/useDarkMode';

const TruthTable = ({ isVisible, nodes, edges }) => {
  const backendURL = import.meta.env.VITE_BACKEND_URL;
  const [isDarkMode] = useDarkMode();
  const [isExiting, setIsExiting] = useState(false);
  const [shouldRender, setShouldRender] = useState(isVisible);
  const [truthTableData, setTruthTableData] = useState({ inputs: [], outputs: [], rows: [] });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (isVisible) {
      setShouldRender(true);
      setIsExiting(false);
      fetchTruthTable();
    } else {
      setIsExiting(true);
      const timer = setTimeout(() => {
        setShouldRender(false);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [isVisible, nodes, edges]);

  const fetchTruthTable = async () => {
    setLoading(true);
    setError(null);
    try {
      console.log('Sending nodes:', nodes);
      console.log('Sending edges:', edges);
      console.log('Payload:', { nodes, edges });

      const inputNodes = nodes
        .filter(node => node.type.includes('input'))
        .map(({ id, type, data}) => ({ id, type, data}));

      const outputNodes = nodes
        .filter(node => node.type.includes('Output') || node.type === 'ledOutput' || node.type === 'speakerOutput')
        .map(({ id, type, data }) => ({ id, type, data }));
      console.log('Input Nodes:', inputNodes);
      console.log('Output Nodes:', outputNodes);

      const response = await axios.post(`${backendURL}/truth-table/circuit`, { nodes, edges });
      const truthTable = response.data;
      console.log('Fetched Truth Table:', truthTable);
  
      if (truthTable.length > 0) {
        setTruthTableData({
          inputs: nodes.filter(node => node.type.includes('input')).map(node => node.id),
          outputs: nodes.filter(node => node.type.includes('Output') || node.type === 'ledOutput' || node.type === 'speakerOutput').map(node => node.id),
          rows: truthTable.map(entry => ({
            inputs: entry.inputs,
            outputs: entry.outputs
          }))
        });
        console.log('Truth Table Data:', truthTableData);
      } else {
        setTruthTableData({ inputs: [], outputs: [], rows: [] });
      }
    } catch (error) {
      console.error('Error fetching truth table from backend:', error);
      setError('Failed to fetch truth table data.');
    } finally {
      setLoading(false);
    }
  };
  
  const generateTruthTable = () => {
    const { inputs = [], outputs = [], rows = [] } = truthTableData;
  
    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;
    if (!rows.length) return <p>No data available</p>;

    return (
      <div className={`${styles.tableWrapper} ${isDarkMode ? 'dark' : ''}`}>
        <div className="overflow-x-auto">
          <table className={styles.table}>
            <thead>
              <tr className={styles.headerRow}>
                {inputs.map((input, idx) => (
                  <th key={idx} className={styles.headerCell}>
                    {input}
                  </th>
                ))}
                {outputs.map((output, idx) => (
                  <th key={idx} className={styles.headerCell}>
                    {output}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row, idx) => (
                <tr key={idx} className={styles.tableRow}>
                  {row.inputs.map((value, valueIdx) => (
                    <td key={valueIdx} className={styles.valueCell}>
                      {value}
                    </td>
                  ))}
                  {row.outputs.map((value, valueIdx) => (
                    <td key={valueIdx} className={styles.valueCell}>
                      {value}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  if (!shouldRender) return null;

  return (
    <div 
      className={`
        ${styles.truthTableContainer} 
        ${isExiting ? styles.slideOut : styles.slideIn}
        ${isDarkMode ? 'dark' : ''}
      `}
      style={{ 
        transformStyle: 'preserve-3d',
        perspective: '2000px'
      }}
    >
      <div className={styles.titleWrapper}>
        <h3 className={styles.title}>Truth Table</h3>
      </div>
      {loading ? <p>Loading...</p> : error ? <p>{error}</p> : generateTruthTable()}
    </div>
  );
};

export default TruthTable;