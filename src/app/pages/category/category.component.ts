import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/models/category';
import { ProductsService } from 'src/app/services/products/products.service';
import { getDatabase, ref, set, child, get, onValue, push, DataSnapshot } from "firebase/database";
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

  getCategory(category: string) {
    const db = getDatabase();
    const categoryRef = ref(db, 'categories/' + category);
    onValue(categoryRef, (snapshot) => {
      const data = snapshot.val()
      console.log(data);
    });
  }

  getAllCategories() {
    const db = getDatabase();
    const categoryRef = ref(db, 'categories/');
    onValue(categoryRef, (snapshot) => {
      this.categories = this.productService.snapshotToArray(snapshot);
      console.log(this.categories);
    })
  }
}
