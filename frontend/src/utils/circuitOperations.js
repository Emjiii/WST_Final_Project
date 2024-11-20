export const saveCircuit = (getNodes, getEdges) => {
    const circuitData = {
      nodes: getNodes(),
      edges: getEdges(),
      timestamp: new Date().toISOString(),
    };
  
    try {
      localStorage.setItem('saved-circuit', JSON.stringify(circuitData));
      return { success: true, message: 'Circuit saved successfully!' };
    } catch (error) {
      return { success: false, message: 'Failed to save circuit: ' + error.message };
    }
  }; 