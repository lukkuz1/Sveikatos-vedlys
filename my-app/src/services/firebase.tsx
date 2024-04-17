import { initializeApp } from "firebase/app";
import { getAuth, setPersistence, initializeAuth} from "firebase/auth";
import * as firebaseAuth from 'firebase/auth';
    
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";
export const firebaseConfig = {
  apiKey: "AIzaSyD-PjjT8SdPZz9xO7Szg-8eZqbhluf1VJ0",
  authDomain: "unifit-2a059.firebaseapp.com",
  databaseURL: "https://sveikatingumo-vedlys-default-rtdb.europe-west1.firebasedatabase.app/",
  projectId: "unifit-2a059",
  storageBucket: "unifit-2a059.appspot.com",
  messagingSenderId: "137115719754",
  appId: "1:137115719754:web:051292896bfc677da36eb3"
};

export const app = initializeApp(firebaseConfig);
const auth = initializeAuth(app);

console.log("Firebase auth completed");

export default { auth};