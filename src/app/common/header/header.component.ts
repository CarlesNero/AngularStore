import { Component, OnInit } from '@angular/core';
import { ApiCallService } from '../../services/api-call.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent implements OnInit {
  constructor(private api: ApiCallService, private router: Router) {}
  ngOnInit(): void {
    this.getAllCategories();
    this.state = false;
  }

  categories: any[] = [];

  async getAllCategories() {
    const data = await this.api.fetchCategories();
    this.categories = data;
   /*  console.log(this.categories); */
  }

  state: boolean = false;

  openNav(): void {
    const navContent = document.querySelector('.content') as HTMLElement;
    navContent.classList.toggle('hidden');
    this.state = !this.state; // Toggle state
  }

  navigateToCategory(slug: string) {
    this.router.navigate([`/category`, slug]);
  }
}
