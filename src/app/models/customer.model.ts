export class Customer {
  constructor(

    public surname: string,
    public other_names: string,
    public mobile_number: string,
    private is_merchant_user: boolean,
    private id_type: string,
    private id_number: string,
    public gender: string,
    public email: string,
    public customer_id: string,
    public username?: string,
    public user_id?: string,
  ){}


  static fromJson(json: any): Customer {
    return new Customer(
      json['surname'],
      json['other_names'],
      json['mobile_number'],
      json['is_merchant_user'],
      json['id_type'],
      json['id_number'],
      json['gender'],
      json['email'],
      json['customer_id'],
      json['username'],
      json['user_id']
    )
  }

}
