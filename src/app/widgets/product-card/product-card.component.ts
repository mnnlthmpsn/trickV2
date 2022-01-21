import { Component, OnInit, Input } from '@angular/core';
import { Customer } from 'src/app/models/customer.model';
import { Product } from 'src/app/models/product.model';
import { AuthService } from 'src/app/services/auth.service';
import { TricklesService } from 'src/app/services/trickles.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent implements OnInit {

  @Input() product: Product = new Product()
  customer_id: string = '';


  constructor(private tricklesAPI: TricklesService, private auth: AuthService) {}

  ngOnInit(): void {
    this.getUserID()
  }

  async getUserID() {
    const res = await this.auth.isAuthenticated()
    this.customer_id = !!res.customer_id && (this.customer_id = res.customer_id.toString())
  }

  addToFavorites() {
    if (this.customer_id === '') {
      window.location.href = '/my-account'
      return
    }

    Swal.fire({
      text: `Add ${this.product.product_name} to favorites?`,
      icon: 'warning',
      showCancelButton: true,
      cancelButtonText: 'Cancel',
      confirmButtonColor: '#3085d6',
      // cancelButtonColor: '#d33',
    }).then((result) => {

      if (result.isConfirmed) {

        var params = { customer_id: this.customer_id, prod_offering_id: this.product.prod_offering_id }

        this.tricklesAPI.AddToFavoriteRequest(params).subscribe(
          data => {
            if (data) {
              // alert params
              var alert_params = {
                title: 'Trickles',
                text: `${this.product.product_name} has been added to your favorites.`,
                showCancelButton: false,
                confirmButtonText: `OK`
              }


              if (data["resp_code"] == "112") {
                // alert if successful
                Swal.fire(alert_params).then(() => window.location.reload())
              } else if (data["resp_code"] == "135") {
                // alert if item already exists
                Swal.fire('Trickles', "Item already exists in your favorites", 'error');
              }
              else {
                // unknown error
                Swal.fire('Trickles', data["resp_desc"], 'error');
              }
            } else {
              // error adding item to favorites
              Swal.fire('Trickles', "An error occured", 'error');
            }
          });

      }
    })

  }

  addToCart() {
    if (this.customer_id === '') {
      window.location.href = '/my-account'
      return
    }

    var params = { customer_id: this.customer_id, prod_offering_id: this.product.prod_offering_id, qty: 1, payment_plan: this.product.payment_plan_id }
    this.tricklesAPI.AddToBasketRequest(params).subscribe(
      data => {
        console.log(data)
        if (data['resp_code'].toString() === '112') {
          Swal.fire('Trickles', `${this.product.product_name} added successfully`, 'success').then(() => window.location.reload())
        }
        else if (data['resp_code'].toString() === '128') { Swal.fire('Trickles', 'Item already exists', 'warning') }
        else { Swal.fire('Trickles', 'An error occured', 'error') }
      }
    );

  }
}
