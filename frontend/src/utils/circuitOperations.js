import { saveAs } from 'file-saver';
import { toPng, toJpeg, toBlob, toSvg } from 'html-to-image';

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

/**
 * Saves the specified DOM element as an image (PNG, JPEG, SVG).
 * @param {string} elementId - The ID of the DOM element to capture.
 * @param {string} format - The image format ('png', 'jpeg', 'svg').
 */
export const saveCircuitAsImage = async (elementId, format = 'png') => {
    try {
        const element = document.getElementById(elementId);
        if (!element) {
            console.error(`Element with ID '${elementId}' not found.`);
            return;
        }

        // Hide mini map and zoom controls
        const miniMap = document.querySelector('.flow-controls'); // Replace with actual class or ID
        const zoomControls = document.querySelector('.flow-minimap'); // Replace with actual class or ID
        if (miniMap) miniMap.style.display = 'none';
        if (zoomControls) zoomControls.style.display = 'none';

        let imageFunction;
        if (format === 'png') {
            imageFunction = toPng;
        } else if (format === 'jpeg') {
            imageFunction = toJpeg;
        } else if (format === 'svg') {
            imageFunction = toSvg;
        } else {
            console.error(`Unsupported format '${format}'. Use 'png', 'jpeg', or 'svg'.`);
            return;
        }

        const dataUrl = await imageFunction(element, {
            quality: 1,
            backgroundColor: '#ffffff',
            foreignObjectRendering: true,
            style: {
                // Customize styles if needed
            },
        });

        // Restore mini map and zoom controls visibility
        if (miniMap) miniMap.style.display = '';
        if (zoomControls) zoomControls.style.display = '';

        const defaultFilename = `circuit-${new Date().toISOString()}`;
        const filename = prompt(`Enter a filename for your circuit image (${format.toUpperCase()}):`, defaultFilename);
        if (!filename) {
            console.error('Filename is required to save the image.');
            return;
        }

        let mimeType = 'image/png';
        if (format === 'jpeg') {
            mimeType = 'image/jpeg';
        } else if (format === 'svg') {
            mimeType = 'image/svg+xml';
        }

        if (format === 'svg') {
            const blob = new Blob([dataUrl], { type: mimeType });
            saveAs(blob, `${filename}.svg`);
        } else {
            saveAs(dataUrl, `${filename}.${format}`);
        }

        console.log(`Circuit saved as ${filename}.${format}`);
    } catch (error) {
        console.error('Error capturing circuit as image:', error);
        if (error.name === 'SecurityError') {
            console.error('CORS issue detected. Ensure all stylesheets are loaded with appropriate CORS headers.');
        }
    }
}; 