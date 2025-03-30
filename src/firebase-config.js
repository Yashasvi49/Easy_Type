import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyBJ6Y56S-myll1iZpKCXG4fJvP7_KckNEg",
  authDomain: "easytype-9ac7e.firebaseapp.com",
  projectId: "easytype-9ac7e",
  storageBucket: "easytype-9ac7e.firebasestorage.app",
  messagingSenderId: "105241435574",
  appId: "1:105241435574:web:748e89f969ba2375e47517",
  measurementId: "G-GQLHC95LH2"
};
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const storage = getStorage(app);
const db = getFirestore(app);

const googleProvider = new GoogleAuthProvider();
export { auth, storage, db, googleProvider };
