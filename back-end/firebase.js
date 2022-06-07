import firebase from "firebase/app";
import "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyAqQPUfbQE3Y3EP51-pyQ7_rxMQEkE63AA",
    authDomain: "ijalti-manager-users.firebaseapp.com",
    projectId: "ijalti-manager-users",
    storageBucket: "ijalti-manager-users.appspot.com",
    messagingSenderId: "856993590920",
    appId: "1:856993590920:web:1e4823fd184b8fbcadb93d"
  };

  firebase.initializeApp(firebaseConfig);

  export default firebase;