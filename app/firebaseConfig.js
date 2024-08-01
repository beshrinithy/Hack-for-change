// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from 'firebase/database';
const firebaseConfig = {
    apiKey: "AIzaSyB7ofZHHKeK8APJqLImmlVPqKrAtaezeis",
    authDomain: "test-a36af.firebaseapp.com",
    databaseURL: "https://test-a36af-default-rtdb.firebaseio.com",
    projectId: "test-a36af",
    storageBucket: "test-a36af.appspot.com",
    messagingSenderId: "790714132540",
    appId: "1:790714132540:web:f0b8ac46030a5291cabb39"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database=getDatabase(app);

export { database };

