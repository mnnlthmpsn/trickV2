import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common'
import { AuthService } from 'src/app/services/auth.service';
import { TricklesService } from 'src/app/services/trickles.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap'

import Swal from 'sweetalert2';

@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.css']
})

export class MyAccountComponent implements OnInit {

  loginForm: FormGroup = new FormGroup({})
  registerForm: FormGroup = new FormGroup({})
  isLoading: boolean = false
  currentTime: number = 60
  modalReference: any
  otpCode: string = ''

  constructor(
    private fb: FormBuilder,
    private tricklesAPI: TricklesService,
    private auth: AuthService,
    private location: Location,
    private modalService: NgbModal
  ) {

    // login reactive form
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.maxLength(5), Validators.minLength(5)]]
    })

    // signup reactive form
    this.registerForm = this.fb.group({
      surname: ['', [Validators.required]],
      other_names: ['', Validators.required],
      phone: ['', [Validators.required]],
      pin: ['', [Validators.required, Validators.maxLength(5), Validators.minLength(5)]],
      email: ['', [Validators.required, Validators.email]],
      referral_code: ['']
    })
  }

  ngOnInit(): void {
  }

  // getter fxns
  get username() { return this.loginForm.get('username') }
  get password() { return this.loginForm.get('password') }
  get surname() { return this.registerForm.get('surname') }
  get other_names() { return this.registerForm.get('other_names') }
  get phone() { return this.registerForm.get('phone') }
  get pin() { return this.registerForm.get('pin') }
  get email() { return this.registerForm.get('email') }

  // login submit
  onSubmit(): void {
    const payload = {
      'phone_number': this.username?.value,
      'secret_pin': this.password?.value,
      'src': 'WEB',
      'app_token': 'WEB DEVICE TOKEN'
    }

    this.login(payload)
  }

  // login fxn
  login(payload: any): void {
    this.tricklesAPI.LoginRequest(payload).subscribe(
      data => {
        if (data["resp_code"] == "00") {
          // set details into cookies
          this.auth.setIsAuthenticated(data);

          // reset form and go back to previous page if there is
          this.loginForm.reset()
          this.location.back()

        } else {
          this.password?.reset();
          Swal.fire({ icon: 'error', text: data["resp_desc"], confirmButtonColor: '#2F80ED'});
        }

      }
    )
  }

  // register submit
  onRegister(): void {

    // first verify phone
    this.verifyPhone()
  }

  // verify phone
  verifyPhone() {
    const temp_payload = { phone_number: this.registerForm.value.phone, ctry_code: 'GH' }
    const payload = JSON.stringify(temp_payload)
    this.tricklesAPI.VerifyPhone(payload)
      .subscribe(data => {
        // if valid, send otp
        data.resp_code === '109' ? this.sendOTP(payload) : Swal.fire({ icon: 'warning', title: 'Warning', text: 'User already exists. Please Login', confirmButtonColor: '#2F80ED' })
      })
  }

  // send otp
  sendOTP(params: any) {
    this.tricklesAPI.SendOTPRequest(params)
      .subscribe(data => {
        data.resp_code === '112' ? this.triggerAlert() : Swal.fire({ icon: 'error', title: 'Error', text: data.resp_desc, confirmButtonColor: '#2F80ED' })
      })
  }

  // resend otp
  resendOTP():void {
    this.currentTime = 60
    this.tricklesAPI.SendOTPRequest({ phone_number: this.registerForm.value.phone, ctry_code: 'GH' })
  }

  // show otp in SwalModal
  triggerAlert() {
    this.modalReference = this.modalService.open(this.otpModal, { centered: true, size: 'md' })
    this.startTimer()
  }

  // verify otp
  verifyOTP(params: any) {
    // close opened modal
    this.modalReference.close()

    // this.finalizeRegistration
    this.tricklesAPI.VerifyAuthCode(params)
      .subscribe(res => {
        res.resp_code === '111' ? this.finalizeRegistration() : Swal.fire({icon: 'error', text: 'Error OTP Pin', confirmButtonColor: '#2F80ED'})
      }, err => console.log(err))
  }

  // start timer
  startTimer(): void {
    setInterval(() => {
      if (this.currentTime > 0) {
        this.currentTime -= 1
      }
    }, 1000)
  }

  // trigger finalizeRegistration when length of values entered is 6
  onOtpChange(e: any) {
    this.otpCode = e.target.value
  }

  submitOTP(): void {
    const params = {
      phone_number: this.registerForm.value.phone.toString(),
      auth_code: this.otpCode,
      ctry_code: 'GH'
    }

    this.verifyOTP(params)
  }

  // finalize the process
  finalizeRegistration() {
    const temp_payload = {
      other_names: this.registerForm.value.other_names,
      surname: this.registerForm.value.surname,
      username: null,
      phone_number: this.registerForm.value.phone,
      pin: this.registerForm.value.pin,
      id_number: null,
      id_type: null,
      email: this.registerForm.value.email,
      src: 'WEB',
      device_token: '',
      ctry_code: 'GH',
      referral_code: this.registerForm.value.referral_code
    }
    const payload = JSON.stringify(temp_payload)
    this.tricklesAPI.RegisterRequest(payload).subscribe(data => {
      if (data.resp_code === '112') {
        // login user if response code is 112
        const login_payload = {
          phone_number: temp_payload.phone_number,
          secret_pin: temp_payload.pin,
          src: "WEB",
          app_token: "WEB DEVICE TOKEN"
        }
        const payload_stringified = JSON.stringify(login_payload)
        this.login(payload_stringified)
      } else {
        Swal.fire({ icon: 'warning', title: 'Error', text: data.resp_desc, confirmButtonColor: '#2F80ED' })
      }

    })
  }

  @ViewChild("otpModal") otpModal: any
}

