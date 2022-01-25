import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from 'src/app/services/auth.service';
import { TricklesService } from 'src/app/services/trickles.service';

@Component({
  selector: 'app-transaction-history',
  templateUrl: './transaction-history.component.html',
  styleUrls: ['./transaction-history.component.css']
})
export class TransactionHistoryComponent implements OnInit {

  customer_id: string | null = ''
  transactions_history: any;
  modalReference: any
  currentHistory: any

  constructor(private tricklesAPI: TricklesService, private auth: AuthService, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.getCustomer()
  }

  getCustomer() {
    this.auth.isAuthenticated().then(
      (res) => {
        this.customer_id = res.customer_id

        // get transaction history
        this.getTransationHistory()
      }
    ).catch(err => console.log(err))
  }

  getTransationHistory() {
    this.tricklesAPI.GetCustomerTransHistoryRequest(this.customer_id)
      .subscribe(
        data => {
          console.log(data)
          Array.isArray(data) ? this.transactions_history = data : null
        },
      )
  }

  @ViewChild("transDetails") transDetailsModal: any

  // open addmomo modal
  openTransDetailsModal(history: any): void {
    this.currentHistory = history;
    this.modalReference = this.modalService.open(this.transDetailsModal, { size: 'lg' })
  }

}
