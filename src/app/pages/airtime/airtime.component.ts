import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from 'src/app/services/auth.service';
import { TricklesService } from 'src/app/services/trickles.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-airtime',
  templateUrl: './airtime.component.html',
  styleUrls: ['./airtime.component.css']
})
export class AirtimeComponent implements OnInit {
  airtimeForm: FormGroup

  numberList: any[] = [];
  customer_id: string | null = '';
  payment_mode: string = '';
  selectedWallet: any;
  modalReference: any
  history: any = []

  constructor(
    private fb: FormBuilder,
    private tricklesAPI: TricklesService,
    private router: Router,
    private auth: AuthService,
    private modalService: NgbModal
  ) {
    this.airtimeForm = this.fb.group({
      network: ["MTN", [Validators.required]],
      phone_number: [
        "",
        [Validators.required, Validators.pattern(/^-?([0-9]\d*)?$/)],
      ],
      amount: [
        "",
        [Validators.required, Validators.pattern(/^-?\d*[.,]?\d{0,2}$/)],
      ],
    });
  }

  // getter fxns
  get network() {
    return this.airtimeForm.get("network");
  }
  get phone_number() {
    return this.airtimeForm.get("phone_number");
  }
  get amount() {
    return this.airtimeForm.get("amount");
  }

  ngOnInit(): void {
    this.getCustomerID();
  }

  getCustomerID(): void {
    this.auth
      .isAuthenticated()
      .then((res) => {
        this.customer_id = res.customer_id;
        this.getAirtimeHistory(res.customer_id)
      })
      .catch((err) => (this.customer_id = null));
  }

  getAirtimeHistory(cid: string): void {
    this.tricklesAPI.GetCustAirtimeHistory(cid)
      .subscribe(
        res => {
          console.log(res)
          this.history = res
        },
        err => console.log(err)
      )
  }

  // get primary payment method => params: {customer_id, payment_mode => 'MOM' or 'CRD'}
  getPrimaryPaymentMethod(): void {
    const params = {
      customer_id: this.customer_id,
      payment_mode: this.payment_mode,
    };

    // perform request
    this.tricklesAPI.GetPrimaryPaymentMethod(params).subscribe(
      (res) =>
        res.resp_code === "068"
          ? this.addPaymentMethod()
          : (this.selectedWallet = res),
      (err) =>
        Swal.fire("error", "Error getting Payment details, Try again", "error")
    );
  }

  // handle payment method change
  paymentMethodChange(e: any): void {
    this.payment_mode = e.target.value;
    this.getPrimaryPaymentMethod();
  }

  addPaymentMethod(): void {
    Swal.fire({
      title: "Warning",
      text: "Please add Wallet to continue",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Add Wallet",
    }).then((res) =>
      res.isConfirmed
        ? this.router.navigateByUrl("/wallets")
        : (this.selectedWallet = null)
    );
  }

  addToNumberList(): void {
    // add entered number to array and clear form
    if (this.network?.invalid) {
      Swal.fire({ icon: "error", text: "Please select Network" });
      return;
    }

    if (this.phone_number?.invalid) {
      Swal.fire({ icon: "error", text: "Please enter valid Phone Number" });
      return;
    }

    if (this.amount?.invalid) {
      Swal.fire({ icon: "error", text: "Please enter valid Amount" });
      return;
    }

    if (this.airtimeForm.valid) {
      this.numberList.push(this.airtimeForm.value);
      this.airtimeForm.reset();
    }
  }

  // make purchase
  buyAirtime(): void {
    const params = {
      pan: this.selectedWallet?.pan,
      nw: this.selectedWallet?.nw,
      customer_id: this.customer_id,
      trans_type: "ATP",
      payment_class: "ATP",
      payment_med: this.selectedWallet?.payment_mode,
      payment_plan: "FLP",
      item_data: this.formatNumberList(),
      card_cvv: this.selectedWallet?.card_cvv || null,
      card_holder: this.selectedWallet?.holder_name,
      holder_email: this.selectedWallet?.holder_email,
      exp_month: this.selectedWallet?.exp_month,
      exp_year: this.selectedWallet?.exp_year,
    };

    if (!this.selectedWallet) {
      Swal.fire({ icon: "error", text: "Please select payment mode" });
      return;
    }

    this.tricklesAPI
      .MakePayment(params)
      .subscribe(
        res => res.resp_code === '149'
        ? Swal.fire({ icon: 'success', text: 'Your request is being processed, thank you' }).then(() => this.router.navigateByUrl('/'))
        : Swal.fire({ icon: 'error', text: 'An error occured, please try again' }),
        err => console.log(err)
      )
  }

  // format items in checkoutItems for api use
  formatNumberList(): string {
    const params:any[] = [];
    this.numberList.map((item) =>
      params.push(
        // Use || (or) to check for what item to use.. if payment_plan is FLP, first item before the || will be used
        `amount:${item.amount}~customer_number:${item.phone_number}~reference:Airtime Top Up~nw:${item.network}`
      )
    );
    return params.join(";");
  }

  @ViewChild("historyTemplate") historyModal: any

  openModal(): void {
    this.getAirtimeHistory(this.customer_id as string)
    this.modalReference = this.modalService.open(this.historyModal, { size: 'lg', centered: true })
  }
}
