import { Component, OnInit } from '@angular/core';
import { TricklesService } from 'src/app/services/trickles.service';

@Component({
  selector: 'app-home-shop',
  templateUrl: './home-shop.component.html',
  styleUrls: ['./home-shop.component.css']
})
export class HomeShopComponent implements OnInit {

  shops_array_list:any[] = [];

  constructor(private tricklesAPI: TricklesService) { }

  ngOnInit(): void {
    this.getShops()
  }

  getShops() {
    this.tricklesAPI.getShops("GNR")
      .subscribe(
        data => {
          this.shops_array_list = data;
        },
      )
  }

}
