import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import styles from '../styles/TruthTable.module.css';
import { useDarkMode } from '../utils/useDarkMode';

const TruthTable = ({ isVisible, nodes, edges }) => {
  const [isDarkMode] = useDarkMode();
  const [isExiting, setIsExiting] = useState(false);
  const [shouldRender, setShouldRender] = useState(isVisible);
  const [truthTableData, setTruthTableData] = useState({ inputs: [], outputs: [], rows: [] });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Memoize the nodes and edges to prevent unnecessary re-renders
  const memoizedNodes = useMemo(() => nodes, [JSON.stringify(nodes)]);
  const memoizedEdges = useMemo(() => edges, [JSON.stringify(edges)]);

  useEffect(() => {
    if (isVisible && memoizedNodes.length > 0) {
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
  }, [isVisible, memoizedNodes, memoizedEdges]);
  
  const fetchTruthTable = async () => {
    setLoading(true);
    setError(null);
    try {
      // Ensure all input nodes have a value, with a more robust check
      const processedNodes = memoizedNodes.map(node => {
        if (node.type.includes('input')) {
          return {
            ...node,
            data: {
              ...node.data,
              value: node.data.value ?? false // Default to false if undefined
            }
          };
        }
        return node;
      });
  
      const response = await axios.post('http://localhost:3000/truth-table/circuit', { 
        nodes: processedNodes,
        edges: memoizedEdges
      }, {
        // Add a timeout to prevent indefinite loading
        timeout: 5000
      });
  
      const truthTable = response.data;
  
      if (truthTable && truthTable.length > 0) {
        setTruthTableData({
          inputs: processedNodes
            .filter(node => node.type.includes('input'))
            .map(node => node.id),
          outputs: processedNodes
            .filter(node => 
              node.type.includes('Output') || 
              node.type === 'ledOutput' || 
              node.type === 'speakerOutput'
            )
            .map(node => node.id),
          rows: truthTable
        });
      } else {
        setTruthTableData({ inputs: [], outputs: [], rows: [] });
      }
    } catch (error) {
      setError(`Failed to generate truth table: ${error.message}`);
      console.error('Truth Table Error:', error);
    } finally {
      setLoading(false);
    }
  };
  
  const generateTruthTable = () => {
    const { inputs = [], outputs = [], rows = [] } = truthTableData;
  
    if (loading) return <p className="text-center p-4">Loading truth table...</p>;
    if (error) return <p className="text-red-500 text-center p-4">{error}</p>;
    if (!rows.length) return <p className="text-center p-4">No data available</p>;
    
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