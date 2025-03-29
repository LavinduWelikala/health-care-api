import { getStorage } from "firebase/storage";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyAIbQhVtziUbGk1VknkzOJmbXIZc-C4Eps",
  authDomain: "fileupload-e9cda.firebaseapp.com",
  projectId: "fileupload-e9cda",
  storageBucket: "fileupload-e9cda.appspot.com",
  messagingSenderId: "1061472647116",
  appId: "1:1061472647116:web:bd3f0c61b512b6d7c04f69",
};

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
