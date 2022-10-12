import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAvZZ0qM6Fp64DqBy8yDygQo5dgfE1IOJc",
  authDomain: "test-login-cdb8c.firebaseapp.com",
  projectId: "test-login-cdb8c",
  storageBucket: "test-login-cdb8c.appspot.com",
  messagingSenderId: "82134856556",
  appId: "1:82134856556:web:06a21c3d627f22c4f4f949",
  measurementId: "G-H1S85HCS5M",
};

//init firebase app
initializeApp(firebaseConfig);

//init services
const auth = getAuth();

export {
  auth,
  createUserWithEmailAndPassword,
  updateProfile,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
};
