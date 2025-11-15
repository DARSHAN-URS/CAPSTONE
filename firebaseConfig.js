// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD52I4jj5kpBlBvQspO7O__uCLI37eoxSM",
  authDomain: "ayushman-pesu.firebaseapp.com",
  projectId: "ayushman-pesu",
  storageBucket: "ayushman-pesu.firebasestorage.app",
  messagingSenderId: "324532103701",
  appId: "1:324532103701:web:38d5436d4d187e6825bc1c",
  measurementId: "G-FJDYL81LQV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);