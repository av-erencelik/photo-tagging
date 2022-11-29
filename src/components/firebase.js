import { getFirestore } from "firebase/firestore";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyCoRk9MHzHqTX6w0-QMldpQa0LnPRe2UlE",
  authDomain: "photo-tagging-5fd85.firebaseapp.com",
  projectId: "photo-tagging-5fd85",
  storageBucket: "photo-tagging-5fd85.appspot.com",
  messagingSenderId: "634737575546",
  appId: "1:634737575546:web:d6bbcc6a32a5ee3643ddc3",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export default db;
