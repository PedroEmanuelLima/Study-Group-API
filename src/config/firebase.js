// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: "study-group-api-1aba8",
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: "421783102759",
  appId: process.env.FIREBASE_APP_ID,
  measurementId: "G-4NFC3P2RM9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getStorage(app);