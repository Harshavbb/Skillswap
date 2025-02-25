// Import the functions you need from the Firebase SDKs
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCIMALMsB3HgioQgxmYnnnceK-vahQFjFg",
  authDomain: "skillswap-8e0f0.firebaseapp.com",
  projectId: "skillswap-8e0f0",
  storageBucket: "skillswap-8e0f0.appspot.com", // FIXED storageBucket (remove "firebasestorage.app")
  messagingSenderId: "1087954657262",
  appId: "1:1087954657262:web:00f0ebd66d8039e09278ff",
  measurementId: "G-C42NNSGM4J"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication & Firestore
export const auth = getAuth(app);
export const db = getFirestore(app);

export default app; // Export the app instance if needed
