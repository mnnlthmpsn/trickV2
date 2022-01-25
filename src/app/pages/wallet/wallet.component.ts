import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from 'src/app/services/auth.service';
import { TricklesService } from 'src/app/services/trickles.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.css']
})
export class WalletComponent implements OnInit {

  momoWalletForm: FormGroup = new FormGroup({});
  cardWalletForm: FormGroup = new FormGroup({});
  pinForm: FormGroup = new FormGroup({});
  customer_id: string | null = '';
  momo_wallets: any[] = []
  card_wallets: any[] = []
  currentRoute: string = ''
  modalReference: any
  pin: string = ''
  currentTime: number = 60
  otpCode: string = ''

  constructor(
    private formBuilder: FormBuilder,
    private tricklesAPI: TricklesService,
    private router: Router,
    private auth: AuthService,
    private modalService: NgbModal,
  ) {
    this.pinForm = this.formBuilder.group({
      _pin: ['', [Validators.required]]
    })
  }

  get _pin() { return this.pinForm.get('_pin') }

  ngOnInit(): void {
    this.cardWalletForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      cardholder_name: ['', Validators.required],
      card_number: ['', Validators.required],
      card_expiry_month: ['', Validators.required],
      card_expiry_year: ['', Validators.required]
    });

    this.momoWalletForm = this.formBuilder.group({
      mobile_number: ['', Validators.required],
      nw: ['', Validators.required]
    }
    );

    this.getCustomer()
    this.currentRoute = this.router.url;
  }

  getCustomer(): void {
    this.auth.isAuthenticated()
      .then(res => {
        this.customer_id = res.customer_id
        this.getWalletList();
      })
      .catch(err => this.customer_id = null)
  }

  getWalletList(): void {
    this.tricklesAPI.GetWalletListRequest(this.customer_id)
      .subscribe(
        data => {
          Array.isArray(data) && data.map(
            (card: any) => card.payment_mode === 'MOM'
              ? this.momo_wallets.push(card)
              : this.card_wallets.push(card))
        },
      )
  }

  onCardSetupSubmit(): void {
    // check form validity
    if (this.cardWalletForm.invalid) {
      Swal.fire({ icon: 'error', title: 'Sorry', text: "Please fill in all required fields" });
      return;
    }

    // verify card
    this.verifyPaymentMedium('CRD', this.cardWalletForm.value.card_number)
  }

  onMomoSetupSubmit() {
    // check form validity
    if (this.momoWalletForm.invalid) {
      Swal.fire({ icon: 'error', title: 'Sorry', text: "Please fill in all required fields" });
      return;
    }

    // verify card
    this.verifyPaymentMedium('MOM', this.momoWalletForm.value.mobile_number)
  }

  // verify payment medium MOM for momo, CRD for card
  verifyPaymentMedium(mode: string, pan: string): void {
    const params = { customer_id: this.customer_id, mode: mode, pan: pan }
    this.tricklesAPI.VerifyPaymentMedium(params)
      .subscribe(
        res => {
          res.resp_code === '116'
            // if type is card open pinModal else open OTPModal
            ? mode === 'CRD' ? this.pinModal() : this.otpModal()
            : Swal.fire('Warning', 'Payment Medium already exists', 'warning')
        },
        err => err
      )
  }

  // this opens the pin modal
  otpModal(): void {
    // close opened modal first
    this.modalReference.close()

    const params = {
      phone_number: this.momoWalletForm.value.mobile_number.toString(),
      ctry_code: "GH"
    }

    // send otp
    this.tricklesAPI.SendOTPRequest(params)
      .subscribe(data => {
        data.resp_code === '112' ? this.openVerifyOTPModal() : () => Swal.fire('Error', data.resp_desc, 'error')
      }, err => {
        console.error(err)
        Swal.fire('error', 'An Error occured', 'error')
      })
  }

  resendOTP(): void {
    this.currentTime = 60
    this.tricklesAPI.SendOTPRequest({
      phone_number: this.momoWalletForm.value.mobile_number.toString(),
      ctry_code: "GH"
    })
  }

  startTimer(): void {
    setInterval(() => {
      if (this.currentTime > 0) {
        this.currentTime -= 1
      }
    }, 1000)
  }

  // this opens the pin modal
  pinModal(): void {
    this.startTimer()

    // close opened modal first
    this.modalReference.close()

    // open new modal to enter pin
    this.openVerifyPINModal()
  }

  // this method checks the validity of the pin typed
  verifyPINonSubmit(): void {
    this.modalReference.close()

    // get original pin from authService and compare to this.pin
    this.auth.isAuthenticated()
      .then(res => {
        // call login request with mobile_number and this.pin ---> if successful, pin is correct
        // continue with card addition
        const params = {
          phone_number: res.mobile_number,
          secret_pin: this._pin?.value,
          src: "WEB",
          app_token: "WEB DEVICE TOKEN"
        }
        this.tricklesAPI.LoginRequest(params)
          .subscribe(
            res => res.resp_code === '00'
              ? this.addToWallet('card')
              : Swal.fire('Invalid PIN', 'Please check pin and try again', 'error')
          )
      })
      .catch(err => console.log(err))
    this.modalReference.close()
  }

  onOtpChange(e: any) {
    this.otpCode = e.target.value
  }

  // this method checks validity of otp submitted
  verifyOTPonSubmit(): void {
    const params = {
      phone_number: this.momoWalletForm.value.mobile_number.toString(),
      auth_code: this.otpCode,
      ctry_code: 'GH'
    }

    this.tricklesAPI.VerifyAuthCode(params)
      .subscribe(res => {
        // if code is correct, call add to wallet
        // else throw 'Invalid Code'
        res.resp_code === '111' ? this.addToWallet('momo') : Swal.fire('error', 'Invalid OTP Pin', 'error')
      }, err => { throw err })


    this.modalReference.close()
  }

  addToWallet(type: string): void {
    const params = {
      customer_id: this.customer_id,
      nw: type === 'card' ? 'CRD' : this.momoWalletForm.value.nw,
      pan: type === 'card' ? this.cardWalletForm.value.card_number.toString() : `0${this.momoWalletForm.value.mobile_number.toString()}`,
      holder_email: type === 'card' ? this.cardWalletForm.value.email : '',
      exp_month: type === 'card' ? this.cardWalletForm.value.card_expiry_month.toString() : '',
      exp_year: type === 'card' ? this.cardWalletForm.value.card_expiry_year.toString() : '',
      card_holder: type === 'card' ? this.cardWalletForm.value.cardholder_name : '',
      mode: type === 'card' ? 'CRD' : 'MOM'
    }

    this.tricklesAPI.AddToWalletRequest(params)
      .subscribe(
        res => Swal.fire('success', 'Payment Medium added successfully', 'success').then(() => {
          this.momo_wallets = []
          this.card_wallets = []
          this.getWalletList()
        }),
        err => Swal.fire('Error', 'Error Adding Payment Method', 'error')
      )
  }

  removeWallet(wallet_id: string) {
    const params = { customer_id: this.customer_id, wallet_id: wallet_id }
    Swal.fire({
      title: 'Confirmation',
      text: 'Do you wish to continue?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Delete Wallet',
      confirmButtonColor: 'red',
    }).then((res) => {
      if (res.isConfirmed) {
        // if user confirms, call remove api
        this.tricklesAPI.RemovePaymentMedium(params)
          .subscribe(
            res => res.resp_code === '112' ? Swal.fire('succes', res.resp_desc, 'success').then(() => {
              this.card_wallets = []
              this.momo_wallets = []
              this.getWalletList()
            }) : Swal.fire('error', res.resp_desc, 'error'),
            err => Swal.fire('error', err.toString(), 'error')
          )
      }
    })
  }

  setAsPrimary(wallet_id: any): void {
    const payload = {
      customer_id: this.customer_id,
      wallet_id
    }

    this.tricklesAPI.SetPrimaryPaymentMethod(payload)
      .subscribe(
        res => res.resp_code === '112' ? (
          this.card_wallets = [],
          this.momo_wallets = [],
          this.getWalletList()
        ) : Swal.fire({ icon: 'error', text: res.resp_desc }),
        err => console.log(err)
      )
  }

  // ##################### modals ########################
  // get addcard modal
  @ViewChild("addCard") addCardModal: any
  @ViewChild("addMomo") addMomoModal: any
  @ViewChild("verifyPIN") verifyPINModal: any
  @ViewChild("verifyOTP") verifyOTPModal: any

  // open addcard modal
  openAddCardModal(): void {
    this.modalReference = this.modalService.open(this.addCardModal, { centered: true, size: 'lg' })
  }

  // open addmomo modal
  openAddMomoModal(): void {
    this.modalReference = this.modalService.open(this.addMomoModal, { centered: true, size: 'md' })
  }

  // open verifyPIN modal
  openVerifyPINModal(): void {
    this.modalReference = this.modalService.open(this.verifyPINModal, { centered: true, size: 'sm' })
  }

  // open verifyOTP modal
  openVerifyOTPModal(): void {
    this.modalReference = this.modalService.open(this.verifyOTPModal, { centered: true, size: 'md' })
  }
}
