// firebaseConfig.ts
import { initializeApp, FirebaseApp } from 'firebase/app';
import { getFirestore, Firestore } from 'firebase/firestore';
// @ts-ignore - getReactNativePersistence is available in firebase/auth/react-native
import { initializeAuth, getReactNativePersistence, Auth } from 'firebase/auth';
import { getStorage, FirebaseStorage } from 'firebase/storage';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface FirebaseConfig {
  apiKey: string;
  authDomain: string;
  databaseURL: string;
  projectId: string;
  storageBucket: string;
  messagingSenderId: string;
  appId: string;
  measurementId: string;
}

const firebaseConfig: FirebaseConfig = {
  // apiKey: "AIzaSyCGyBzOxbZmNRBFHdUwUmFJajPLQedmcAM",
  apiKey: "AIzaSyBsDYRgdOnDb0cYKJEIF59fBnFcCFnR7fQ",
  authDomain: "tu-reports.firebaseapp.com",
  databaseURL: "https://tu-reports-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "tu-reports",
  storageBucket: "tu-reports.appspot.com",
  messagingSenderId: "876108855213",
  appId: "1:876108855213:web:502c7441495744de5f1324",
  measurementId: "G-PPN4G1WE6G"
};

export const firebase_app: FirebaseApp = initializeApp(firebaseConfig);
export const firebase_auth: Auth = initializeAuth(firebase_app, {
  persistence: getReactNativePersistence(AsyncStorage)
});
export const firebase_db: Firestore = getFirestore(firebase_app);

export const firebase_storage: FirebaseStorage = getStorage(firebase_app);
