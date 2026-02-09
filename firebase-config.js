// Firebase Configuration
// =====================

// Your Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCDZ4KU1RUBynrWIGdkQeGrBKWFn-fvjfY",
    authDomain: "prodigy-pathways-effcd.firebaseapp.com",
    projectId: "prodigy-pathways-effcd",
    storageBucket: "prodigy-pathways-effcd.firebasestorage.app",
    messagingSenderId: "132361741445",
    appId: "1:132361741445:web:1e0da3433a694ed89f35ec",
    measurementId: "G-WSXTQR9992"
};

// Initialize Firebase
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js';
import { 
    getFirestore, collection, doc, setDoc, getDoc, getDocs, 
    addDoc, updateDoc, deleteDoc, query, where, orderBy 
} from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js';
import { 
    getAuth, createUserWithEmailAndPassword, 
    signInWithEmailAndPassword, signOut, onAuthStateChanged 
} from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js';

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

// Export Firebase services globally
window.firebase = {
    app,
    db,
    auth,
    // Firestore functions
    collection,
    doc,
    setDoc,
    getDoc,
    getDocs,
    addDoc,
    updateDoc,
    deleteDoc,
    query,
    where,
    orderBy,
    // Auth functions
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged
};

console.log('Firebase initialized successfully!');
