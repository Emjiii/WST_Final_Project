import { get, set, ref } from "firebase/database";
import { db, auth } from "../components/auth/firebase/firebaseConfig";


const sanitizeData = (data) => {
    if (Array.isArray(data)) {
        return data.map(sanitizeData);  // Recursively sanitize arrays
    }
    if (typeof data === 'object') {
        return Object.fromEntries(
            Object.entries(data)
                .filter(([key, value]) => typeof value !== 'function')  // Remove functions
                .map(([key, value]) => [key, sanitizeData(value)])  // Recursively sanitize objects
        );
    }
    return data;  // Return the data as-is if it's not an object or array
};

//const sanitizedCircuitData = sanitizeData(circuitData);


export const saveToFireBase = async (getNodes, getEdges) => {
    const userId = auth.currentUser ? auth.currentUser.uid : null;
    if (!userId) {
        console.error("User is not authenticated.");
        return;
    }
    const circuitData = {
        nodes: getNodes().map(node => ({
            ...node,
            data: sanitizeData(node.data),  // Sanitize node data to remove functions
        })),
        edges: getEdges(),
        timestamp: new Date().toISOString(),
    };

        // Prompt user for a filename
    const filename = prompt('Enter a filename for your circuit:');
    if (!filename) {
        console.log("Save operation canceled. Filename is required.");
        return;
    }
    
    try {
        // Define the path in the database where the circuit will be saved
        const dbRef = ref(db, `circuits/${userId}/${filename}`);
        await set(dbRef, circuitData);
        console.log(`Circuit saved to database with filename: ${filename}`);
    } catch (error) {
        console.error("Error saving circuit to database:", error);
    }
};


// Load circuit data from Firebase and set values using setValue
export const loadFromFirebase = async (userId, fileName, setNodes) => {
    try {
        // Ensure fileName and userId are passed as arguments
        if (!fileName) throw new Error("File name is required.");
        if (!userId) throw new Error("User ID is required.");

        // Define the path in the database where the circuit is saved
        const dbRef = ref(db, `circuits/${userId}/${fileName}`);
        
        // Get the snapshot from the database
        const snapshot = await get(dbRef);

        // Check if the snapshot exists
        if (snapshot.exists()) {
            const circuitData = snapshot.val();
            console.log("Circuit loaded:", circuitData);

            // Set nodes and edges using the setNodes function
            const { nodes = [], edges = [] } = circuitData;
            
            // If setNodes is provided, update the nodes
            if (setNodes) {
                setNodes((currentNodes) => {
                    return currentNodes.map((node) => {
                        // Find the corresponding node data from the loaded circuit
                        const loadedNode = nodes.find(n => n.id === node.id);
                        if (loadedNode) {
                            return {
                                ...node,
                                data: {
                                    ...node.data,
                                    value: loadedNode.data.value || node.data.value, // Update value if necessary
                                },
                            };
                        }
                        return node;
                    });
                });
            }

            // Return nodes and edges directly if needed elsewhere
            return {
                nodes: nodes || [],
                edges: edges || [],
            };
        } else {
            console.log("No circuit found for this user and file name.");
            return null;
        }
    } catch (error) {
        console.error("Error loading circuit:", error);
    }
};



export const listUserFiles = async () => {
    const userId = auth.currentUser ? auth.currentUser.uid : null;
    console.log("Current User:", auth.currentUser);

    if (!userId) {
        console.error("User is not authenticated. Cannot list files.");
        return[];
    }

    try {
        const dbRef = ref(db, `circuits/${userId}`);
        console.log("Database Reference Path:", dbRef.toString());

        const snapshot = await get(dbRef);

        if (snapshot.exists()) {
            const files = Object.keys(snapshot.val());
            console.log("Files found:", files);
            return files;
        } else {
            console.log("No files found for this user.");
            return [];
        }
    } catch (error) {
        console.error("Error listing files:", error);
        return [];
    }
}