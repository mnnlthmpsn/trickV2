import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { Product } from 'src/app/models/product.model';
import { TricklesService } from 'src/app/services/trickles.service';

@Component({
  selector: 'app-new-arrivals',
  templateUrl: './new-arrivals.component.html',
  styleUrls: ['./new-arrivals.component.css']
})
export class NewArrivalsComponent implements OnInit {

  new_arrivals_items_array_list: Product[] = []

  carouselOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    navText: ['', ''],
    navSpeed: 700,
    autoplay: true,
    lazyLoad: true,
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 4
      }
    },
    nav: true
  }

  constructor(private tricklesAPI: TricklesService) { }

  ngOnInit(): void {
    this.getNewArrivalsItems();
  }

  getNewArrivalsItems() {
    this.tricklesAPI.GetNewArrivalsRequest()
      .subscribe(
        data => {
          if (!data["resp_code"]) {
            data.map((product: any) => {
              this.new_arrivals_items_array_list.push(Product.fromJson(product))
            })
          }
        },
      )
  }

}
