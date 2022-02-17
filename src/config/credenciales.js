import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyCLursi-XHyl1yQAFx8ZBoe60uCRuRZrRk",
  authDomain: "fir-amg.firebaseapp.com",
  projectId: "fir-amg",
  storageBucket: "fir-amg.appspot.com",
  messagingSenderId: "894541695568",
  appId: "1:894541695568:web:491c12ca2ec094554b9f55",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;
