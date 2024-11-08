import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiCallService } from '../../services/api-call.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [],
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css'],
})
export class CategoryComponent implements OnInit {
  products: any;
  title = 'Angular Store || ';
  limit: number = 12;
  totalLimit: number = 0;
  currentCategory: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private api: ApiCallService,
    private titleService: Title,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.currentCategory = params.get('slug');
      this.titleService.setTitle(`${this.title}${this.currentCategory}`);
      console.log(this.currentCategory);
      if (this.currentCategory) {
        this.getItemsByCategory(this.currentCategory);
      }
    });
  }

  async getItemsByCategory(category: string) {
    try {
      const data = await this.api.fetchProducts(category);
      this.products = data.products;
      this.totalLimit = data.total;
      console.log(data);
    } catch (error) {
      console.error('Error fetching category details:', error);
    }
  }

  navigateToProduct(id: number) {
    this.router.navigate([`/product`, id]);
  }
}
