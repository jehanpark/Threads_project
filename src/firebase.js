import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCP08XJZ_rankYpiK0GW0hoNxxLH2PtyLk",
  authDomain: "team-e519e.firebaseapp.com",
  projectId: "team-e519e",
  storageBucket: "team-e519e.appspot.com",
  messagingSenderId: "393886202214",
  appId: "1:393886202214:web:debc29ad4f98df548fb0a7",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const storage = getStorage(app);

export const db = getFirestore(app);
