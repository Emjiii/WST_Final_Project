import React, { useState, useEffect, useMemo } from 'react';
import styles from '../styles/TruthTable.module.css';
import { useDarkMode } from '../utils/useDarkMode';

const TruthTable = ({ isVisible, nodes, edges }) => {
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

  const { inputNodes, outputNodes } = useMemo(() => {
    const inputs = nodes.filter(node => node.type?.includes('Input'))
      .sort((a, b) => (a.data.label || '').localeCompare(b.data.label || ''));
    const outputs = nodes.filter(node => node.type?.includes('Output'))
      .sort((a, b) => (a.data.label || '').localeCompare(b.data.label || ''));
    return { inputNodes: inputs, outputNodes: outputs };
  }, [nodes]);


  // part to add the logic of truth table
  //just added sample for testing 
  const generateTruthTable = () => {
    // For testing AND gate
    const testInputNodes = [
      { id: '1', type: 'inputNode', data: { label: 'A' } },
      { id: '2', type: 'inputNode', data: { label: 'B' } }
    ];
    
    const testOutputNodes = [
      { id: '3', type: 'andGate', data: { label: 'AND_OUT' } }
    ];

    // Generate all possible input combinations for 2 inputs
    const combinations = [
      [0, 0],
      [0, 1],
      [1, 0],
      [1, 1]
    ];

    // Function to calculate AND gate output
    const calculateANDOutput = (inputs) => {
      return inputs[0] && inputs[1] ? 1 : 0;
    };

    return (
      <div className={`${styles.tableWrapper} ${isDarkMode ? 'dark' : ''}`}>
        <div className="overflow-x-auto">
          <table className={styles.table}>
            <thead>
              <tr className={styles.headerRow}>
                {/* Input Headers */}
                {testInputNodes.map(node => (
                  <th key={node.id} className={styles.headerCell}>
                    {node.data.label}
                  </th>
                ))}
                {/* Output Header */}
                {testOutputNodes.map(node => (
                  <th key={node.id} className={styles.headerCell}>
                    {node.data.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {combinations.map((combination, idx) => (
                <tr 
                  key={idx} 
                  className={styles.tableRow}
                  style={{ animationDelay: `${idx * 0.05}s` }}
                >
                  {/* Input Values */}
                  {combination.map((value, valueIdx) => (
                    <td 
                      key={valueIdx}
                      className={styles.valueCell}
                      data-value={value}
                    >
                      {value}
                    </td>
                  ))}
                  {/* Output Value */}
                  <td 
                    className={styles.valueCell}
                    data-value={calculateANDOutput(combination)}
                  >
                    {calculateANDOutput(combination)}
                  </td>
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
      {generateTruthTable()}
    </div>
  );
};

export default TruthTable; 