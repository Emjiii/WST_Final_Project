import { get, set, ref } from "firebase/database";
import { db, auth } from "../components/auth/firebase/firebaseConfig";
import { Position, StepEdge } from "@xyflow/react";


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
export const loadFromFirebase = async (userId, fileName, setNodes, setEdges) => {
    try {
        if (!fileName) throw new Error("File name is required.");
        if (!userId) throw new Error("User ID is required.");

        const dbRef = ref(db, `circuits/${userId}/${fileName}`);
        const snapshot = await get(dbRef);

        if (snapshot.exists()) {
            const circuitData = snapshot.val();
            const { nodes = [], edges = [] } = circuitData;

            // Update nodes with database values and reattach interactivity
            const updatedNodes = nodes.map((node) => ({
                ...node,
                data: {
                    ...node.data,
                    value: node.data.value || false, // Default to false if undefined
                    setValue: (newValue) => {
                        setNodes((prevNodes) => {
                            const updatedNodes = prevNodes.map((n) => {
                                if (n.id === node.id) {
                                    return {
                                        ...n,
                                        data: {
                                            ...n.data,
                                            value: newValue,
                                        },
                                    };
                                }
                                return n;
                            });
            
                            // Only update state if the new nodes are different from the previous ones
                            return JSON.stringify(prevNodes) !== JSON.stringify(updatedNodes) ? updatedNodes : prevNodes;
                        });
                    },
                },
            }));
            

            setNodes(updatedNodes);
            setEdges(edges);
            console.log("Circuit loaded and nodes updated.");
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