import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDvYeXpkSvph_zS-kEY1FE7wjaG_ept3bk",
  authDomain: "project-threads.firebaseapp.com",
  projectId: "project-threads",
  storageBucket: "project-threads.appspot.com",
  messagingSenderId: "56842076413",
  appId: "1:56842076413:web:0b7e0d135d37db7a5a3e94",
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const storage = getStorage(app);

export const db = getFirestore(app);
