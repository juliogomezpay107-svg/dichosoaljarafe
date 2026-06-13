import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD2qwlIiERWCiaf_nDvTZgqkpH4fYkyvVM",
  authDomain: "dichoso-c92d7.firebaseapp.com",
  projectId: "dichoso-c92d7",
  storageBucket: "dichoso-c92d7.firebasestorage.app",
  messagingSenderId: "691336146160",
  appId: "1:691336146160:web:3f2586be82cd9d0d476635",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
