import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { Category } from 'src/app/models/category.model';
import { TricklesService } from 'src/app/services/trickles.service';

@Component({
  selector: 'app-top-categories',
  templateUrl: './top-categories.component.html',
  styleUrls: ['./top-categories.component.css']
})
export class TopCategoriesComponent implements OnInit {

  top_categories_array_list: Category[] = []

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
    this.getTopCategories()
  }

  getTopCategories() {
    this.tricklesAPI.GetTopCategoriesRequest()
      .subscribe(data => {
        data.map((category: any) => {
          this.top_categories_array_list.push(Category.fromJson(category))
        })
      })
  }
}
