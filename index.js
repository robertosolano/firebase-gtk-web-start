// Import stylesheets
import './style.css';
// Firebase App (the core Firebase SDK) is always required and must be listed first
import * as firebase from "firebase/app";

// Add the Firebase products that you want to use
import "firebase/auth";
import "firebase/firestore";

import * as firebaseui from 'firebaseui';

// Document elements
const startRsvpButton = document.getElementById('startRSVP');
const guestbookContainer = document.getElementById('guestbook-container');

const form = document.getElementById('leave-message');
const input = document.getElementById('message');
const guestbook = document.getElementById('guestbook');
const numberAttending = document.getElementById('number-attending');
const rsvpYes = document.getElementById('rsvp-yes');
const rsvpNo = document.getElementById('rsvp-no');

var rsvpListener = null;
var guestbookListener = null;

// Add Firebase project configuration object here
// var firebaseConfig = {};
var firebaseConfig = {
    apiKey: "AIzaSyBr4cfLpSLI2wgHZteTXkekBkF2yTfY6dk",
    authDomain: "fir-web-codelab-a1ceb.firebaseapp.com",
    databaseURL: "https://fir-web-codelab-a1ceb.firebaseio.com",
    projectId: "fir-web-codelab-a1ceb",
    storageBucket: "fir-web-codelab-a1ceb.appspot.com",
    messagingSenderId: "977590718262",
    appId: "1:977590718262:web:44bdfbd477cc4d2e8cad97"
  };

// Inicializar la App Firebase 
firebase.initializeApp(firebaseConfig);

// FirebaseUI config
const uiConfig = {
  credentialHelper: firebaseui.auth.CredentialHelper.NONE,
  signInOptions: [
    // Email / Password Provider.
    firebase.auth.EmailAuthProvider.PROVIDER_ID
  ],
  callbacks: {
    signInSuccessWithAuthResult: function(authResult, redirectUrl){
      // Handle sign-in.
      // Return false to avoid redirect.
      return false;
    }
  }
};

const ui = new firebaseui.auth.AuthUI(firebase.auth());

startRSVP.addEventListener("click",()=> {
  if (firebase.auth().currentUser) {
    firebase.auth().signOut();
  } else {
      ui.start("#firebaseui-auth-container",uiConfig)
  }
});

firebase.auth().onAuthStateChanged((user)=> {
  if (user) {
     startRsvpButton.textContent = "logout"
  } else {
     startRsvpButton.textContent = "RSVP"
  }
});