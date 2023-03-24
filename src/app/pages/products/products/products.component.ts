import { Component, OnDestroy, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { Product } from 'src/app/models/product';
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

  constructor(private productService: ProductsService) { }

  ngOnInit(): void {
    this.getProducts();
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
      this.productService.addProductToCart(this.product, productID);
      this.alertMessage = this.productService.alertMessage;
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
