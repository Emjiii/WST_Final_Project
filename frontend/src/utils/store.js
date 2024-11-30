import { ref } from "firebase/database";
import { db } from "../components/auth/firebase/firebaseConfig";



export const saveToFireBase = async (circuitData, userId) => {
    try {
        const dbRef = ref(db, `lgs-circuit/${userId}`);
        await set(dbRef, {
            circuit: circuitData,
            timestamp: new Date().toISOString(),
        });
        console.log("Circuit Saved on Database");
    } catch (error) {
        console.error("Error saving circuit:", error);
    }
};


export const loadFromFirebase = async (userId) => {
  try {
    const dbRef = ref(db, `lgs-circuit/${userId}`);
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

