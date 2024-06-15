// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from 'firebase/firestore/lite';
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBJBBd73QjDdftajv0P5tD57MvLLh83264",
  authDomain: "footballee-61d80.firebaseapp.com",
  projectId: "footballee-61d80",
  storageBucket: "footballee-61d80.appspot.com",
  messagingSenderId: "436587265917",
  appId: "1:436587265917:web:3610b002c8b25abeb4d614",
  measurementId: "G-GMCXMQ853E"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth();
const storage = getStorage(app);
const provider = new GoogleAuthProvider();

export { auth, provider, storage };
export default db;