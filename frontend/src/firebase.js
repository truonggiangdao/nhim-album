// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration

const firebaseConfig = {
  apiKey: "AIzaSyA9ysHfmo7gOyPBr8lRE7BiHli7dCnwmXU",
  authDomain: "nhim-album.firebaseapp.com",
  projectId: "family-album-389113",
  storageBucket: "family-album-389113.appspot.com",
  messagingSenderId: "253215433193",
  appId: "1:253215433193:web:e3eb1d83b50c761a462b78",
  measurementId: "G-T6DWV6VH0S"
};
 
// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
export const storage = getStorage(app);
export default app;