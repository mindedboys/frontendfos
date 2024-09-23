import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyAMvU0xTCKgu2AgIvLP9fJbO2mBaHaVfto",
  authDomain: "foodorderingsystem-e755a.firebaseapp.com",
  projectId: "foodorderingsystem-e755a",
  storageBucket: "foodorderingsystem-e755a.appspot.com",
  messagingSenderId: "259937339308",
  appId: "1:259937339308:web:9a5613f94f12165c385c09"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const provider = new GoogleAuthProvider()
