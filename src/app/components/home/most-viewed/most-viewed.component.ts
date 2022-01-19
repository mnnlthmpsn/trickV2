import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product.model';
import { TricklesService } from 'src/app/services/trickles.service';

@Component({
  selector: 'app-most-viewed',
  templateUrl: './most-viewed.component.html',
  styleUrls: ['./most-viewed.component.css']
})
export class MostViewedComponent implements OnInit {

  most_viewed_items: Product[] = []

  constructor(private tricklesAPI: TricklesService) { }

  ngOnInit(): void {
    this.getMostViewedItems()
  }

  getMostViewedItems() {
    this.tricklesAPI.getMostViewedItemsRequest()
      .subscribe(
        (data: any[]) => {
          data.map(product => {
            this.most_viewed_items.push(Product.fromJson(product))
          })
        },
      )
  }

}
