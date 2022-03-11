import firebase from 'firebase';
require('@firebase/firestore')

var firebaseConfig = {
  apiKey: "AIzaSyB-eEbhraA0gufIAH5xUaRGSwmskWeUyWE",
  authDomain: "recipe-app-6f4cc.firebaseapp.com",
  projectId: "recipe-app-6f4cc",
  storageBucket: "recipe-app-6f4cc.appspot.com",
  messagingSenderId: "692121469165",
  appId: "1:692121469165:web:d2fa1f7ecd015ba2148ce4"
};
  
  firebase.initializeApp(firebaseConfig);

  export default firebase.firestore();