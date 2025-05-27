// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDD6LNbMZBI6Qe70CdReZezkvZq2-_aXmg",
  authDomain: "todolist-87a97.firebaseapp.com",
  projectId: "todolist-87a97",
  storageBucket: "todolist-87a97.firebasestorage.app",
  messagingSenderId: "738397405189",
  appId: "1:738397405189:web:8564e276a8fa40f0675c6c",
  measurementId: "G-3H1T6HC01H"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider, signInWithPopup };