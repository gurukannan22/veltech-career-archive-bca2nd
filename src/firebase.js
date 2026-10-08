// Placeholder for Firebase configuration
// 1. Create a project at https://console.firebase.google.com/
// 2. Add a web app to the project
// 3. Copy the config below and replace the dummy values
// 4. Enable Authentication (Email/Password) and Firestore in the Firebase Console

import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};

// Initialize Firebase (will throw error if config is dummy, so we only init if API key is somewhat valid)
let app, auth, db;

if (firebaseConfig.apiKey !== "YOUR_API_KEY") {
  app = initializeApp(firebaseConfig);
  auth = getAuth(app);
  db = getFirestore(app);
} else {
  console.warn("Firebase is not configured yet. Using mock data for demonstration.");
}

export { auth, db };
