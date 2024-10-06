import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBFosScnd8uOhIXOtXr-k7No0QPeiN6lgQ",
  authDomain: "sns-flatform-0924.firebaseapp.com",
  projectId: "sns-flatform-0924",
  storageBucket: "sns-flatform-0924.appspot.com",
  messagingSenderId: "355284102808",
  appId: "1:355284102808:web:819c698ef1d289b6e46aed",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const storage = getStorage(app);

export const db = getFirestore(app);
