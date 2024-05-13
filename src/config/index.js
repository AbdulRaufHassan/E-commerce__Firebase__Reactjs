import { initializeApp } from "firebase/app";
import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import {
  getFirestore,
  setDoc,
  getDoc,
  doc,
  addDoc,
  collection,
  query,
  where,
  onSnapshot,
  serverTimestamp,
  getDocs,
  updateDoc,
  arrayUnion,
  arrayRemove,
  deleteDoc,
  limit,
  orderBy,
  writeBatch,
} from "firebase/firestore";
import {
  getStorage,
  uploadBytes,
  getDownloadURL,
  ref,
  deleteObject,
} from "firebase/storage";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: import.meta.env.VITE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_APP_ID,
  measurementId: import.meta.env.VITE_MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export {
  auth,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
  db,
  setDoc,
  getDoc,
  doc,
  addDoc,
  getDocs,
  collection,
  query,
  where,
  orderBy,
  onSnapshot,
  serverTimestamp,
  storage,
  uploadBytes,
  getDownloadURL,
  ref,
  updateDoc,
  arrayUnion,
  signOut,
  arrayRemove,
  limit,
  deleteDoc,
  writeBatch,
  deleteObject,
};
