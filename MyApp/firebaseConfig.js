// firebaseConfig.js
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';
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

// Get a list of cities from your database ( Example  )
async function getCities(db) {
  const citiesCol = collection(db, 'cities');
  const citySnapshot = await getDocs(citiesCol);
  const cityList = citySnapshot.docs.map(doc => doc.data());
  return cityList;
}

export async function collectMessages(filterCriteria = {}) {
  try {
    const messagesCollection = collection(firebase_db, 'messages'); // Replace 'messages' with your actual collection name

    // Build a query with optional filtering based on filterCriteria
    const q = query(messagesCollection, where(...Object.entries(filterCriteria))); // Destructure filterCriteria for dynamic queries

    const querySnapshot = await getDocs(q);
    const messages = querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })); // Include document ID

    return messages; // Return the array of messages
  } catch (error) {
    console.error('Error fetching messages:', error);
    // Handle errors appropriately (e.g., display error messages to the user)
  }
}