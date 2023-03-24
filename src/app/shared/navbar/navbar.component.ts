import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { AuthService } from 'src/app/services/auth/auth.service';
import { ActivatedRoute, Router } from "@angular/router"
import { ProductsService } from 'src/app/services/products/products.service';
import { Subscription } from 'rxjs/internal/Subscription';
import { Cart } from '/Users/es/Documents/DEV/Mara Nomads/nomad/src/app/models/cart';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit, OnDestroy {
  isLoggedIn: boolean;
  displayName: string | null;
  email: string | null;
  isAdmin: boolean = false;
  seeAddProductIcon: false;
  imageURL: "https://as1.ftcdn.net/v2/jpg/04/45/40/06/1000_F_445400651_kagmn1i9TZpCw1HGDBPIBnB1OB5eZ9Rb.jpg";
  productSubscription: Subscription;
  authSubscription: Subscription;
  userUid: any;

  @Input() cart: Cart;

  constructor(private authService: AuthService, private router: Router, private activatedRoute: ActivatedRoute) {
    activatedRoute.params.subscribe(val => {

    });
  }

  cartItems = 0;

  ngOnInit(): void {
    this.getUser()
  }

  async getUser() {
    this.authSubscription = this.authService.userUid.subscribe(user => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        this.isLoggedIn = true;
        this.displayName = user.uid;
        this.imageURL = this.imageURL;
        this.email = user.email;
        this.authService.getUserType(user.uid).then(response => {
          this.isAdmin = response.isAdmin;
          this.userUid = user;
        });
      } else {
        // User is signed out
        this.isAdmin = false;
        this.isLoggedIn = false;
      }
    });
  }

  logout() {
    this.authService.logout();
  }

  login() {
    this.router.navigate(['/signin'])
    console.log("Test");
  }

  addProduct() {
    this.router.navigate(['/add-product'])
    console.log("/add-product");
  }

  viewCart() {
    this.router.navigate(['/cart']).then(() => {
      window.location.reload;
      return false;
    });
  }

  ngOnDestroy(): void {
      if(this.authService){
        this.authSubscription.unsubscribe();
      }
  }
}

