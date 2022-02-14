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

  customer_id?: string
  categories: any[] = []
  menus: any[] = []

  basket_items: any[] = []
  favorite_items: any[] = []

  constructor(private auth: AuthService, private tricklesAPI: TricklesService) {
    this.menus = [
      { name: 'Home', route: '/' },
      { name: 'About', route: '/about' }
    ]
  }

  ngOnInit(): void {
    this.getUserID()
  }

  async getUserID(): Promise<void> {
    const res = await this.auth.isAuthenticated()
    this.customer_id = !!res.customer_id && res.customer_id.toString()

    if (!!this.customer_id) {
      this.getBasketItems()
      this.getFavItems()
    }

  }


  // get basket items
  getBasketItems(): void {
    this.tricklesAPI.getBasketItemsRequest(this.customer_id!)
      .subscribe({
        next: res => this.basket_items = !!res && res,
        error: err => `Log ${err}`
      })
  }

  // get favorite items
  getFavItems(): void {
    this.tricklesAPI.getFavItemsRequest(this.customer_id!)
      .subscribe({
        next: res => this.favorite_items = !!res && res,
        error: err => `Log ${err}`
      })
  }
}
