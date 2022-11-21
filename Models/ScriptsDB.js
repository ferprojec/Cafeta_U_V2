import { initializeApp } from "https://www.gstatic.com/firebasejs/9.5.0/firebase-app.js";
import { getStorage, ref, uploadBytes , getDownloadURL }from "https://www.gstatic.com/firebasejs/9.5.0/firebase-storage.js";
import {getFirestore, doc, getDoc, setDoc, collection, addDoc, updateDoc, deleteDoc, deleteField, query, where, getDocs} from "https://www.gstatic.com/firebasejs/9.5.0/firebase-firestore.js";
import { getDatabase,ref as ref2 , onValue, set, remove} from "https://www.gstatic.com/firebasejs/9.5.0/firebase-database.js";

const firebaseConfig = {
    apiKey: "AIzaSyC6qClFwuTH5qy7Emt5ghGSBrka7OpOO2I",
    authDomain: "cafeta-u.firebaseapp.com",
    databaseURL: "https://cafeta-u-default-rtdb.firebaseio.com",
    projectId: "cafeta-u",
    storageBucket: "cafeta-u.appspot.com",
    messagingSenderId: "936008174074",
    appId: "1:936008174074:web:b4cc8f35d770baaf7a3c43",
    measurementId: "G-VS86ED1TZN"
};

// Export Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
const db = getFirestore();
const rdb = getDatabase()

export{ storage, db, set,ref, doc, getDoc, uploadBytes, getDownloadURL,  setDoc, collection, 
    addDoc, rdb, updateDoc, remove, deleteDoc, deleteField, query, where, getDocs, app, ref2, onValue}