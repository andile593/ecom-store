
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCOs4LT6o8P0M49QA5RAHfcPWR-S--bVvA",
  authDomain: "imagine-ecom-store.firebaseapp.com",
  projectId: "imagine-ecom-store",
  storageBucket: "imagine-ecom-store.appspot.com",
  messagingSenderId: "743205979914",
  appId: "1:743205979914:web:d7eb80af16c698ca575cf3",
  measurementId: "G-KFP6GF91QE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage();
