import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { TricklesService } from 'src/app/services/trickles.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-information',
  templateUrl: './user-information.component.html',
  styleUrls: ['./user-information.component.css']
})
export class UserInformationComponent implements OnInit {

  customer: any
  id_types: any[] = []
  profileForm: FormGroup = new FormGroup({})

  constructor(private auth: AuthService, private tricklesService: TricklesService, private fb: FormBuilder) {
    this.profileForm = this.fb.group({
      surname: ['', [Validators.required]],
      other_names: ['', [Validators.required]],
      email: ['', [Validators.required]],
      phone: ['', [Validators.required]],
      gender: ['', [Validators.required]],
      id_type: ['', [Validators.required]],
      id_number: ['', [Validators.required]]
    })


  }

  // getter fxns
  get surname() { return this.profileForm.get('surname') }
  get other_names() { return this.profileForm.get('other_names') }
  get email() { return this.profileForm.get('email') }
  get phone() { return this.profileForm.get('phone') }
  get gender() { return this.profileForm.get('gender') }
  get id_type() { return this.profileForm.get('id_type') }
  get id_number() { return this.profileForm.get('id_number') }

  ngOnInit(): void {
    this.getCustomer()
    this.get_IDs()
  }

  getCustomer() {
    this.auth.isAuthenticated().then((res: any) => {
      this.customer = res
      this.populateIfDataExists()
    }).catch((err: Error) => console.log(err))
  }

  get_IDs(): void {
    this.tricklesService.GetIDs()
      .subscribe(
        (res: any) => this.id_types = res,
        (err: Error) => console.log(err)
      )
  }

  populateIfDataExists(): void {
    !!this.customer && this.profileForm.patchValue({
      surname: this.customer?.surname,
      other_names: this.customer?.other_names,
      phone: this.customer?.mobile_number,
      email: this.customer?.email,
      gender: this.customer?.gender ? this.customer?.gender : 'gender',
      id_type: this.customer?.id_type ? this.customer?.id_type : 'id_type',
      id_number: this.customer?.id_number
    })
  }

  updateUser(): void {
    const payload = {
      customer_id: this.customer?.customer_id,
      surname: this.surname?.value,
      other_names: this.other_names?.value,
      email: this.email?.value,
      phone_number: this.phone?.value,
      gender: this.gender?.value,
      id_type: this.id_type?.value,
      id_number: this.id_number?.value
    }

    this.profileForm.invalid
      ? Swal.fire({ icon: 'error', text: 'Please fill all fields' })
      : this.tricklesService.UpdateUserProfile(payload)
        .subscribe(
          (res: any) => {
            this.customer = res
            this.auth.setIsAuthenticated(res);
            Swal.fire({ icon: 'success', text: 'Profile Updated successfully' })
          },
          (err: Error) => Swal.fire({ icon: 'error', text: 'Error updating profile' })
        )
  }
}
