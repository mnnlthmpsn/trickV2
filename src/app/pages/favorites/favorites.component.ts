import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product.model';
import { AuthService } from 'src/app/services/auth.service';
import { TricklesService } from 'src/app/services/trickles.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css']
})
export class FavoritesComponent implements OnInit {

  customer_id: string = ''
  favorites_array_list: Product[] = [];


  constructor(private tricklesAPI: TricklesService, private auth: AuthService) { }

  ngOnInit(): void {
    this.getUserID()
  }

  async getUserID() {
    const res = await this.auth.isAuthenticated()
    this.customer_id = !!res.customer_id && (this.customer_id = res.customer_id.toString())
    this.getBasketItems()
  }

  getBasketItems() {
    this.tricklesAPI.getFavItemsRequest(this.customer_id)
      .subscribe(
        data => {
          if (data.length > 0) {
            data.map((product: any) => {
              this.favorites_array_list.push(Product.fromJson(product))
            })
          }
        },
      )
  }

  removeFromFav(product: Product): void {
    Swal.fire({
      title: 'Trickles',
      text: "Are you sure you want to remove this item from your favorites?",
      icon: 'warning',
      showCancelButton: true,
      cancelButtonText: `No`,
      confirmButtonColor: '#3085d6',
      // cancelButtonColor: '#d33',
      confirmButtonText: 'Yes'
    }).then((result) => {

      if (result.isConfirmed) {

        var params = { customer_id: this.customer_id, prod_offering_id: product.prod_offering_id }

        this.tricklesAPI.RemoveFavoriteRequest(params).subscribe(
          data => {

            if (data) {

              if (data["resp_code"] == "112") {

                var msg = `${product.product_name} has been removed successfully from your favorites.`;

                Swal.fire({
                  title: 'Trickles',
                  text: msg,
                  showCancelButton: false,
                  confirmButtonText: `OK`,
                }).then((result) => {
                  window.location.reload();
                });

              }
              else {
                Swal.fire('Trickles', data["resp_desc"], 'error');
              }
            } else {
              Swal.fire('Trickles', "An error occured", 'error');
            }
          });

      }
    })
  }

}
