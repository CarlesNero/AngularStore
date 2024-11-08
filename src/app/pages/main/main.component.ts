import { Component, OnInit } from '@angular/core';
import { ApiCallService } from '../../services/api-call.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css',
})
export class MainComponent implements OnInit {
  constructor(private api: ApiCallService, private router: Router) {}
  ngOnInit(): void {
    this.getAllCategories();
    this.getAllProducts();
  }

  categories: any[] = [];
  products: any[] = [];
  limit: number = 12;
  totalLimit: number = 0;

  async getAllCategories() {
    const data = await this.api.fetchCategories();
    this.categories = data;
    /*  console.log(this.categories); */
  }

  async getAllProducts() {
    const data = await this.api.fetchAllProducts(this.limit);
    this.products = data.products;
    this.totalLimit = data.total;
    console.log(this.products);
    console.log(this.totalLimit);
  }

  showMore(): void {
    if (this.limit + 12 < this.totalLimit) {
      this.limit += 12;
    } else {
      this.limit = this.totalLimit;
    }

    this.getAllProducts();
  }

  navigateToCategory(slug: string) {
    this.router.navigate([`/category`, slug]);
  }

  navigateToProduct(id: number) {
  this.router.navigate([`/product`, id]);
  }
}
