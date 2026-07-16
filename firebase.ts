import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDZKuh5a7CUTynVHqalQyAimz297PN1S6U",
  authDomain: "management-web-porto.firebaseapp.com",
  projectId: "management-web-porto",
  storageBucket: "management-web-porto.firebasestorage.app",
  messagingSenderId: "178858999375",
  appId: "1:178858999375:web:6e5c1b73867c4a7f01f43a",
  measurementId: "G-QX2E9ZZ683",
};

// Prevent duplicate initialization on hot reload (Next.js SSR safe)
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

export const db = getFirestore(app);   // Firestore — untuk Step 2 (data)
export const auth = getAuth(app);      // Auth     — untuk Step 3 (admin login)
export default app;