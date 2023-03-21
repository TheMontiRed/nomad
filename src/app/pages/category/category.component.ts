import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Category } from 'src/app/models/category';
import { ProductsService } from 'src/app/services/products/products.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {

  constructor(private productService: ProductsService) { }

  categories: Category[] = [];

  ngOnInit(): void {
    this.getAllCategories();
  }

  getAllCategories(){
    this.productService.getAllCategories().subscribe(categories => {
      this.categories = categories;
    })
  }
}
