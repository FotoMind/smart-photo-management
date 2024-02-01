// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAR6CvQ9-KcdmCoPlHsCTOEkNSyoVXJ3Uc",
  authDomain: "fotomind-41e56.firebaseapp.com",
  projectId: "fotomind-41e56",
  storageBucket: "fotomind-41e56.appspot.com",
  messagingSenderId: "1038416838263",
  appId: "1:1038416838263:web:768008155197f1d8815072",
  measurementId: "G-Q9HJ5YSWWX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);