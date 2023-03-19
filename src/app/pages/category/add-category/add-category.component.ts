import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/models/category';
import { ProductsService } from 'src/app/services/products/products.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { from, Observable } from 'rxjs';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.scss']
})
export class AddCategoryComponent implements OnInit {

  constructor(private productService: ProductsService) { }

  category: Category;

  ngOnInit(): void {

  }

  addCategory(category: string, description: string){
    this.productService.createCategory(category, description);
  }

  getCategory(category: string){
    this.productService.getCategory(category);
  }
}
