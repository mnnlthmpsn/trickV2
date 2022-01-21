export class Category {
  constructor(
    public product_cat_id: string | number = '',
    public product_cat_desc: string | number = '',
    public image_file: string = ''
  ){}

  static fromJson(json: any): Category{
    return new Category(
      json['product_cat_id'],
      json['product_cat_desc'],
      json['image_file']
    )
  }
}


export class SubCategory {
  constructor(
    public prod_type_id: string | number = '',
    public product_type_desc: string | number = '',
    public image_file: string = ''
  ){}

  static fromJson(json: any): SubCategory {
    return new SubCategory(
      json['product_type_id'],
      json['product_type_desc'],
      json['image_file']
    )
  }
}
