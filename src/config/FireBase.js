// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import {getFirestore} from 'firebase/firestore'; 
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBxOknuLC0tg-APQcQiKEd75QcY-3_304M",
  authDomain: "contact-fd4d2.firebaseapp.com",
  projectId: "contact-fd4d2",
  storageBucket: "contact-fd4d2.appspot.com",
  messagingSenderId: "198353889771",
  appId: "1:198353889771:web:1de979358e458b25e411ae",
  measurementId: "G-L5H3P821E0"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const db = getFirestore(app);