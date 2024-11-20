import React, { useState } from 'react';
import { createInputNode, createOutputNode } from '../utils/nodeHandlers';
import { saveCircuit } from '../utils/circuitOperations';
import LogicGateDrawer from './LogicGateDrawer';
import PropTypes from 'prop-types';

const ControlPanel = ({ addGateNode }) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleAddInput = (type) => {
    const newNode = createInputNode(type, setNodes);
    addGateNode(newNode);
  };

  const handleAddOutput = (type) => {
    const newNode = createOutputNode(type);
    addGateNode(newNode);
  };

  const handleSaveCircuit = () => {
    const result = saveCircuit(getNodes, getEdges);
    alert(result.message);
  };

  return (
    <>
      <LogicGateDrawer 
        isOpen={isDrawerOpen} 
        onClose={() => setIsDrawerOpen(false)}
        addGateNode={addGateNode}
        handleAddInput={handleAddInput}    // Pass the function
        handleAddOutput={handleAddOutput}  // Pass the function
      />
    </>
  );
};

ControlPanel.propTypes = {
  addGateNode: PropTypes.func.isRequired,
};

export default ControlPanel; 