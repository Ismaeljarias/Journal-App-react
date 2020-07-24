import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_apiKey,
  authDomain: process.env.REACT_APP_authDomain,
  databaseURL: process.env.REACT_APP_databaseURL,
  projectId: process.env.REACT_APP_projectId,
  storageBucket: process.env.REACT_APP_storageBucket,
  messagingSenderId: process.env.REACT_APP_messagingSenderId,
  appId: process.env.REACT_APP_appId,
};

// const firebaseConfigTesting = {
//   apiKey: process.env.REACT_APP_apiKeyTest,
//   authDomain: process.env.REACT_APP_authDomainTest,
//   databaseURL: process.env.REACT_APP_databaseURLTest,
//   projectId: process.env.REACT_APP_projectIdTest,
//   storageBucket: process.env.REACT_APP_storageBucketTest,
//   messagingSenderId: process.env.REACT_APP_messagingSenderIdTest,
//   appId: process.env.REACT_APP_appIdTest,
// };

// if (process.env.NODE_ENV === "test") {
//   // testing

//   // Initialize Firebase
//   firebase.initializeApp(firebaseConfigTesting);
// } else {
//   // dev/prod

//   // Initialize Firebase
//   firebase.initializeApp(firebaseConfig);
// }

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

export { db, googleAuthProvider, firebase };
