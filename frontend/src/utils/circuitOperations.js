import { saveAs } from 'file-saver';
import { toPng, toJpeg, toBlob, toSvg } from 'html-to-image';
import { showSaveCircuitModal, showSaveImageCircuitModal } from './modal'; // Import the modal function

export const saveCircuit = (getNodes, getEdges) => {
    const circuitData = {
        nodes: getNodes(),
        edges: getEdges(),
    };

    // Save circuit data as a JSON file
    const saveDataAsFile = (filename) => {
        const blob = new Blob([JSON.stringify(circuitData, null, 2)], { type: 'application/json' });
        saveAs(blob, `${filename}.json`);
    };

    // Call the modal when needed
    showSaveCircuitModal((filename) => {
        if (filename) {
            saveDataAsFile(filename);
        }
    });
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

        // Replace the prompt with the modal for filename input
        const defaultFilename = `circuit-${new Date().toISOString()}`;
        showSaveImageCircuitModal(defaultFilename, (filename) => {
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
        });
    } catch (error) {
        console.error('Error capturing circuit as image:', error);
        if (error.name === 'SecurityError') {
            console.error('CORS issue detected. Ensure all stylesheets are loaded with appropriate CORS headers.');
        }
    }
};

// Function to import circuit data from a JSON file
export const importCircuit = async (setNodes, setEdges) => {
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = '.json';

    fileInput.onchange = async (event) => {
        console.log('File input changed'); // Debug log
        const file = event.target.files[0];
        console.log('Selected file:', file); // Debug log
        if (!file) {
            console.error('No file selected.');
            return;
        }

        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const circuitData = JSON.parse(e.target.result);

                if(!circuitData.nodes || !circuitData.edges) {
                    throw new Error('Invalid circuit file format');
                }

                const newconstructedNodes = circuitData.nodes.map(node => ({
                    ...node,
                    data: {
                        ...node.data,
                        setValue: node.data.setValue || ((newValue) => {
                            setNodes((prevNodes) =>
                                prevNodes.map((n) => 
                                    n.id === node.id
                                        ? { ...n, data: { ...n.data, value: newValue} }
                                        :n
                                )
                            );
                                
                        })
                     
                    }
                    
                }));

                const newconstructedEdges = circuitData.edges.map(edge => ({
                    ...edge
                }));

                setNodes(newconstructedNodes); // Update nodes directly
                setEdges(newconstructedEdges); // Update edges directly
                
                console.log('Circuit imported successfully.');
            } catch (error) {
                console.error('Error parsing or importing circuit data:', error);
            }
        };

        reader.readAsText(file);
    };

    fileInput.click();
};



//         const reader = new FileReader();
//         reader.onload = (e) => {
//             console.log('File read successfully'); // Debug log
//             try {
//                 const circuitData = JSON.parse(e.target.result);
//                 console.log('Parsed circuit data:', circuitData); // Debug log

//                 // Ensure the structure includes nodes and edges
//                 if (Array.isArray(circuitData.nodes) && Array.isArray(circuitData.edges)) {
//                     // Update nodes and edges directly in React Flow state
//                     setNodes(circuitData.nodes); // Update nodes directly
//                     setEdges(circuitData.edges); // Update edges directly
//                     console.log('Nodes:', circuitData.nodes);
//                     console.log('Edges:', circuitData.edges);
//                     console.log('Circuit data imported successfully.', circuitData);
//                 } else {
//                     console.error('Invalid circuit data structure. Ensure nodes and edges are arrays.');
//                 }
//             } catch (error) {
//                 console.error('Error parsing JSON:', error);
//             }
//         };
//         reader.readAsText(file);
//     };

//     fileInput.click(); // Trigger the file input dialog
// }; 