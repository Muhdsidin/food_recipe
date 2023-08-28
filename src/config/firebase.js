// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDrEyH9IWJpzg_FHcBFLdo4RpcGUM0u_2s",
  authDomain: "food-delivery-app-679d1.firebaseapp.com",
  projectId: "food-delivery-app-679d1",
  storageBucket: "food-delivery-app-679d1.appspot.com",
  messagingSenderId: "31479540922",
  appId: "1:31479540922:web:3a890556d2680d60fbe683",
  measurementId: "G-J0YDGG13EH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)