import { Component, Input, OnInit } from '@angular/core';
import { Category } from 'src/app/models/category';
import { ProductsService } from 'src/app/services/products/products.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit {

  constructor(private productService: ProductsService) { }

  categories: Category [];

  ngOnInit(): void {
    this.getCategories();
  }

  createProduct(product: string, quantity: number, imageUrl: string, description: string, category: string, price: number) {
    this.productService.createProduct(product, quantity, description, imageUrl, category, price);
  }

  getCategories(){
    this.productService.getAllCategories().subscribe(categories => {
      this.categories = categories;
    })
  }
}
