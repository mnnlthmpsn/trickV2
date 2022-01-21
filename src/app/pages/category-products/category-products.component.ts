import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/models/product.model';
import { TricklesService } from 'src/app/services/trickles.service';

@Component({
  selector: 'app-category-products',
  templateUrl: './category-products.component.html',
  styleUrls: ['./category-products.component.css']
})
export class CategoryProductsComponent implements OnInit {

  items: Product[] = []

  constructor(private route: ActivatedRoute, private tricklesService: TricklesService) { }

  ngOnInit(): void {
    this.getURLParams()
  }

  // get url params
  getURLParams(): void {
    this.route.queryParams.subscribe(params => {
      let product_type_id = JSON.parse(atob(params['sub_category']))
      this.getItems(product_type_id.toString())
    })
  }

  getItems(prod_type_id: string): void {
    this.tricklesService.getItemsByProductType(prod_type_id)
      .subscribe({
        next: (data) => {
          data.map((product: any) => this.items.push(Product.fromJson(product)))
        },
        error: (err) => console.log(err)
      }
      )
  }
}
