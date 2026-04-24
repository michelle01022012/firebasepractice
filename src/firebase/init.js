// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD5gp4oXyRWaAmJk9rJkCftpGxmQR_C-IQ",
  authDomain: "fir-practice-820de.firebaseapp.com",
  projectId: "fir-practice-820de",
  storageBucket: "fir-practice-820de.firebasestorage.app",
  messagingSenderId: "827501262715",
  appId: "1:827501262715:web:1f7430c8c4be9630576fde"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const db = getFirestore();