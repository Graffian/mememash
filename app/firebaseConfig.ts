// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import { getAuth } from "firebase/auth"
import { GoogleAuthProvider , GithubAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

type config = {
    apiKey : string;
    authDomain:string;
    projectId : string;
    storageBucket : string;
    messagingSenderId : string;
    appId : string;
    measurementId : string;
}

const firebaseConfig : config = {
  apiKey: "AIzaSyCSlltOzufz7ZyNC274NA0s7Zmhipdusm0",
  authDomain: "hackathon-880c6.firebaseapp.com",
  projectId: "hackathon-880c6",
  storageBucket: "hackathon-880c6.firebasestorage.app",
  messagingSenderId: "279705089969",
  appId: "1:279705089969:web:6ba816047c9fd588d5ef90",
  measurementId: "G-BQVT30XM0P"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app)
const googleProvider = new GoogleAuthProvider()
const githubProvider = new GithubAuthProvider()

export {
    auth,
    googleProvider,
    githubProvider
}