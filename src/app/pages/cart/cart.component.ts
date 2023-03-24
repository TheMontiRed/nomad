import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
export class CartComponent implements OnInit, OnDestroy {

  constructor(private productService: ProductsService, private authService: AuthService, private router: Router, private activatedRoute: ActivatedRoute) {
    activatedRoute.params.subscribe(val => {
    });
  }

  products: Product[];
  alertMessage: string;
  productSubscription: Subscription;
  authSubscription: Subscription;
  userUid: string;
  user: any;
  isLoading: boolean;
  quantity: number;
  total: number;
  cart: Cart[];

  ngOnInit(): void {
    this.getProductsFromCart();
  }

  async getProductsFromCart() {
    this.productService.getProductsFromCart().subscribe(cart => {
      console.log("Cart -> ", cart);
      this.cart = cart;
    });
  }

  addProductsToCart() {
    this.productService.getProductsFromCart().subscribe(cart => {
      this.cart = cart;
    });
  }
  // Todo
  removeProductFromCart(cartKey?: string) {
    this.productService.removeProductFromCart(cartKey);
  }

  editQuantity(cartID?: string){
    this.productService.editQuantiy(cartID);
  }

  checkOut() {
    this.router.navigate(['/checkout']).then(() => {
      window.location.reload;
      return false;
    });
  }

  ngOnDestroy(): void {
      if(this.authSubscription){
        this.authSubscription.unsubscribe();
      }
      if(this.productSubscription){
        this.productSubscription.unsubscribe();
      }
  }
}
