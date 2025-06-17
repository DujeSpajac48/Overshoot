// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBPmJXRYOt-GtCrHvZ8uMvOORE44pssyPY",
  authDomain: "overshoot-376d8.firebaseapp.com",
  projectId: "overshoot-376d8",
  storageBucket: "overshoot-376d8.firebasestorage.app",
  messagingSenderId: "792712359588",
  appId: "1:792712359588:web:8231d25ebb4102a6a4c031",
  measurementId: "G-V2KDL9SWPH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);