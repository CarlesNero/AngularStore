import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ApiCallService {
  constructor() {}

  async fetchCategories() {
    const response = await fetch(`https://dummyjson.com/products/categories`);
    const data = await response.json();
    return data;
  }

  async fetchAllProducts(limit: number) {
    const response = await fetch(
      `https://dummyjson.com/products?limit=${limit}`
    );
    const data = await response.json();
    return data;
  }

  async fetchProducts(category: string) {
    const response = await fetch(
      `https://dummyjson.com/products/category/${category}`
    );
    const data = await response.json();
    return data;
  }

  async fetchProductById(id: number) {
    const response = await fetch(`https://dummyjson.com/products/${id}`);
    const data = await response.json();
    return data;
  }
}
