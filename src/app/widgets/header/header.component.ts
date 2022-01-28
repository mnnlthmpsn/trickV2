import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Category, SubCategory } from 'src/app/models/category.model';
import { AuthService } from 'src/app/services/auth.service';
import { TricklesService } from 'src/app/services/trickles.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  category_list_data: any[] = []
  customer_id: string | null = null
  basket_array_list: any[] = []
  basket_items_count: number = 0
  fav_items_count: number = 0
  confirmed_items_count: number = 0
  searchForm: FormGroup

  constructor(private tricklesAPI: TricklesService, private fb:FormBuilder, private router: Router, private auth: AuthService) {
    this.searchForm = this.fb.group({
      search_name: ['', Validators.required]
    })
   }

  ngOnInit(): void {
    this.getUserID()
    this.getCategories()
  }

  // getter fxn
  get search_name() {
    return this.searchForm.get('search_name')
  }

  // get categories
  getCategories() {
    this.tricklesAPI.GetProductCategoryAndCategoryTypesList()
      .subscribe(data => {
        this.category_list_data = data;
      })
  }

  // get user
  async getUserID() {
    const res = await this.auth.isAuthenticated()
    this.customer_id = !!res.customer_id && (this.customer_id = res.customer_id.toString())
    this.getBasketItems()
    this.getFavItems()
    this.getConfirmedItems()
  }

  getBasketItems() {
    this.tricklesAPI.getBasketItemsRequest(this.customer_id)
      .subscribe(
        data => {
          this.basket_array_list = data;
          this.basket_items_count = this.basket_array_list.length || 0;
        },
      )
  }

  getFavItems() {
    this.tricklesAPI.getFavItemsRequest(this.customer_id)
      .subscribe(
        data => {
          this.fav_items_count = data.length || 0;
        },
      )
  }

  getConfirmedItems() {
    this.tricklesAPI.getMyItemsRequest(this.customer_id, "AL")
      .subscribe(
        data => {
          this.confirmed_items_count = data.length || 0;
        },
      )
  }

  searchItem(): void {
    if (this.searchForm.valid) {
      let storageItems = JSON.parse(localStorage.getItem('searchedItems') || '[]')

      // check if item already exists in array
      storageItems.push(this.search_name?.value)
      localStorage.setItem('searchedItems', JSON.stringify(storageItems))

      this.router.navigate(['/query'], {queryParams: { search_name: this.search_name?.value }})

    }
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
