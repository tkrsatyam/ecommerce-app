import { EventEmitter, Injectable } from '@angular/core';
import { product } from '../data-type';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  cartDataEvent = new EventEmitter<product[]>()

  constructor(private readonly http: HttpClient, private readonly router: Router) { }

  addProduct(data: product) {
    return this.http.post('http://localhost:3000/product', data);
  }

  productList() {
    return this.http.get<product[]>('http://localhost:3000/product');
  }

  deleteProduct(id: number) {
    return this.http.delete(`http://localhost:3000/product/${id}`)
  }

  getProduct(id: string) {
    return this.http.get<product>(`http://localhost:3000/product/${id}`)
  }

  updateProduct(product: product) {
    return this.http.put<product>(`http://localhost:3000/product/${product.id}`, product)
  }

  redirectToList() {
    setTimeout(() => {
      this.router.navigate(["/seller-home"]);
    }, 2000);
  }

  showPopularProducts() {
    return this.http.get<product[]>('http://localhost:3000/product?_limit=4');
  }

  exploreProducts() {
    return this.http.get<product[]>('http://localhost:3000/product?_limit=8');
  }

  localAddToCart(data: product) {
    let cartData: product[] = [];
    let localCart = localStorage.getItem('localCart');

    if (data.cartQty === undefined) {
      data.cartQty = 0;
    }

    if (!localCart) {
      localStorage.setItem('localCart', JSON.stringify([data]));
    } else {
      cartData = JSON.parse(localCart);

      const existingProduct = cartData.find(item => item.id === data.id);

      if (existingProduct) {
        existingProduct.cartQty = (existingProduct.cartQty || 0) + data.cartQty;
      } else {
        cartData.push(data);
      }

      localStorage.setItem('localCart', JSON.stringify(cartData));
      this.cartDataEvent.emit(cartData);
    }
  }

}
