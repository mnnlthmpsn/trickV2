import { Injectable } from "@angular/core";
import { Adapter } from "./adapter";


export class BasketOrders {
    constructor(
        public id: number,
        public qty: number,
        public product_sub_div_id: number,
        public product_sub_div_desc: string,
        public product_name: string,
        public product_info_id: number,
        public product_div_id: number,
        public product_div_desc: string,
        public product_alias: string,
        public prod_offering_id: number,
        public price: string,
        public payment_plan_id: string,
        public payment_plan: string,
        public payment_duration: number,
        public image_file: string,
        public entity_name: string,
        public entity_id: string,
        public entity_alias: string,
        public currency: string,
        public amount: number,
        public charge: number,
        public total_amount: number,
        public interest: number,
        public discount_value: number,
        public discount_given: number,
        public basket_id: number,
        public created_at: Date,
        public updated_at: Date
    ) {}
}




@Injectable({
    providedIn: "root",
})
export class BasketOrdersAdapter implements Adapter<BasketOrders> {
    adapt(item: any): BasketOrders {
        let total_amount1 = (item.qty * Number(item.price)).toFixed(2);
        const total_amount = Number(total_amount1);
        return new BasketOrders(item.product_info_id, item.qty, item.product_sub_div_id, item.product_sub_div_desc, item.product_name, item.product_info_id, item.product_div_id, item.product_div_desc, item.product_alias, item.prod_offering_id, item.price, item.payment_plan_id, item.payment_plan, item.payment_duration, item.image_file, item.entity_name, item.entity_id, item.entity_alias, item.currency, item.price, 0, total_amount, 0, 0, 0, item.basket_id, new Date(), new Date());
    }
}
