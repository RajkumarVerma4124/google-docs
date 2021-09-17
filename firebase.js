import firebase from "firebase";

const firebaseConfig = {
    apiKey: "AIzaSyDSJubGZlWvB4aYh-AbDGMbSqqmpNhi8KE",
    authDomain: "doc-rv.firebaseapp.com",
    projectId: "doc-rv",
    storageBucket: "doc-rv.appspot.com",
    messagingSenderId: "623964667510",
    appId: "1:623964667510:web:c4b403fc33ca6871fbe957",
    measurementId: "G-Q95TPDD6G0"
};

const app = !firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app();

const db = app.firestore();

export default db;