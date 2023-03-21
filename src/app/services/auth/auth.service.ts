import { Injectable } from '@angular/core';
import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut, onAuthStateChanged  } from "firebase/auth";
import { getDatabase, ref, set, child, get } from "firebase/database";
import { environment } from 'src/environments/environment';
import { IsActiveMatchOptions, Router } from "@angular/router"
import { BehaviorSubject } from 'rxjs';
import { User } from 'src/app/models/user';

const app = initializeApp(environment.firebaseConfig);
const auth = getAuth(app);

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userUidSubject: BehaviorSubject<any> = new BehaviorSubject('');
  userUid = this.userUidSubject.asObservable();

  isLoading: boolean = false;
  isLoggedin: boolean = false;
  errorMessage: string = "";
  isAdmin: boolean;
  displayName: string;
  imageURL: any;
  email: string | null;


  constructor(private router: Router) {
    this.updateUser();
  }

  async signup(email: string, password: string, isAdmin: boolean) {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        this.isLoggedin = true;
        // Add entry in userType DB
        this.writeUserData(userCredential.user.uid, isAdmin);
        // Navigate to dashbaord
        this.router.navigate(['/dashboard']);
        // Signed in
        console.log(userCredential.user);
        this.errorMessage = "";
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        this.errorMessage = errorMessage;
        // ..
      });
  }

  async signin(email: string, password: string) {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Get user type
        this.getUserType(userCredential.user.uid);
        // Navigate to dashbaord
        this.router.navigate(['/dashboard']);
        // Signed in
        console.log(userCredential.user);

        this.errorMessage = "";
        // ...
      })
      .catch((error) => {
        const errorMessage = error.message;
        this.errorMessage = errorMessage;
      });
  }

  logout() {
    const auth = getAuth();
    signOut(auth).then(() => {
      console.log("Sign-out successful.");
      location.reload();
    }).catch((error) => {
      console.log("An error");
    });
  }

  writeUserData(userId: string, isAdmin: boolean) {
    const db = getDatabase();
    set(ref(db, 'userType/' + userId), {
      isAdmin: isAdmin
    });
  }

  getUserType(userId: string) {
    const dbRef = ref(getDatabase());
    return get(child(dbRef, `userType/${userId}`)).then((snapshot) => {
      if (snapshot.exists()) {
        return snapshot.val();
      } else {
        console.log("No data available");
      }
    }).catch((error) => {
      console.error(error);
    });
  }

  updateUser() {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        this.userUidSubject.next(user.uid);
        this.isLoggedin = true;
        this.displayName = user.uid;
        this.imageURL = this.imageURL;
        this.email = user.email;

        this.getUserType(user.uid).then(response => {
          this.isAdmin = response.isAdmin;
        });
      } else {
        // User is signed out
        this.isAdmin = false;
        this.isLoggedin = false;
        this.displayName = "";
        this.imageURL = "";
        this.email = "";
      }
    });
  }
}
