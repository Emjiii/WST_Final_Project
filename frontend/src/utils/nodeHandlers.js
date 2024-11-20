export const createInputNode = (type, setNodes) => {
  const nodeId = `${type}-${Date.now()}`;
  
  const inputTypes = {
    switch: {
      nodeType: 'switch',
      label: 'Toggle Switch',
      initialState: false,
      setValue: (newValue) => updateNodeValue(nodeId, newValue, setNodes)
    },
    button: {
      nodeType: 'button',
      label: 'Push Button',
      initialState: false,
      setValue: (newValue) => updateNodeValue(nodeId, newValue, setNodes)
    },
  };

  return {
    id: nodeId,
    type: inputTypes[type].nodeType,
    position: { x: Math.random() * 500, y: Math.random() * 300 },
    data: {
      label: inputTypes[type].label,
      value: inputTypes[type].initialState,
      setValue: inputTypes[type].setValue
    }
  };
};

export const createOutputNode = (type) => {
  const outputTypes = {
    'led': {
      id: `led-${Date.now()}`,
      type: 'ledOutput',
      label: 'LED Output'
    },
    'rgb': {
      id: `rgb-${Date.now()}`,
      type: 'rgbLedOutput',
      label: 'RGB LED'
    }
  };

  const selectedOutput = outputTypes[type];
  
  return {
    id: selectedOutput.id,
    type: selectedOutput.type,
    position: { x: Math.random() * 500, y: Math.random() * 300 },
    data: {
      label: selectedOutput.label,
      value: false
    }
  };
};

const updateNodeValue = (nodeId, newValue, setNodes) => {
  if (setNodes) {
    setNodes((nds) =>
      nds.map((node) => {
        if (node.id === nodeId) {
          return {
            ...node,
            data: {
              ...node.data,
              value: newValue
            }
          };
        }
        return node;
      })
    );
  }
}; 