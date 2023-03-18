import { Injectable } from '@angular/core';
import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword } from "firebase/auth";

// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
  apiKey: "AIzaSyALtLhcdoNOMxzDKwUmZCR1QZRjE0mdRmA",
  authDomain: "nomad-33e4d.firebaseapp.com",
  projectId: "nomad-33e4d",
  storageBucket: "nomad-33e4d.appspot.com",
  messagingSenderId: "834843844929",
  appId: "1:834843844929:web:44152ea3396aa75d9a41c0",
  measurementId: "G-HHMJBBFTR3"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isLoading: boolean = false;
  errorMessage: string = "";

  constructor() { }

  async signup(email: string, password: string) {

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(user);
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage);
        // ..
      });
  }

  async signin(email: string, password: string) {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  }
}
