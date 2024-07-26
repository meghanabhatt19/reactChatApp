
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY ,
  authDomain: "react-chat-65d12.firebaseapp.com",
  projectId: "react-chat-65d12",
  storageBucket: "react-chat-65d12.appspot.com",
  messagingSenderId: "100292356032",
  appId: "1:100292356032:web:fe6e2169267e5b305b0a25"
};


const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const db = getFirestore();
export const storage = getStorage ();
export default app;