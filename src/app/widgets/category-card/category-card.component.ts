import { Component, OnInit, Input } from '@angular/core';
import { Category } from 'src/app/models/category.model';

@Component({
  selector: 'app-category-card',
  templateUrl: './category-card.component.html',
  styleUrls: ['./category-card.component.css']
})
export class CategoryCardComponent implements OnInit {

  @Input() category: Category = new Category()

  constructor() { }

  ngOnInit(): void {
  }

  navigateToCategoryDetails(): void {
    const url = `/categories?category=${btoa(this.category.product_cat_id.toString())}`
    window.location.replace(url)
  }
}
