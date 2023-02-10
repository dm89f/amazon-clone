import firebase from 'firebase'


const firebaseConfig = {
  apiKey: "AIzaSyCK_dgXNQMyzbAt9UTOwGg5DvKCnn8Em4w",
  authDomain: "clone-bc-cb28a.firebaseapp.com",
  projectId: "clone-bc-cb28a",
  storageBucket: "clone-bc-cb28a.appspot.com",
  messagingSenderId: "154452406459",
  appId: "1:154452406459:web:e1f8c8ba48f29e9b4ff99e"
};

const app = !firebase.apps.length ? firebase.initializeApp(firebaseConfig): firebase.app()

const db = app.firestore();
export default db