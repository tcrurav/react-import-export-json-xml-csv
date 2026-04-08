import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

// TODO: Replace this with your own Firebase configuration object!
const firebaseConfig = {
  apiKey: "AIzaSyDs8YSpLem9VOuMi3rvnacrjN6IClRGNNw",
  authDomain: "push-b5a09.firebaseapp.com",
  databaseURL: "https://push-b5a09-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "push-b5a09",
  storageBucket: "push-b5a09.firebasestorage.app",
  messagingSenderId: "497994204884",
  appId: "1:497994204884:web:7063251ef5fcb48601dd41",
  measurementId: "G-1EJM35L6VC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Realtime Database and get a reference to the service
const database = getDatabase(app);

export { database };
