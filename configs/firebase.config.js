import { getApp, getApps, initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
    apiKey: "AIzaSyDyT0eFYhddKP64fZ9JjwVqtcMA2ZlIP6U",
    authDomain: "italkvn-501ec.firebaseapp.com",
    projectId: "italkvn-501ec",
    storageBucket: "italkvn-501ec.appspot.com",
    messagingSenderId: "857873038674",
    appId: "1:857873038674:web:68368420e29b95987cce8b",
    measurementId: "G-6NGF9YNSLN"
  };

export const app = getApps.length > 0 ? getApp() : initializeApp(firebaseConfig)
export const firebaseAuth = getAuth(app)
export const firebaseStore = getFirestore(app)