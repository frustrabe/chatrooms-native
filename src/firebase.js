import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDEsqWYPrdanz4WvIfPRfbM7ZEfgMhFFvQ",
  authDomain: "simple-chat-app-by-frustrabe.firebaseapp.com",
  projectId: "simple-chat-app-by-frustrabe",
  storageBucket: "simple-chat-app-by-frustrabe.appspot.com",
  messagingSenderId: "737316338965",
  appId: "1:737316338965:web:326de44d9aef0fe0b33d1c",
  measurementId: "G-EXMQ02GSL9",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const googleProvider = new GoogleAuthProvider();

export { auth, db, googleProvider };
