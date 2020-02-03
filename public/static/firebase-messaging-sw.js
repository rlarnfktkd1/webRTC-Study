/* global importScripts, firebase */
importScripts("https://www.gstatic.com/firebasejs/4.8.1/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/4.8.1/firebase-messaging.js");

firebase.initializeApp({
  apiKey: "AIzaSyC6vTBw9yAGyRZIFqVhClF0-_ct1XiMyJQ",
  authDomain: "next-ts-push.firebaseapp.com",
  databaseURL: "https://next-ts-push.firebaseio.com",
  projectId: "next-ts-push",
  storageBucket: "next-ts-push.appspot.com",
  messagingSenderId: "755075810458",
  appId: "1:755075810458:web:520762c19fb8769f2bcb23",
  measurementId: "G-2KD0B3V0EQ"
});

firebase.messaging();
// var firebaseConfig = {
// apiKey: "AIzaSyC6vTBw9yAGyRZIFqVhClF0-_ct1XiMyJQ",
// authDomain: "next-ts-push.firebaseapp.com",
// databaseURL: "https://next-ts-push.firebaseio.com",
// projectId: "next-ts-push",
// storageBucket: "next-ts-push.appspot.com",
// messagingSenderId: "755075810458",
// appId: "1:755075810458:web:520762c19fb8769f2bcb23",
// measurementId: "G-2KD0B3V0EQ"
// };
