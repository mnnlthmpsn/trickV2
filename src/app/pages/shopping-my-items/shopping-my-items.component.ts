import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import MyItemCheckoutBasket from 'src/app/models/my_item_checkout_basket';
import { AuthService } from 'src/app/services/auth.service';
import { CheckoutService } from 'src/app/services/checkout.service';
import { TricklesService } from 'src/app/services/trickles.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-shopping-my-items',
  templateUrl: './shopping-my-items.component.html',
  styleUrls: ['./shopping-my-items.component.css']
})
export class ShoppingMyItemsComponent implements OnInit {

  currentTab: string = 'pending'
  currentItem: any
  transactions: any[] | null = []
  customerID: string | null = ''
  pendingItems: any[] = []
  completedItems: any[] = []
  my_item_checkout_basket: MyItemCheckoutBasket;
  manualInstallmentItems: MyItemCheckoutBasket

  // bottomsheet
  toggleSheet: boolean = false
  installPaymentSheet: boolean = false


  constructor(
    private auth: AuthService,
    private tricklesAPI: TricklesService,
    private checkoutService: CheckoutService,
    private router: Router,
  ) {
    this.my_item_checkout_basket = new MyItemCheckoutBasket([]);
    this.manualInstallmentItems = new MyItemCheckoutBasket([])
  }

  ngOnInit(): void {
    this.getCustomerID()
  }

  // activeTab
  activeTab(tab: string): void {
    this.currentTab = tab
  }

  // toggle bottom sheet
  moreDetails(item: any): void {
    this.currentItem = item
    this.getTransactionHistory()
    this.toggleSheet = !this.toggleSheet
  }

  // get user id
  getCustomerID(): void {
    this.auth.isAuthenticated()
      .then(res => {
        this.customerID = res.customer_id
        this.getPendingItems()
        this.getCompletedItems()
      })
      .catch(err => this.customerID = null)
  }

  // add checked item to checkout_basket
  addToCheckedList(e: any, item: any): void {
    if (e.target.checked) {
      this.my_item_checkout_basket.additem(item)
    } else {
      this.my_item_checkout_basket.removeItem(item)
    }
  }

  // customer pending items
  getPendingItems(): void {
    this.tricklesAPI.getPendingMyItemsRequest(this.customerID)
      .subscribe(data => {
        data.resp_code === '116' ? this.pendingItems = [] : this.pendingItems = data
      }, (err) => console.log(err))
  }

  // customer completed items
  getCompletedItems(): void {
    this.tricklesAPI.getCompletedMyItemsRequest(this.customerID)
      .subscribe(data => {
        console.log(data)
        data.resp_code === '116' ? this.completedItems = [] : this.completedItems = data
      }, err => console.log(err))
  }

  // get customer transaction history
  getTransactionHistory(): void {
    this.tricklesAPI.GetCustomerItemTransHistoryRequest(this.customerID, this.currentItem.details[0].ref_code)
      .subscribe((data: any) => {
        data.resp_code === '116' ? this.transactions = null : this.transactions = data[0].details
      }, (err: Error) => console.log(err))
  }

  // handle full payment
  handleFullPayment(): void {
    // continue to checkout with this.my_item_checkout_basket.chosenItems
    this.checkoutService.addItems(this.my_item_checkout_basket.chosenItems)
    this.router.navigate(['/checkout']);
  }

  // handle manual payment
  handleManualInstallment(): void {
    // continue with this.my_item_checkout_basket.chosenItems to page to enter how much to pay
    this.installPaymentSheet = true
  }


  // pay in installment
  payInInstallment(e: any, itemToEdit: any): void {

    // loop through and select item from checkout which is equal to item being edited
    const tempItem = this.my_item_checkout_basket.chosenItems.filter((item: any) => item === itemToEdit)[0]

    // always remove existing item pushed to array when the onchange is triggered
    // this is to prevent the item being added again anytime the onchange is triggered
    this.manualInstallmentItems.removeItem(tempItem)
    this.manualInstallmentItems.additem({
      ...tempItem,
      details: [{
        ...tempItem.details[0],
        amount_due: e.target.value
      }]
    })
  }

  // checkout items for manual installment payment
  continuePaymentForInstallment(): void {
    // continue to checkout with this.manualInstallmentItems.chosenItems
    this.checkoutService.addItems(this.manualInstallmentItems.chosenItems)
    this.router.navigate(['/checkout']);
  }

  // delete checked Items
  deleteCheckedItems(): void {

    let IDsToDelete: any[] = []
    let refCodes: any[] = []
    let ItemsNotDeleted: any = []

    // loop through chosenItems and push prod_offering_id to array above
    this.my_item_checkout_basket.chosenItems.map((item: any) => {
      if (item.payment_status === 'P') {
        IDsToDelete.push(item.details[0].prod_offering_id)
        refCodes.push(item.details[0].ref_code)
      } else {
        ItemsNotDeleted.push(item)
      }
    })

    // fire alert only when ItemsNotDeleted array has an item
    ItemsNotDeleted.length > 0 && Swal.fire('Warning', `Item(s) cannot be deleted. Payment In Progress`, 'warning')

    // join basket_ids in array into a string for api
    const params = { customer_id: this.customerID, item_list: IDsToDelete.join(","), ref_code: refCodes.join(",") }

    this.tricklesAPI.RemoveItemFromItemsRequest(params)
      .subscribe(
        () => 'do nothing',
        (err: Error) => console.log(err)
      )
  }
}
