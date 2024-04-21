// firebaseConfig.js
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore/lite';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
  apiKey: "AIzaSyCGyBzOxbZmNRBFHdUwUmFJajPLQedmcAM",
  authDomain: "tu-reports.firebaseapp.com",
  databaseURL: "https://tu-reports-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "tu-reports",
  storageBucket: "tu-reports.appspot.com",
  messagingSenderId: "876108855213",
  appId: "1:876108855213:web:502c7441495744de5f1324",
  measurementId: "G-PPN4G1WE6G"
};

export const firebase_app = initializeApp(firebaseConfig);
export const firebase_auth = initializeAuth(firebase_app, {
  persistence: getReactNativePersistence(AsyncStorage)
});
export const firebase_db = getFirestore(firebase_app);

