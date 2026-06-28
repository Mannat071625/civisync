import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyCKSfTMDgLL8-gjxU9NBmwruYh-J6W5NK4",
  authDomain: "civisync-43f7f.firebaseapp.com",
  projectId: "civisync-43f7f",
  storageBucket: "civisync-43f7f.firebasestorage.app",
  messagingSenderId: "736972188769",
  appId: "1:736972188769:web:3b2947f7453fcb10044e20"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);