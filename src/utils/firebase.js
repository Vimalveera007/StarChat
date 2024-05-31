// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: "AIzaSyAGXsV5aY2h_o78qqlbiIYPfzhgIYOlPfc",
  authDomain: "starchat-73ae1.firebaseapp.com",
  projectId: "starchat-73ae1",
  storageBucket: "starchat-73ae1.appspot.com",
  messagingSenderId: "659637315869",
  appId: "1:659637315869:web:03e6efc8ba0cf9987919f4",
  measurementId: "G-2F99FEVH6C",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const storage = getStorage(app);
export const db = getFirestore(app);
