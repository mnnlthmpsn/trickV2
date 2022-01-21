import { Component, Input, OnInit } from '@angular/core';
import { SubCategory } from 'src/app/models/category.model';

@Component({
  selector: 'app-subcategory-card',
  templateUrl: './subcategory-card.component.html',
  styleUrls: ['./subcategory-card.component.css']
})
export class SubcategoryCardComponent implements OnInit {

  @Input() sub_category: any = new SubCategory()


  constructor() { }

  ngOnInit(): void {
  }

  navigateToSubCategoryDetails(): void {
    const url = `/sub_category/products?sub_category=${btoa(this.sub_category.prod_type_id.toString())}`
    window.location.replace(url)
  }
}
