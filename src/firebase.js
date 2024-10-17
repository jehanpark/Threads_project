import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA3PIGXN7f9bw1nZ8b0ARNwC3fZ7I-k12k",
  authDomain: "sns-flatform0924.firebaseapp.com",
  projectId: "sns-flatform0924",
  storageBucket: "sns-flatform0924.appspot.com",
  messagingSenderId: "289974252711",
  appId: "1:289974252711:web:4775f362e7c70700af1782",
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const storage = getStorage(app);

export const db = getFirestore(app);

// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAuth } from "firebase/auth";
// import { getStorage } from "firebase/storage";
// import { getFirestore } from "firebase/firestore";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyBGEx252fdAS7IwavSgy4hB7skJtFmOD2c",
//   authDomain: "sns-flatform-7b2ff.firebaseapp.com",
//   projectId: "sns-flatform-7b2ff",
//   storageBucket: "sns-flatform-7b2ff.appspot.com",
//   messagingSenderId: "476443588574",
//   appId: "1:476443588574:web:7195cd12404c8cc9a30f4f",
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);

// export const auth = getAuth(app);

// export const storage = getStorage(app);

// export const db = getFirestore(app);
