export default class MyItemCheckoutBasket {

  chosenItems: any[]
  total_amt: number

  constructor(items: any[]){
      this.total_amt = 0
      this.chosenItems = items
  }

  // addItem to checkoutBasket
  additem(item: any): void {
      this.chosenItems.push(item)
      this.calcPrice()
  }

  removeItem(itemToRemove: any): void {
      const filteredItems = this.chosenItems.filter(item => item.details[0].product_info_id !== itemToRemove.details[0].product_info_id)
      this.chosenItems = filteredItems
      this.calcPrice()
  }

  // calculate totalprice in basket
  private calcPrice(): void {
      this.total_amt = this.chosenItems.reduce((prev: number, curr: any) => prev + Number(curr.details[0].amount_due), 0)
  }
}
