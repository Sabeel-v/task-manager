import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDXfLCLRY6JTOOCKLkO7b2AW7SZ5zEXdnA",
  authDomain: "fcrud-40bb3.firebaseapp.com",
  projectId: "fcrud-40bb3",
  storageBucket: "fcrud-40bb3.firebasestorage.app",
  messagingSenderId: "1017598378444",
  appId: "1:1017598378444:web:16d01cf05c3f5b258c9d69"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);