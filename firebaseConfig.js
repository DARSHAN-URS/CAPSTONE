import { initializeApp } from "firebase/app";
// Import getFirestore to initialize the database service
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD52I4jj5kpBlBvQspO7O__uCLI37eoxSM",
  authDomain: "ayushman-pesu.firebaseapp.com",
  projectId: "ayushman-pesu",
  storageBucket: "ayushman-pesu.appspot.com",
  messagingSenderId: "324532103701",
  appId: "1:324532103701:web:38d5436d4d187e6825bc1c",
  measurementId: "G-FJDYL81LQV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and export it for use in other components
export const db = getFirestore(app);