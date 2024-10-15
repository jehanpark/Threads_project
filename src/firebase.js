import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDUGYD9VUn_Rva8hjNGIFI9j0Lq91ag_-Y",
  authDomain: "snsflatform-3d27f.firebaseapp.com",
  projectId: "snsflatform-3d27f",
  storageBucket: "snsflatform-3d27f.appspot.com",
  messagingSenderId: "158940273167",
  appId: "1:158940273167:web:21b367dfe81e3b7525e17a"
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
