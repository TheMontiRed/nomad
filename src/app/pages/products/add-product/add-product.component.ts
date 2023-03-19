import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router"
import { ProductsService } from 'src/app/services/products/products.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit {

  constructor(private router: Router, private productService: ProductsService) { }

  ngOnInit(): void {
  }

  createProduct(product: string, quantity: number, imageUrl: string, description: string, category: string) {
    this.productService.createProduct(product, quantity, description, imageUrl, category);
  }
}
