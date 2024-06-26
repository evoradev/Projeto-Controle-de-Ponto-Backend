import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyDZzcyDqCCGH85LusBqAsMgR_Ni964yU78",
  authDomain: "esp8266-2885a.firebaseapp.com",
  databaseURL: "https://esp8266-2885a-default-rtdb.firebaseio.com",
  projectId: "esp8266-2885a",
  storageBucket: "esp8266-2885a.appspot.com",
  messagingSenderId: "277001389056",
  appId: "1:277001389056:web:4d5c1691acb419815f04e5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db  = getDatabase(app)

export { db };