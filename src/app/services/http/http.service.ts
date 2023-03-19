import { Injectable } from '@angular/core';

import { initializeApp } from "firebase/app";
import { getDatabase, ref, set } from "firebase/database";
import { environment } from 'src/environments/environment';
import { User } from 'src/app/models/user/user';

// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = environment.firebaseConfig;

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Realtime Database and get a reference to the service
const db = getDatabase(app);

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor() {

  }


}
