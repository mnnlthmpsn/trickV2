import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { CryptoService } from 'src/app/services/crypto.service';
import { TricklesService } from 'src/app/services/trickles.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-product-default',
  templateUrl: './product-default.component.html',
  styleUrls: ['./product-default.component.css']
})
export class ProductDefaultComponent implements OnInit {

  myParam: string = '';
  product_info_id: number | string = '';
  full_product_details: any;
  customer_id: string | null = "";
  product_details: any;
  product_images: any;
  fav_item_exists: boolean = false;
  qty_val = 1;
  referralCode: string | number = ''
  ratingForm: FormGroup

  constructor(private route: ActivatedRoute,
    private tricklesAPI: TricklesService,
    private cryptoService: CryptoService,
    private auth: AuthService,
    public fb: FormBuilder
  ) {
    this.ratingForm = this.fb.group({
      rating: ['', Validators.required],
      comment: ['', Validators.required]
    })
  }

  // getter fxns
  get rating() { return this.ratingForm.get('rating') }
  get comment() { return this.ratingForm.get('comment') }

  ngOnInit(): void {
    // this.decryptParam()
    this.getCustomerDetails()
    this.getProductDetails()
  }

  // 1. Get Customer Details
  getCustomerDetails() {
    // if customer ID exists, assign to to this.customer_id
    this.auth.isAuthenticated().then(res => {
      this.customer_id = res.customer_id
      this.CustomerFavItems(this.customer_id)
      this.getReferralCode()
    }).catch(err => this.customer_id = null)
  }

  getReferralCode(): void {
    this.tricklesAPI.GetReferralCode(this.customer_id as string)
      .subscribe(
        res => {
          if (res.resp_code === '00') {
            this.referralCode = res.referral_code
          }
        },
        err => console.log(err)
      )
  }

  getProductDetails() {
    this.route.queryParams.subscribe(params => this.product_info_id = params['product'])
    this.tricklesAPI.getProductDetailsRequest(this.product_info_id, this.customer_id || 'nil')
      .subscribe(
        data => {
          console.log(data)
          // full product detail
          this.full_product_details = data;
          // push images to array only if there are images
          Array.isArray(data[0].images) ? this.product_images = data[0].images : this.product_images = null
          // detailed product info
          this.product_details = data[2];
        },
      )
  }

  submitReview(): void {
    const payload = {
      customer_id: this.customer_id,
      ref_code: this.referralCode,
      rating: this.rating?.value,
      comment: this.comment?.value,
      review_type: 'P'
    }
    this.tricklesAPI.SubmitCustomerReview(payload)
      .subscribe(
        res => res.resp_code === '112'
          ? Swal.fire({ icon: 'success', text: res.resp_desc, confirmButtonColor: '#223263' })
          : Swal.fire({ icon: 'error', text: res.resp_desc, confirmButtonColor: '#223263' }),
        err => Swal.fire({ icon: 'error', text: 'An error occured. Try again later', confirmButtonColor: '#223263' }).then(() => console.log(err))
      )
  }

  // already working. Don't you dare touch this :)
  addItemtoFavorite() {
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

        var params = { customer_id: this.customer_id, prod_offering_id: this.product_details["prod_offering_id"] }

        this.tricklesAPI.AddToFavoriteRequest(params).subscribe(
          data => {
            if (data) {
              // alert params
              var alert_params = {
                title: 'Trickles',
                text: `${this.product_details["product_name"]} has been added to your favorites.`,
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

  addItemtoBasket() {
    var params = { customer_id: this.customer_id, prod_offering_id: this.product_details["prod_offering_id"], qty: this.qty_val, payment_plan: this.product_details["payment_plan_id"] }
    this.tricklesAPI.AddToBasketRequest(params).subscribe(
      data => {
        if (data['resp_code'].toString() === '112') {
          Swal.fire('Trickles', `Item added successfully`, 'success').then(() => window.location.reload())
        }
        else if (data['resp_code'].toString() === '128') { Swal.fire('Trickles', 'Item already exists', 'warning') }
        else { Swal.fire('Trickles', 'An error occured', 'error') }
      }
    );

  }


  CustomerFavItems(customer_id: any) {
    this.tricklesAPI.GetCustomerFavItemsRequest(customer_id)
      .subscribe(data => {
        // resp_code 116 = no record found
        var fav_item = data.resp_code !== '116' && data.filter((s: any) => s.product_info_id == this.product_info_id)
        this.fav_item_exists = fav_item.length > 0 ? true : false
      });
  }
}
