import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiCallService } from '../../services/api-call.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [],
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'], // Corrected property name
})
export class ProductComponent implements OnInit {
  id: number = 0;
  title: string = 'Angular Store || ';
  nombre: string = '';
  product: any;

  constructor(
    private route: ActivatedRoute,
    private api: ApiCallService,
    private titleService: Title,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const idParam = params.get('id');
      this.id = idParam ? +idParam : 0; // Convert to a number and handle null
      console.log(this.id);
      if (this.id) {
        this.getItemsById(this.id);
      }
    });
  }

  async getItemsById(id: number) {
    try {
      const data = await this.api.fetchProductById(id);
      if (data) {
        this.nombre = data.nombre;
        this.product = data;
        this.titleService.setTitle(`${this.title} ${this.nombre || id}`);
        console.log(this.product);
      } else {
        console.error('Product data not found');
      }
    } catch (error) {
      console.error('Error fetching product details:', error);
    }
  }
}
