import { Component, Input, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product.model';
import { AuthService } from 'src/app/services/auth.service';
import { TricklesService } from 'src/app/services/trickles.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-related-products',
  templateUrl: './related-products.component.html',
  styleUrls: ['./related-products.component.css']
})
export class RelatedProductsComponent implements OnInit {

  @Input() cust_id: string = ''
  @Input() prod_details: any

  products: Product[] = []
  customer_id: string | null = ''

  constructor(private tricklesService: TricklesService, private auth: AuthService) { }

  ngOnInit(): void {
    this.getRelatedProducts()
    this.getCustomerDetails()
  }

  getCustomerDetails() {
    // if customer ID exists, assign to to this.customer_id
    this.auth.isAuthenticated().then(res => {
      !!res.customer_id ? this.customer_id = res.customer_id : this.customer_id = ''
    }).catch(err => this.customer_id = null)
  }

  getRelatedProducts(): void {
    this.tricklesService.GetRelatedProducts(this.cust_id, this.prod_details.product_div_id)
      .subscribe(
        res => res.length > 0 && res.map((data: any) => this.products.push(Product.fromJson(data))),
        err => console.log(err)
      )
  }

  addToFavorites(item: any) {
    if (this.customer_id === '') {
      window.location.href = '/my-account'
      return
    }

    Swal.fire({
      title: 'Trickles',
      text: "You are about adding this item to your favorites.",
      icon: 'warning',
      showCancelButton: true,
      cancelButtonText: 'Cancel',
      confirmButtonColor: '#3085d6',
      // cancelButtonColor: '#d33',
      confirmButtonText: 'Continue'
    }).then((result) => {

      if (result.isConfirmed) {

        var params = { customer_id: this.customer_id, prod_offering_id: item.prod_offering_id }

        this.tricklesService.AddToFavoriteRequest(params).subscribe(
          data => {
            if (data) {
              // alert params
              var alert_params = {
                title: 'Trickles',
                text: `${item.product_name} has been added to your favorites.`,
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

  addToCart(item: any) {
    if (this.customer_id === '') {
      window.location.href = '/my-account'
      return
    }

    var params = { customer_id: this.customer_id, prod_offering_id: item.prod_offering_id, qty: 1, payment_plan: item.payment_plan_id }
    console.log(params)
    console.log(item)
    this.tricklesService.AddToBasketRequest(params).subscribe(
      data => {
        console.log(data)
        if (data['resp_code'].toString() === '112') {
          Swal.fire('Trickles', `Item added successfully`, 'success').then(() => window.location.reload())
        }
        else if (data['resp_code'].toString() === '128') { Swal.fire('Trickles', 'Item already exists', 'warning') }
        else { Swal.fire('Trickles', 'An error occured', 'error') }
      }
    );

  }
}
