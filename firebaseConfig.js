// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC8LgW_mCQQBuAM0_L6Lat0GjiKAhIMg7c",
  authDomain: "mathlab-ad2fb.firebaseapp.com",
  projectId: "mathlab-ad2fb",
  storageBucket: "mathlab-ad2fb.firebasestorage.app",
  messagingSenderId: "880674789694",
  appId: "1:880674789694:web:7bb149e8ece68f00f3b46f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);