import { Injectable } from '@angular/core';
import { getDatabase, ref, set, child, get, onValue, push } from "firebase/database";
import { Category } from 'src/app/models/category';
import { AuthService } from '../auth/auth.service';
import { from, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  userUid: string;

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
    });
  }

  getCategory(category: string) {
    const db = getDatabase();
    const starCountRef = ref(db, 'categories/' + category);
    return onValue(starCountRef, (snapshot) => {
      const data = snapshot.val();
      console.log(data);
    });
  }
}
