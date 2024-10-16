import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD-edbennIrZ_CJPUiFuwYb5DIKnH7dMTo",
  authDomain: "thread-2d958.firebaseapp.com",
  projectId: "thread-2d958",
  storageBucket: "thread-2d958.appspot.com",
  messagingSenderId: "978525753543",
  appId: "1:978525753543:web:5219922e01bf1d20f4eee2",
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
