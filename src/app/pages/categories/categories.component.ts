import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SubCategory } from 'src/app/models/category.model';
import { TricklesService } from 'src/app/services/trickles.service';


@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {

  sub_categories: SubCategory[] = []

  constructor(private route: ActivatedRoute, private tricklesAPI: TricklesService) { }

  ngOnInit(): void {
    this.getURLParams()
  }

  // get url params
  getURLParams(): void {
    this.route.queryParams.subscribe(params => {
      let product_cat_id = JSON.parse(atob(params['category']))
      this.get_subCategories(product_cat_id)
    })
  }

  // get subcategories for category
  get_subCategories(id: string): void {
    this.tricklesAPI.GetSubCategories(id)
      .subscribe({
        next: (res) => {
          console.log(res)
          if (!!res) {
            res.map((sub_cat:any) => {
              this.sub_categories.push(SubCategory.fromJson(sub_cat))
            })
          }
        },
        error: (err) => console.log(err)
      })
  }

}
