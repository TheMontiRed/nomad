import { Component, OnDestroy, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Cart } from 'src/app/models/cart';
import { Product } from 'src/app/models/product';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ProductsService } from 'src/app/services/products/products.service';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit, OnDestroy {

  products: Product[];
  product: Product;
  alertMessage: string;
  productSubscription: Subscription;
  authSubscription: Subscription;
  user: string;
  isLoading: boolean;

  constructor(private productService: ProductsService, private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.getProducts();
    this.getUser();
  }

  getUser() {
    this.authSubscription = this.authService.userUid.subscribe(user => {
      const userObject: any = Object.values(user);
      this.user = userObject[4];
    });
  }

  getProducts() {
    this.isLoading = true;
    this.productSubscription = this.productService.getAllProducts().subscribe(products => {
      this.products = products;
    })
    this.isLoading = true;
  }

  addProductToCart(productID: string) {
    this.productService.getProductbyID(productID).subscribe(product => this.product = product);
    if (this.user == '') {
      console.log("There's no user", this.user);
      this.router.navigate(['/signin']);
    } else {
      console.log("There' a user", this.user);
      this.productService.addProductToCart(this.product, productID, this.user);
      this.alertMessage = this.productService.alertMessage;
    }
  }

  ngOnDestroy(): void {
    if (this.authSubscription) {
      this.authSubscription.unsubscribe();
    }
    if (this.productSubscription) {
      this.productSubscription.unsubscribe();
    }
  }
}
