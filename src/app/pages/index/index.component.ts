import { Component, OnInit } from '@angular/core';
import { TricklesService } from 'src/app/services/trickles.service';
import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

  category_list_data: any[] = []
  banner_data: any[] = []

  carouselOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    autoplay: true,
    lazyLoad: true,
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 1
      },
      740: {
        items: 1
      },
      940: {
        items: 1
      }
    },
    nav: false
  }

  constructor(private tricklesAPI: TricklesService) { }

  ngOnInit(): void {
    this.getCategories()
    this.getBanners()
  }

  getCategories() {
    this.tricklesAPI.GetProductCategoryAndCategoryTypesList()
      .subscribe(data => {
        this.category_list_data = data;
      })
  }

  getBanners() {
    this.tricklesAPI.getHomeBanners()
      .subscribe(
        data => {
          this.banner_data = data;
        },
      )
  }
}
