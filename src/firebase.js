import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDHY6ONRSAGJ6vRNiyQiDh2HnVxSz3W7xQ",
  authDomain: "team-1216b.firebaseapp.com",
  projectId: "team-1216b",
  storageBucket: "team-1216b.appspot.com",
  messagingSenderId: "1023784703398",
  appId: "1:1023784703398:web:cfdf8a86babc9c82672b67",
  measurementId: "G-XBRBSNSJRD",
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const storage = getStorage(app);

export const db = getFirestore(app);
