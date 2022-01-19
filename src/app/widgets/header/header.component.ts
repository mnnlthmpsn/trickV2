import { Component, OnInit } from '@angular/core';
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

  constructor(private tricklesAPI: TricklesService, private auth: AuthService) { }

  ngOnInit(): void {
    this.getUserID()
    this.getCategories()
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
          console.log(data)
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

}
