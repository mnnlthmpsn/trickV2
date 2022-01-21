// @ts-nocheck
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { BasketOrders, BasketOrdersAdapter } from 'src/app/models/basket_orders.model';
import CheckoutBasket from 'src/app/models/checkout_basket';
import { AuthService } from 'src/app/services/auth.service';
import { CheckoutService } from 'src/app/services/checkout.service';
import { CryptoService } from 'src/app/services/crypto.service';
import { TricklesService } from 'src/app/services/trickles.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {

  @ViewChild('pt_div') paymentTermForm: ElementRef;

  basketItems: BasketOrders[] = []
  customer_id: string | null = "";
  current_item: BasketOrders;
  total_cart_price = 0;
  checkout_basket: CheckoutBasket;
  payment_plan: any = {}
  paymentTermsForm: FormGroup = new FormGroup({})
  basketordersAdapter = new BasketOrdersAdapter()

  // getter function
  get paymentPlans() {
    return this.paymentTermsForm.get('plans') as FormArray
  }

  // insert form control
  addPaymentTerm(plan: any) {
    this.paymentPlans.push(this.fb.control(plan))
  }

  constructor(
    private tricklesAPI: TricklesService,
    private fb: FormBuilder,
    private cryptoService: CryptoService,
    private checkoutService: CheckoutService,
    private auth: AuthService,
    private router: Router,
  ) {
    this.checkout_basket = new CheckoutBasket([]);
  }

  ngOnInit() {
    // payment terms form
    this.paymentTermsForm = this.fb.group({
      plans: this.fb.array([])
    })
    // payment terms form end

    this.getCustomerID()
  }

  getCustomerID() {
    this.auth.isAuthenticated()
      .then((res: any) => {
        this.customer_id = res.customer_id
        this.getBasketItems()
      })
      .catch((err: any) => this.customer_id = null)
  }

  getBasketItems(): void {
    this.tricklesAPI.GetBasketItems(this.customer_id)
      .subscribe((data: any[]) => {
        console.log(data)
        data.map((item: any) => this.basketItems.push(this.basketordersAdapter.adapt(item)))
      });
  }

  // navigate to product details
  navigateToProductDetails(event: any, product_info_id: any) {
    event.preventDefault();
    var encrypted_product_info_id = this.cryptoService.set(product_info_id);
    this.router.navigate(['/product-details'], { queryParams: { info_id: encrypted_product_info_id } });
  }

  // navigate to to check out page
  navigateToCheckout(e: any) {
    e.preventDefault();

    // pass this to the checkout service
    this.checkoutService.addItems(this.checkout_basket.chosenItems)
    this.router.navigate(['/checkout']);
  }

  // increase order quantity
  increase_qty(item: any): void {
    // update item_qty
    item.qty += 1
    this.updateItem(item)
    this.checkout_basket.dec_or_inc(item)
  }

  // increment by any number
  dynamic_qty(e: any, item: BasketOrders): void {
    e.preventDefault()
    // if value is less than 1 do nothing
    e.target.value < 1 ? null : item.qty = e.target.value
    this.updateItem(item)
    this.checkout_basket.dec_or_inc(item)
  }

  // decrease order quantity
  decrease_qty(item: any): void {
    item.qty <= 1 ? null : item.qty -= 1
    this.updateItem(item)
    this.checkout_basket.dec_or_inc(item)
  }

  // add checked item to checkout_basket
  addToCheckedList(e: any, item: any): void {
    if (e.target.checked) {
      this.checkout_basket.additem(item);
    } else {
      this.checkout_basket.removeItem(item);
    }
  }

  // make api call to return new values
  updateItem(item: any) {
    item.total_amount = Number(item.price) * item.qty
  }

  // remove item from basket -> customer_id, item_list
  removeItemFromBasket(item: BasketOrders) {
    const params = { customer_id: this.customer_id, item_list: `${item.basket_id},` }
    this.tricklesAPI.RemoveItemFromCartRequest(params)
      .subscribe(() => window.location.reload())
  }

  // delete checkedItems
  deleteCheckedItems() {
    let basketIDsToDelete: any = []

    // loop through selected items and push basket_ids to basketIDsToDelete array
    this.checkout_basket.chosenItems.map((item: any) => basketIDsToDelete.push(item.basket_id))

    // join basket_ids in array into a string for api
    const params = { customer_id: this.customer_id, item_list: basketIDsToDelete.join(",") }

    Swal.fire({
      title: "Do you wish to continue?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      confirmButtonText: 'Delete'
    }).then((result) => {
      if (result.isConfirmed) {
        this.tricklesAPI.RemoveItemFromCartRequest(params)
          .subscribe(() => window.location.reload())
      }
    })
  }

  // pay in bits
  payInBits(item: BasketOrders) {
    // params: entity_id, prod_offering_id, qty, payment_plan, customer_id
    const params = { entity_id: item.entity_id, prod_offering_id: item.prod_offering_id, qty: item.qty, payment_plan: item.payment_plan, customer_id: this.customer_id }
    this.tricklesAPI.GetProductPaymentTerms(params)
      .subscribe((data: any) => {
        this.addPaymentTerm(data)
        this.triggerAlert()
        this.current_item = item
      })
  }

  // onTermSelect
  onTermSelect(plan: any) {
    this.payment_plan = plan
  }

  // show terms in swal modal
  triggerAlert() {
    Swal.fire({
      title: "Select Payment Option",
      html: this.paymentTermForm.nativeElement,
      width: '40vw',
      showConfirmButton: true,
      showCancelButton: true
    }).then(res => {
      if (res.isConfirmed) {
        // call post method to add item to myItems here
        // POST save_basket_items
        // params: customer_id, prod_offering_id, qty, payment_plan, payment_duration, payment_term_id
        const params = {
          customer_id: this.customer_id,
          prod_offering_id: this.current_item.prod_offering_id,
          qty: this.current_item.qty,
          payment_plan: this.current_item.payment_plan_id,
          payment_duration: this.current_item.payment_duration,
          payment_term_id: this.payment_plan.payment_term_id
        }
        this.tricklesAPI.SaveBasketItems(params)
          .subscribe((data: any) => {
            // redirect user to my items
            // check if process was successful before redirecting man
            window.location.href="/shopping-my-items"
          }, (err: any) => console.log(err))
      }
    })
  }
}
