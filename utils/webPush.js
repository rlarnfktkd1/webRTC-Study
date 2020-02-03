import "firebase/messaging";
import firebase from "firebase/app";
import localforage from "localforage";

const firebaseCloudMessaging = {
  tokenInlocalforage: async () => {
    return localforage.getItem("fcm_token");
  },

  init: async function() {
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

    try {
      if ((await this.tokenInlocalforage()) !== null) {
        return false;
      }

      const messaging = firebase.messaging();
      await messaging.requestPermission();
      const token = await messaging.getToken();

      localforage.setItem("fcm_token", token);
      console.log("fcm_token", token);
    } catch (error) {
      console.error(error);
    }
  }
};

export { firebaseCloudMessaging };
