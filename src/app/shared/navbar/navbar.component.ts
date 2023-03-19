import { Component, OnInit } from '@angular/core';
import { getAuth, onAuthStateChanged} from "firebase/auth";
import { AuthService } from 'src/app/services/auth/auth.service';
import {Router} from "@angular/router"

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  isLoggedIn: boolean;
  displayName: string | null;
  email: string | null;
  isAdmin: boolean = false;
  seeAddProductIcon: false;
  imageURL: "https://as1.ftcdn.net/v2/jpg/04/45/40/06/1000_F_445400651_kagmn1i9TZpCw1HGDBPIBnB1OB5eZ9Rb.jpg";

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {

    const auth = getAuth();

    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        this.isLoggedIn = true;
        this.displayName = user.uid;
        this.imageURL = this.imageURL;
        this.email = user.email;
        this.authService.getUserType(user.uid).then(response=>{
          this.isAdmin = response.isAdmin;
        });
      } else {
        // User is signed out
        this.isAdmin = false;
        this.isLoggedIn = false;
      }
    });
  }

  logout(){
    this.authService.logout();
  }

  login(){
    this.router.navigate(['/signin'])
    console.log("Test");
  }

  addProduct(){
    this.router.navigate(['/add-product'])
    console.log("/add-product");
  }
}
