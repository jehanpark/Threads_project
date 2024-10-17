import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCoyKIOR2qATvaKCHTMY0oxiZIWHB4Zmu4",
  authDomain: "team-19f3c.firebaseapp.com",
  projectId: "team-19f3c",
  storageBucket: "team-19f3c.appspot.com",
  messagingSenderId: "129588496422",
  appId: "1:129588496422:web:40325092fb152e4d2b7ee7",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const storage = getStorage(app);

export const db = getFirestore(app);
