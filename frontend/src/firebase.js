// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration

const firebaseConfig = {
  apiKey: "AIzaSyA9ysHfmo7gOyPBr8lRE7BiHli7dCnwmXU",
  authDomain: "nhim-album.firebaseapp.com",
  projectId: "family-album-389113",
  storageBucket: "family-album-389113.appspot.com",
};
 
// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
export default app;