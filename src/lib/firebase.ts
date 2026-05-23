import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCV2zpUAP4pAvQF14vUeVO0xGa-x2fHOx8",
  authDomain: "cryptodropscout-3ddbb.firebaseapp.com",
  projectId: "cryptodropscout-3ddbb",
  storageBucket: "cryptodropscout-3ddbb.firebasestorage.app",
  messagingSenderId: "174591190986",
  appId: "1:174591190986:web:b6e43f3658c032103a5133",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);