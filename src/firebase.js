import { initializeApp } from 'firebase/app';
import { getDatabase, ref, set } from 'firebase/database';

const firebaseConfig = {
    apiKey: "AIzaSyBTJzRRNohHl-9RqyxdTzN1LV1bJExiNmk",
  authDomain: "location-4e154.firebaseapp.com",
  datbaseURL : "https://location-4e154-default-rtdb.firebaseio.com/",
  projectId: "location-4e154",
  storageBucket: "location-4e154.appspot.com",
  messagingSenderId: "359589036309",
  appId: "1:359589036309:web:0c7b50999b28e31269e91c"

};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export { database, ref, set };
