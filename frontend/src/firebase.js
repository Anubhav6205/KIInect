// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCOFSWHw3Z3b77wuBa6Ad10ji4Qpb3bh-U",
  authDomain: "kiinect-22250.firebaseapp.com",
  projectId: "kiinect-22250",
  storageBucket: "kiinect-22250.appspot.com",
  messagingSenderId: "977716975263",
  appId: "1:977716975263:web:85a707d029e69e0c4e74aa",
  measurementId: "G-1044JZL142"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth();
const provider = new GoogleAuthProvider();

export { auth, provider };
