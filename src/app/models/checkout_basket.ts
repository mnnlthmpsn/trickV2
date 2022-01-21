import { BasketOrders } from "./basket_orders.model";

export default class CheckoutBasket {

    chosenItems: BasketOrders[] = []
    total_amt: number

    constructor(items: BasketOrders[]){
        this.total_amt = 0
        this.chosenItems = items
    }

    // addItem to checkoutBasket
    additem(item: BasketOrders): void {
        this.chosenItems.push(item)
        this.calcPrice()
    }

    addItemAndCalculateWithAmtDue(item: any) {
        console.log(item)
    }

    removeItem(itemToRemove: BasketOrders): void {
        const filteredItems = this.chosenItems.filter(item => item.product_info_id !== itemToRemove.product_info_id)
        this.chosenItems = filteredItems
        this.calcPrice()
    }

    dec_or_inc(itemToIncrease: BasketOrders){
        // check if item exists in chosenItems
        const foundItem = this.chosenItems.find(dt => dt.product_info_id === itemToIncrease.product_info_id)

        // if item being incremented is in chosenItems update object
        if (foundItem) {

            foundItem.total_amount = Number(foundItem.amount) * Number(foundItem.qty)
            // calculate final price in checkout_basket
            this.calcPrice()
            return
        }
    }

    // calculate totalprice in basket
    private calcPrice(): void {
        this.total_amt = this.chosenItems.reduce((prev: number, curr: BasketOrders) => prev + curr.total_amount, 0)
    }
}
