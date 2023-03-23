import { Component, Input, OnInit } from '@angular/core';
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
export class CartComponent implements OnInit {

  constructor(private productService: ProductsService, private authService: AuthService, private router: Router, private activatedRoute: ActivatedRoute) {
      activatedRoute.params.subscribe(val => {

      });
   }

  products: Product[];
  alertMessage: string;
  productSubscription: Subscription;
  authSubscription: Subscription;
  userUid: string;
  isLoading: boolean;
  cart: Cart [];

  ngOnInit(): void {
    this.getProductsFromCart();
  }

  async getProductsFromCart() {
    this.authSubscription = this.authService.userUid.subscribe(user => {
      const userObject: any = Object.values(user);
      this.userUid = userObject[4];
      console.log("User", this.userUid);

      this.productService.getProductsFromCart(this.userUid).subscribe(cart => {
        this.cart = cart;
        console.log(this.cart);
      });
    });
  }
  // Todo
  removeProductFromCart(productKey?: string) {
  }

  checkOut(){
    this.router.navigate(['/checkout']).then(()=>{
      window.location.reload;
      return false;
    });
  }
}
