import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TricklesService } from 'src/app/services/trickles.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.css']
})
export class PasswordResetComponent implements OnInit {

  resetForm: FormGroup

  constructor(private fb: FormBuilder, private tricklesService: TricklesService, private router: Router) {
    this.resetForm = this.fb.group({
      phone: [null, [Validators.required, Validators.pattern(/([0-9]\d*)?$/)]],
      pin: [null, [Validators.required, Validators.pattern(/^-?([0-9]\d*)?$/)]],
      confirm_pin: [null, [Validators.required, Validators.pattern(/^-?(0|[1-9]\d*)?$/)]]
    })
  }

  // getter fxns
  get phone () { return this.resetForm.get('phone') }
  get pin () { return this.resetForm.get('pin') }
  get confirm_pin () { return this.resetForm.get('confirm_pin') }

  ngOnInit(): void {
  }

  sendOTP(): void {
    if (this.phone?.invalid) {
      Swal.fire({ icon: 'warning', text: 'Enter valid Phone Number' })
      return
    }

    if (this.pin?.invalid) {
      console.log(this.pin)
      Swal.fire({ icon: 'warning', text: 'Enter valid PIN' })
      return
    }

    if (this.confirm_pin?.value !== this.pin?.value) {
      Swal.fire({ icon: 'warning', text: 'PINs do not match' })
      return
    }

    const params = {
      phone_number: this.phone?.value,
      ctry_code: 'GH'
    }

    this.tricklesService.SendOTPRequest(params)
      .subscribe(
        res => res.resp_code === '112'
          ? Swal.fire({
            icon: 'info',
            input: 'text',
            confirmButtonText: 'Continue',
            showCancelButton: true,
            inputLabel: 'Enter OTP',
            inputAttributes: {
              className: "form-control-lg"
            }
          }).then(data => {
            if (data.isConfirmed) {
              this.verifyAuthCode(data.value)
              return
            }

            if (data.isDismissed) {
              Swal.fire({ icon: 'warning', text: 'Operation Cancelled' })
              return
            }
          })
          : Swal.fire({ icon: 'error', text: res.resp_desc }),
        err => console.log(err)
      )
  }

  verifyAuthCode(authCode: string): void {

    const params = {
      phone_number: this.phone?.value,
      auth_code: authCode,
      ctry_code: 'GH'
    }

    this.tricklesService.VerifyAuthCode(params)
      .subscribe(
        res => res.resp_code === '111' ? this.resetPIN(): Swal.fire({ icon: 'error', text: res.resp_desc }),
        err => console.log(err)
      )
  }

  resetPIN(): void {
    const payload = {
      mobile_number: this.phone?.value,
      new_pin: this.pin?.value,
      ctry_code: 'GH'
    }

    this.tricklesService.ResetPassword(payload)
      .subscribe(
        res => res.resp_code === '112'
          ? Swal.fire({ icon: 'success', text: res.resp_desc }).then(() => this.router.navigateByUrl('/my-account'))
          : Swal.fire({ icon: 'error', text: res.resp_desc }),
        err => Swal.fire({ icon: 'error', text: 'Sorry an error occured' })
      )
  }

}
