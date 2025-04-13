// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDi0yavIfUH2eMmxNDY6r3UIVHfWrww4ss",
  authDomain: "bitcamp-2025-69907.firebaseapp.com",
  projectId: "bitcamp-2025-69907",
  storageBucket: "bitcamp-2025-69907.firebasestorage.app",
  messagingSenderId: "720209701358",
  appId: "1:720209701358:web:1002740c6359d74a0b46ff",
  measurementId: "G-64ZHPJXCF4",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export { auth, app };
