// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDHkX1ORW-WqOuo8xmk6lgNLZzclYT0E1Q",
  authDomain: "tiobatata-134f1.firebaseapp.com",
  projectId: "tiobatata-134f1",
  storageBucket: "tiobatata-134f1.appspot.com",
  messagingSenderId: "726411910302",
  appId: "1:726411910302:web:3b6ec5d4e7cd456cbb6f8f",
  measurementId: "G-WGF95RH9LQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);