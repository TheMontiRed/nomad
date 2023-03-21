import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { pipe, Subscription } from 'rxjs';

import { Cart } from 'src/app/models/cart';
import { Product } from 'src/app/models/product';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ProductsService } from 'src/app/services/products/products.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {


  constructor(private productService: ProductsService, private authService: AuthService, private router: Router) { }

  products: Product[];
  alertMessage: string;
  productSubscription: Subscription;
  authSubscription: Subscription;
  userUid: string;
  isLoading: boolean;
  cart: Cart;


  ngOnInit(): void {
    this.getUser();
    this.getProductsFromCart();
  }

  getUser() {
    this.authSubscription = this.authService.userUid.subscribe(user => {
      this.userUid = user;
    });
  }

  getProductsFromCart() {
    this.productService.getProductsInCart(this.userUid).subscribe(cart => {
      Object.values(cart).map(pipe((x:Cart) => {
        this.cart = x;
        console.log(x);
      }));
    });
  }

  // Todo
  removeProductFromCart(){

  }


}
