// Import Firebase v8 compat
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/analytics';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC_-1xzh2ONq0NN6QA_FnCvtLLzzTmWew8",
  authDomain: "finance-c613e.firebaseapp.com",
  projectId: "finance-c613e",
  storageBucket: "finance-c613e.firebasestorage.app",
  messagingSenderId: "449481840315",
  appId: "1:449481840315:web:40192d242c6e6d60b73b9e",
  measurementId: "G-VCHL471S7P"
};

// Initialize Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

// Initialize Firebase services
export const auth = firebase.auth();
export const db = firebase.firestore();
export const analytics = firebase.analytics();

export default firebase;