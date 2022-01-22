import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { CryptoService } from 'src/app/services/crypto.service';
import { TricklesService } from 'src/app/services/trickles.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  checkoutItems: any[] = []
  customer_id: string | null = ''
  total_charge: any
  payment_mode: string = ''
  selectedWallet: any

  constructor(
    private cryptoService: CryptoService,
    private tricklesAPI: TricklesService,
    private auth: AuthService,
    private router: Router) { }

  ngOnInit(): void {
    this.getCustomerID()
  }

  getCustomerID(): void {
    this.auth.isAuthenticated()
      .then((res: any) => {
        this.customer_id = res.customer_id
        this.getCheckOutItemsFromStorage()
      })
      .catch((err: Error) => this.customer_id = null)
  }

  // get primary payment method => params: {customer_id, payment_mode => 'MOM' or 'CRD'}
  getPrimaryPaymentMethod(): void {
    const params = {
      customer_id: this.customer_id,
      payment_mode: this.payment_mode
    }

    // perform request
    this.tricklesAPI.GetPrimaryPaymentMethod(params)
      .subscribe(
        (res: any) => res.resp_code === "068" ? this.addPaymentMethod() : this.selectedWallet = res,
        (err: Error) => Swal.fire('error', 'Error getting Payment details, Try again', 'error')
      )
  }

  addPaymentMethod(): void {
    Swal.fire({ title: 'Warning', text: 'Please add Wallet to continue', icon: 'warning', showCancelButton: true, confirmButtonText: 'Add Wallet' })
      .then(res => res.isConfirmed ? (
        this.router.navigateByUrl('/wallets')
      ) : this.selectedWallet = null)
  }

  getCheckOutItemsFromStorage(): void {
    let name = this.cryptoService.set('checkout')
    const encrypted_data = sessionStorage.getItem(name)
    const res = this.cryptoService.get(encrypted_data)
    this.checkoutItems = JSON.parse(res)

    // get transaction charge
    this.getTransactionCharge()
  }

  getTransactionCharge(): void {
    let params: any[] = []

    this.checkoutItems.map(item => params.push(
      `amount:${item.total_amount || item.details[0].amount_due};trans_type:CTM;ref_code:${item.payment_plan_id === 'FLP' ? item.prod_offering_id : item.details[0].ref_code};entity_id:${item.entity_id || item.details[0].entity_id};payment_plan:${item.payment_plan_id || 'INS' };qty:${item.qty || item.details[0].qty};customer_id:${this.customer_id}`
    ))

    this.tricklesAPI.GetTransactionCharge(params.join(","))
      .subscribe(
        (res: any) => {
          console.log(res)
          this.total_charge = res
        },
        (err: Error) => console.log(err)
      )
  }

  // handle payment method change
  paymentMethodChange(e: any): void {
    this.payment_mode = e.target.value
    this.getPrimaryPaymentMethod()
  }

  // make payment finally
  makePayment(): void {
    const params = {
      pan: this.selectedWallet.pan,
      nw: this.selectedWallet.nw,
      customer_id: this.customer_id,
      trans_type: 'CTM',
      payment_class: 'GNR',
      payment_med: this.selectedWallet.payment_mode,
      payment_plan: this.checkoutItems[0].payment_plan_id || 'INS',
      item_data: this.formatChosentItems(),
      card_cvv: this.selectedWallet?.card_cvv || null,
      card_holder: this.selectedWallet?.holder_name,
      holder_email: this.selectedWallet?.holder_email,
      exp_month: this.selectedWallet?.exp_month,
      exp_year: this.selectedWallet?.exp_year
    }

    this.tricklesAPI.MakePayment(params)
      .subscribe(
        (res: any) => res.resp_code === '149'
        ? Swal.fire({ icon: 'success', text: 'Your request is being processed, thank you' }).then(() => this.router.navigateByUrl('/'))
        : Swal.fire({ icon: 'error', text: 'An error occured, please try again' }),
        (err: Error) => Swal.fire({ icon: 'error', text: 'An error occured, please try again' })
      )
  }

  // format items in checkoutItems for api use
  formatChosentItems(): string {
    const params: any[] = []
    this.checkoutItems.map(item => params.push(
      // Use || (or) to check for what item to use.. if payment_plan is FLP, first item before the || will be used
      `amount:${item.total_amount || item.details[0].amount_due}~ref_code:${item.prod_offering_id || item.details[0].ref_code}~reference:${item.product_name || item.details[0].product_name}~qty:${item.qty || item.details[0].qty}`
    ))
    return params.join(";")
  }
}
