import { Component, OnInit } from '@angular/core';
import { Category, SubCategory } from 'src/app/models/category.model';
import { TricklesService } from 'src/app/services/trickles.service';

@Component({
  selector: 'app-category-menu',
  templateUrl: './category-menu.component.html',
  styleUrls: ['./category-menu.component.css']
})
export class CategoryMenuComponent implements OnInit {

  category_list_data: any[] = []


  constructor(private tricklesAPI: TricklesService) { }

  ngOnInit(): void {
    this.getCategories()
  }

  getCategories() {
    this.tricklesAPI.GetProductCategoryAndCategoryTypesList()
      .subscribe(data => {
        this.category_list_data = data;
      })
  }

  navigateToCategoryDetails(category: Category): void {
    const url = `/categories?category=${btoa(category.product_cat_id.toString())}`
    window.location.replace(url)
  }

  navigateToSubCategoryDetails(subCategory: any): void {
    const url = `/sub_category/products?sub_category=${btoa(subCategory.product_type_code.toString())}`
    window.location.replace(url)
  }

}
