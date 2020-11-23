import * as firebase from "firebase";
import "firebase/analytics";
// firebase config
const firebaseConfig = {
  apiKey: "AIzaSyB7wDHjK6qVAYMjh3GDF47NFOpZDZGAv4k",
  authDomain: "oldspeak-56bd3.firebaseapp.com",
  databaseURL: "https://oldspeak-56bd3.firebaseio.com",
  projectId: "oldspeak-56bd3",
  storageBucket: "oldspeak-56bd3.appspot.com",
  messagingSenderId: "431609158907",
  appId: "1:431609158907:web:676bc39ec628622cd5245e",
  measurementId: "G-78XCM86815",
};

firebase.initializeApp(firebaseConfig);
firebase.firestore();
firebase.analytics();

export default firebase;
