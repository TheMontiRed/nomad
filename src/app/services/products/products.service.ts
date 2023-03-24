import { Injectable } from '@angular/core';
import { getDatabase, ref, set, child, get, onValue, push, DataSnapshot, remove, orderByChild, query, equalTo } from "firebase/database";
import { Category } from 'src/app/models/category';
import { AuthService } from '../auth/auth.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { Product } from '../../models/product';
import { Router } from '@angular/router';
import { Cart } from 'src/app/models/cart';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  db = getDatabase();
  private categorySource: BehaviorSubject<any> = new BehaviorSubject('Category');
  private categoriesSource: BehaviorSubject<any> = new BehaviorSubject([]);
  private productSource: BehaviorSubject<any> = new BehaviorSubject('Product');
  private productsSource: BehaviorSubject<any> = new BehaviorSubject([]);
  private cartSource: BehaviorSubject<any> = new BehaviorSubject('');
  gottenCategory = this.categorySource.asObservable();
  categories = this.categoriesSource.asObservable();
  gottenProduct = this.productSource.asObservable();
  products = this.productsSource.asObservable();
  gottenCart = this.cartSource.asObservable();
  errorMessage: string;
  product: Product;
  cart: Cart;
  carts: Cart [];
  alertMessage: any;
  userUid: string;

  constructor(private authService: AuthService, private router: Router) {
    this.authService.userUidSubject.subscribe(user => this.userUid = user.uid);
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

  createProduct(product: string, quantity: number, imageUrl: string, description: string, category: string, price: number) {
    this.product = {
      key: "",
      product: product,
      quantity: quantity,
      imageUrl: imageUrl,
      description: description,
      category: category,
      price: price
    }
    JSON.parse( JSON.stringify(this.product))
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

  getProductbyID(product: string) {
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
    const productRef = query(ref(this.db, 'products/'), orderByChild('category'), equalTo(categoryKey));
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

  getProductsFromCart() {
    var carts: Cart [];
    const productRef = ref(this.db, 'cart/'+ this.userUid);
    onValue(productRef, (snapshot) => {
      carts = this.snapshotToArray(snapshot);
      this.productsSource.next(carts);
    })
    return this.productsSource;
  }

  addProductToCart(product: Product, productID: string) {
    const newKey = push(child(ref(this.db), 'cart')).key;
    set(ref(this.db, 'cart/' + this.userUid + '/' +newKey), {
      key: productID,
      product: product.product,
      quantity: product.quantity,
      imageUrl: product.imageUrl,
      description: product.description,
      category: product.category,
      price: product.price
    })
      .then(res => {
        this.alertMessage = "Item add to cart successfully", res;
        console.log(this.alertMessage + res);
        window.location.reload;
      }).catch (err => {
      this.errorMessage = "Error: " + err.message;
      console.log(this.errorMessage);
    });
    //Navigate to products page
    this.router.navigate(['/dashboard']);
  }

  removeProductFromCart(cartID?: string){
    const cartRef = ref(this.db, "cart/"+this.userUid+"/"+cartID);
    remove(cartRef).then(() =>{
      console.log("Removed successfully");
    })
  }

  editQuantiy(cartID?: string){
    const cartRef = ref(this.db, "cart/"+this.userUid+"/"+cartID);
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

