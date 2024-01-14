/*import { getApp, getApps, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";*/

// Import Firebase modules individually
import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';
import { getAuth } from 'firebase/auth';

  /*apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,*/
  const firebaseConfig = {
    apiKey: "AIzaSyBXo7pCyneVL0Kgd8WEqOIa2JOhVo4Biy0",
    authDomain: "pro-new-1cd0a.firebaseapp.com",
    databaseURL: "https://pro-new-1cd0a-default-rtdb.firebaseio.com",
    projectId: "pro-new-1cd0a",
    storageBucket: "pro-new-1cd0a.appspot.com",
    messagingSenderId: "457668536107",
    appId: "1:457668536107:web:0cc13b536cf1104cbf076e"
  };
  


//const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
//const storage = getStorage(app);
//const auth = getAuth(app); // Use getAuth function to get the authentication instance

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Set up other Firebase services
const storage = getStorage(app);
const auth = getAuth(app);

// Export the initialized app, storage, and auth for use in other modules
export { app, storage, auth };