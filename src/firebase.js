import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAYS-JakSG6tyqEAbg1UFUNvnQsN_uimUw",
  authDomain: "threads-56202.firebaseapp.com",
  projectId: "threads-56202",
  storageBucket: "threads-56202.appspot.com",
  messagingSenderId: "220165764566",
  appId: "1:220165764566:web:fe177c29f299e8e2c5e077",
  measurementId: "G-B5SW5CSTDV",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const storage = getStorage(app);

export const db = getFirestore(app);
