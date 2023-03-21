import { Injectable } from '@angular/core';
import { getDatabase, ref, set, child, get, onValue, push, DataSnapshot } from "firebase/database";
import { Category } from 'src/app/models/category';
import { AuthService } from '../auth/auth.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { Product } from '../../models/product';
import { Router } from '@angular/router';
import { Cart } from 'src/app/models/cart';
import { collection, query, where } from "firebase/firestore";

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  db = getDatabase();
  private categorySource: BehaviorSubject<any> = new BehaviorSubject('Category');
  private categoriesSource: BehaviorSubject<any> = new BehaviorSubject([]);
  private productSource: BehaviorSubject<any> = new BehaviorSubject('Product');
  private productsSource: BehaviorSubject<any> = new BehaviorSubject([]);
  private cartSource: BehaviorSubject<any> = new BehaviorSubject([]);
  gottenCategory = this.categorySource.asObservable();
  categories = this.categoriesSource.asObservable();
  gottenProduct = this.productSource.asObservable();
  products = this.productsSource.asObservable();
  gottenCart = this.cartSource.asObservable();
  errorMessage: string;
  product: Product;
  cart: Cart;
  alertMessage: any;

  constructor(private authService: AuthService, private router: Router) {

  }

  createCategory(category: string, description: string) {
    // Get a key for a new Post.
    const newCategoryKey = push(child(ref(this.db), 'categories')).key;
    set(ref(this.db, 'categories/' + newCategoryKey), {
      category: category,
      description: description
    }).then(res => {
      console.log(res);
    }).catch(error => {
      this.errorMessage = error.message;
    })
  }

  getCategory(category: string): Observable<string> {
    const categoryRef = ref(this.db, 'categories/' + category);
    onValue(categoryRef, (snapshot) => {
      this.categorySource.next(snapshot.val());
    });
    return this.categorySource;
  }

  getAllCategories(): Observable<Category[]> {
    var categories: Category[]
    const categoryRef = ref(this.db, 'categories/');
    onValue(categoryRef, (snapshot) => {
      categories = this.snapshotToArray(snapshot);
      this.categoriesSource.next(categories);
    })
    return this.categoriesSource;
  }

  createProduct(product: string, quantity: number, imageUrl: string, description: string, category: string) {
    this.product = {
      key: "",
      product: product,
      quantity: quantity,
      imageUrl: imageUrl,
      description: description,
      category: category,
    }
    const newProductKey = push(child(ref(this.db), 'products')).key;
    set(ref(this.db, 'products/' + newProductKey), this.product)
      .then(res => {
        this.alertMessage = "Product added successfully", res;
      }).catch(err => {
        this.errorMessage = "Error: " + err.message;
      });
    //Navigate to products page
    this.router.navigate(['/dashboard']);
  }

  getProducts(product: string) {
    const productRef = ref(this.db, 'products/' + product);
    onValue(productRef, (snapshot) => {
      this.productSource.next(snapshot.val());
    });
    return this.productSource;
  }

  getAllProducts() {
    var products: Product[]
    const productRef = ref(this.db, 'products/');
    onValue(productRef, (snapshot) => {
      products = this.snapshotToArray(snapshot);
      this.productsSource.next(products);
    })
    return this.productsSource;
  }

  getProductsByCategory(categoryKey: string) {
    var products: Product[]
    const productRef = ref(this.db, 'products/');
    onValue(productRef, (snapshot) => {
      products = this.snapshotToArray(snapshot);
      this.productsSource.next(products);
    })
    return this.categoriesSource;
  }

  createCart(customer: string) {

    const newCartKey = push(child(ref(this.db), 'cart')).key;
    set(ref(this.db, 'cart/' + newCartKey), customer)
      .then(res => {
        this.alertMessage = "Cart created successfully", res;
        console.log(this.alertMessage + res);
      }).catch(err => {
        this.errorMessage = "Error: " + err.message;
        console.log(this.errorMessage);
      });
    //Navigate to products page
    this.router.navigate(['/dashboard']);
  }

  getProductsInCart(userUid: string): Observable<Cart> {
    const cartRef = ref(this.db, 'cart/' + userUid);
    onValue(cartRef, (snapshot) => {
      const cart = this.snapshotToArray(snapshot);
      this.cartSource.next(cart);
    });
    return this.cartSource;
  }

  addProductToCart(product: string, userUid: string) {
    const newKey = push(child(ref(this.db), 'cart')).key;
    set(ref(this.db, 'cart/' + userUid +'/'+newKey), {
      product: product
    })
      .then(res => {
        // Todo: get number of items in cart
        // Todo: return number of items in cart
        this.alertMessage = "Item add to cart successfully", res;
        console.log(this.alertMessage + res);
      }).catch(err => {
        this.errorMessage = "Error: " + err.message;
        console.log(this.errorMessage);
      });
    //Navigate to products page
    this.router.navigate(['/dashboard']);
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

