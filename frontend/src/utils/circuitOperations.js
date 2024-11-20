import { saveAs } from 'file-saver';
import html2canvas from 'html2canvas';

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

export const saveCircuitAsImage = (circuitElementId) => {
    const circuitElement = document.getElementById(circuitElementId);
    if (!circuitElement) {
        console.error('Circuit element not found');
        return;
    }

    html2canvas(circuitElement, {
        backgroundColor: null, // Set to null to ensure transparency
        scale: 1, // Increase scale for better resolution and larger image size
        useCORS: true, // Enable CORS if needed
        logging: true, // Enable logging for debugging
        allowTaint: true, // Allow cross-origin images to be used
        foreignObjectRendering: true, // Enable rendering of foreign objects
        width: circuitElement.scrollWidth, // Set width to the full scroll width
        height: circuitElement.scrollHeight, // Set height to the full scroll height
        scrollX: 0, // Start capturing from the top-left corner
        scrollY: 0
    }).then(canvas => {
        canvas.toBlob(blob => {
            const filename = prompt('Enter a filename for your circuit image:');
            if (filename) {
                saveAs(blob, `${filename}.png`);
            }
        });
    }).catch(error => {
        console.error('Error capturing circuit as image:', error);
    });
}; 