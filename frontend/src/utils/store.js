import { set, ref } from "firebase/database";
import { db, auth } from "../components/auth/firebase/firebaseConfig";


export const saveToFireBase = async (getNodes, getEdges) => {
    const userId = auth.currentUser ? auth.currentUser.uid : null;
    if (!userId) {
        console.error("User is not authenticated.");
        return;
    }

    const circuitData = {
        nodes: getNodes(),
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

export const loadFromFirebase = async (userId, fileName) => {
    try {
        // Ensure fileName is passed as an argument
        if (!fileName) throw new Error("File name is required.");
        const dbRef = ref(db, `circuit/${userId}/${fileName}`);
        const snapshot = await get(dbRef);

        if (snapshot.exists()) {
            console.log("Circuit loaded:", snapshot.val());
            return snapshot.val().circuit;
        } else {
            console.log("No circuit found for this user.");
            return null;
        }
    } catch (error) {
        console.error("Error loading circuit:", error);
    }
};