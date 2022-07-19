import {getApp, getApps, initializeApp} from "firebase/app";
import {getFirestore} from 'firebase/firestore';
import {getStorage} from 'firebase/storage';


const firebaseConfig = {
    apiKey: "AIzaSyAhKxJKNMPkq0ngdaIVZmwVd_UXp5WGfvU",
    authDomain: "restaurant-app-d2278.firebaseapp.com",
    databaseURL: "https://restaurant-app-d2278-default-rtdb.firebaseio.com",
    projectId: "restaurant-app-d2278",
    storageBucket: "restaurant-app-d2278.appspot.com",
    messagingSenderId: "334452595128",
    appId: "1:334452595128:web:0b6905993e3b55b899974d"
  };


  const app = getApps.length > 0 ? getApp() : initializeApp(firebaseConfig);
  const firestore = getFirestore(app)
  const storage = getStorage(app)


  export {app, firestore, storage};