import firebase from "firebase/app";
import "firebase/auth";

const app = firebase.initializeApp({
  apiKey: "AIzaSyAeVLPdyjKwDGM-zkYMksKqTmL9pEElx4I",
  authDomain: "auth-development-20464.firebaseapp.com",
  projectId: "auth-development-20464",
  storageBucket: "auth-development-20464.appspot.com",
  messagingSenderId: "758971878861",
  appId: "1:758971878861:web:642dc24bc2e598d54ac884",
});

export const auth = app.auth();
export default app;