export class Product {
  constructor(
    public currency?: string,
    public discount_amount?: string,
    private discount_value?: string,
    public entity_alias?: string,
    public entity_id?: string | number,
    public entity_name?: string,
    public entity_product_id?: string | number,
    public image_file?: string,
    public newly_published?: boolean,
    public payment_duration?: string,
    public payment_plan_desc?: string,
    public payment_plan_id?: string | number,
    public price?: string,
    public prod_offering_id?: string,
    public product_cat_code?: string,
    public product_cat_desc?: string,
    public product_div?: string,
    public product_div_desc?: string,
    public product_info_id?: string | number,
    public product_name?: string,
    public product_sub_div_desc?: string,
    public product_sub_div_id?: string | number,
    public product_alias?: string | null,
    public section_cat?: string | null,
  ) { }

  static fromJson(json: any): Product {
    return new Product(
      json['currency'],
      json['discount_amount'],
      json['discount_value'],
      json['entity_alias'],
      json['entity_id'],
      json['entity_name'],
      json['entity_product_id'],
      json['image_file'],
      json['newly_published'],
      json['payment_duration'],
      json['payment_plan_desc'],
      json['payment_plan_id'],
      json['price'],
      json['prod_offering_id'],
      json['product_cat_code'],
      json['product_cat_desc'],
      json['product_div'],
      json['product_div_desc'],
      json['product_info_id'],
      json['product_name'],
      json['product_sub_div_desc'],
      json['product_sub_div_id'],
      json['product_alias'],
      json['section_cat']
    )
  }

  getDiscountValue(): Number {
    return parseFloat(this.discount_value!)
  }

  showDiscount(): boolean {
    return parseFloat(this.discount_value!) > 0 ? true : false
  }
}
