import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics, isSupported } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyC5I_y2yQjv7WgmvU9LdDdtUS_7rCIg8og",
  authDomain: "college-project-8237c.firebaseapp.com",
  projectId: "college-project-8237c",
  storageBucket: "college-project-8237c.firebasestorage.app",
  messagingSenderId: "198228984132",
  appId: "1:198228984132:web:d2aa06a280b1bb12979711",
  measurementId: "G-6C3RRFCY7P",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const analytics = isSupported().then((yes) => yes ? getAnalytics(app) : null);
