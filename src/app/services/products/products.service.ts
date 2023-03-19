import { Injectable } from '@angular/core';
import { getDatabase, ref, set, child, get, onValue, push, DataSnapshot } from "firebase/database";
import { Category } from 'src/app/models/category';
import { AuthService } from '../auth/auth.service';
import { from, Observable } from 'rxjs';
import { Subject, throwError } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  categoriesChanged = new Subject<Category[]>();
  userUid: string;
  categories: Category[];

  constructor(private authService: AuthService) {
    this.userUid = authService.userUid;
  }

  createCategory(category: string, description: string) {
    const db = getDatabase();
    // Get a key for a new Post.
    const newCategoryKey = push(child(ref(db), 'categories')).key;
    set(ref(db, 'categories/' + newCategoryKey), {
      category: category,
      description: description
    }).then(res => {
      console.log(res);
    })
  }

  createProduct(product: string, quantity: number, imageUrl: string, description: string, category: string) {
    const db = getDatabase();
    // Get a key for a new Post.
    const newProductKey = push(child(ref(db), 'products')).key;
    set(ref(db, 'products/' + newProductKey), {
      product: product,
      quantity: quantity,
      imageUrl: imageUrl,
      description: description,
      category: category,
    }).then(res => {
      console.log(res);
    })
  }

  snapshotToArray(snapshot: DataSnapshot) {
    var returnArr: any[] = [];

    snapshot.forEach(function (childSnapshot) {
      var item = childSnapshot.val();
      item.key = childSnapshot.key;

      returnArr.push(item);
    });
    return returnArr;
  };
}

