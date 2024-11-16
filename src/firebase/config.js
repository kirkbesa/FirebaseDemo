import {initializeApp} from 'firebase/app'
import {getFirestore} from 'firebase/firestore'
import {getAuth} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCbZh1AF5XzC6er_AtNH3TqA_EfGvt9sF0",
  authDomain: "besafirebase.firebaseapp.com",
  projectId: "besafirebase",
  storageBucket: "besafirebase.firebasestorage.app",
  messagingSenderId: "841341471204",
  appId: "1:841341471204:web:ac89ffdb846c1ee9bc1ff1",
  measurementId: "G-961MBSQ66F"
};
  initializeApp(firebaseConfig);

const db = getFirestore();

const auth = getAuth();

export {db, auth}