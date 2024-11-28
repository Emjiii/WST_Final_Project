// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCyharfJuJDgQbeZxGkvg-0KvAABjgOuHs",
  authDomain: "logic-gate-simulator-31edb.firebaseapp.com",
  projectId: "logic-gate-simulator-31edb",
  storageBucket: "logic-gate-simulator-31edb.firebasestorage.app",
  messagingSenderId: "134521312353",
  appId: "1:134521312353:web:3de7e960b4ddf5251b8620",
  measurementId: "G-2RZ36W6HYK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const analytics = getAnalytics(app);

export { app, auth };