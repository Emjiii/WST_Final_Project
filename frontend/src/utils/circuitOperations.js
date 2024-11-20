import { saveAs } from 'file-saver';

export const saveCircuit = (getNodes, getEdges) => {
    const circuitData = {
        nodes: getNodes(),
        edges: getEdges(),
        timestamp: new Date().toISOString(),
    };

    // Save circuit data as a JSON file
    const saveDataAsFile = (filename) => {
        const blob = new Blob([JSON.stringify(circuitData, null, 2)], { type: 'application/json' });
        saveAs(blob, `${filename}.json`);
    };

    // Prompt user for a filename
    const filename = prompt('Enter a filename for your circuit:');
    if (filename) {
        saveDataAsFile(filename);
    }
}; 