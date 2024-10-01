// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"; // 사용자 추가

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
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

// auth (사용자 정보) 반환하기
export const auth = getAuth(app);
