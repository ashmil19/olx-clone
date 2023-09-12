import firebase from 'firebase';
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/storage'

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBHhEIV9LskMRX_EA-CYMP58G15QIWJcgo",
    authDomain: "olxx-f2e73.firebaseapp.com",
    projectId: "olxx-f2e73",
    storageBucket: "olxx-f2e73.appspot.com",
    messagingSenderId: "642007544327",
    appId: "1:642007544327:web:177ef17fe82daceed7b0a2",
    measurementId: "G-RDK4KB8MVZ"
  };


export default firebase.initializeApp(firebaseConfig);