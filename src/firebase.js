import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyAmIuWWHplkbMhhGUmJp_0-Az_WctrFfXw",
  authDomain: "dearest-cf892.firebaseapp.com",
  projectId: "dearest-cf892",
  storageBucket: "dearest-cf892.appspot.com",
  messagingSenderId: "622881270874",
  appId: "1:622881270874:web:c0979276289d7acc51fc63",
  measurementId: "G-8RR769J80D"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app)

export {db}