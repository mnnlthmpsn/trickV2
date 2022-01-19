import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TricklesApiLinksService {
  public PLAY_STORE_URL = 'https://play.google.com/store/apps/details?id=com.appsnmobile.tricklestest';

  public LOGIN_URL = environment.apiUrl + '/validate_login'; // parameters: phone_number, secret_pin, device_token
  //    public PRE_SIGNUP_URL = environment.apiUrl + "/pre_signup";
  public REQ_AUTH_CODE = environment.apiUrl + '/req_auth_code';
  public VERIFY_AUTH_CODE = environment.apiUrl + '/verify_auth_code';
  public VERIFY_CUSTOMER = environment.apiUrl + '/verify_customer';
  public REQUEST_SIGNUP = environment.apiUrl + '/req_signup';

  public WEB_PRODUCT_CAT_LIST_URL = environment.apiUrl + '/get_web_product_cat_list';

  public DISPLAY_SHOPS = environment.apiUrl + '/get_entity_list'; //param name: class_code, for the general items, send a class code of GNR, for School, send a class code of SCH
  // get details for a shop
  public SHOP_DETAILS_URL = environment.apiUrl + '/get_entity_info'; // params: entity_id
  public ENTITY_SERVICE_OFFERING_URL = environment.apiUrl + '/get_entity_service_offering_list';   // GET METHOD, PARAMS - entity_id
  public ENTITY_PRODUCT_CAT_URL = environment.apiUrl + '/get_entity_product_cat';   // GET METHOD, PARAMS - entity_id -> category
  public ENTITY_PRODUCT_LIST = environment.apiUrl + '/get_entity_product_sub_div_items'; // GET METHOD, PARAMS = entity_id -> actual-items under type_list
  public ENTITY_PRODUCT_TYPE_URL = environment.apiUrl + '/get_entity_product_cat_type_list';   // GET METHOD, - > category detail (type under category)
  // PARAMS - entity_id, product_cat_id
  public ENTITY_PRODUCT_DIV_URL = environment.apiUrl + '/get_entity_product_div_list';   // GET METHOD,
  // PARAMS - entity_id, product_type_id
  public ENTITY_PRODUCT_SUB_DIV_URL = environment.apiUrl + '/get_entity_product_sub_model_info';   // GET METHOD,
  // PARAMS - entity_id, product_div_id
  public ENTITY_PRODUCT_SUB_DIV_PROD_TYPE_URL = environment.apiUrl + '/get_entity_prod_sub_model_info_prod_type';   // GET METHOD,
  // PARAMS - entity_id, product_type_id

  public CHECK_ENTITY_CUSTOMER_FOLLOW_URL = environment.apiUrl + '/check_cust_following_entity'; // GET METHOD,
  // PARAMS - entity_id, customer_id
  public CUSTOMER_FOLLOW_ENTITY_FOLLOW_URL = environment.apiUrl + '/cust_follow_entity'; // POST METHOD,
  // PARAMS - entity_id, customer_id
  public CUSTOMER_UNFOLLOW_ENTITY_FOLLOW_URL = environment.apiUrl + '/cust_unfollow_entity'; // POST METHOD,
  // PARAMS - entity_id, customer_id

  public PRODUCT_CAT_URL = environment.apiUrl + '/get_product_cat_list';
  public PRODUCT_CAT_TYPE_URL = environment.apiUrl + '/get_product_cat_type_list'; // GET METHOD, PARAMS  - product_cat_id
  public PRODUCT_BRAND_URL = environment.apiUrl + '/get_product_brand_by_prod_type'; // GET METHOD, PARAMS  - product_type_id
  public PRODUCT_DIV_URL = environment.apiUrl + '/get_product_div_by_prod_type'; // GET METHOD, PARAMS  - product_type_id
  public PRODUCT_SUB_DIV_URL = environment.apiUrl + '/get_product_sub_div_by_prod_div'; // GET METHOD, PARAMS  - product_div_id
  public PRODUCT_DETAILS_URL = environment.apiUrl + '/get_product_detailed_desc_prod_cat'; // GET METHOD,
  // PARAMS  - product_info_id, entity_id
  public PRODUCT_SUB_DIV_PROD_TYPE_URL = environment.apiUrl + '/get_product_sub_div_by_prod_type'; // GET METHOD,
  // PARAMS  - product_type_id

  public ADD_TO_CART_URL = environment.apiUrl + '/add_item_basket'; // POST METHOD,
  // PARAMS  - customer_id, prod_offering_id, qty, payment_plan
  public DISPLAY_CART_ITEMS_URL = environment.apiUrl + '/get_basket_items'; // GET METHOD, PARAMS  - customer_id
  public DELETE_CART_ITEM_URL = environment.apiUrl + '/remove_item_basket'; // POST METHOD, PARAMS  - customer_id, item_list
  public SAVE_FOR_PAYMENT_URL = environment.apiUrl + '/save_basket_items';  // POST METHOD,
  // PARAMS - customer_id, prod_offering_id, qty, payment_plan

  public ADD_CUSTOMER_FAVORITE_ITEM_URL = environment.apiUrl + '/add_cust_favourite_item'; // POST METHOD,
  // PARAMS- entity_prod_id, customer_id
  public DELETE_CUSTOMER_FAVORITE_ITEM_URL = environment.apiUrl + '/delete_cust_favourite_item'; // POST METHOD,
  // PARAMS- prod_offering_id, customer_id
  public DISPLAY_CUSTOMER_FAVORITES_URL = environment.apiUrl + '/get_customer_favourite_items'; // GET METHOD, PARAMS- customer_id

  public DISPLAY_ENTITY_EVOUCHER_CATLIST = environment.apiUrl + '/get_entity_gift_voucher_cat'; // GET METHOD,
  // PARAMS- entity_id

  public DISPLAY_ENTITY_EVOUCHER_LISTING_URL = environment.apiUrl + '/get_entity_voucher_listing'; // GET METHOD,
  // PARAMS- entity_id, category_id
  public CUST_GIFT_VOUCHER_REQ_URL = environment.apiUrl + '/cust_gift_voucher_req'; // POST METHOD,
  // PARAMS- amount, message, qty, gift_sender, extra_data, gift_voucher_id

  //    public CUSTOMER_EVOUCHER_REQUEST_URL = environment.apiUrl + "/get_evoucher_by_entity"; // GET METHOD, PARAMS- entity_id

  public GET_CUST_AIRTIME_HIST = environment.apiUrl + '/get_cust_airtime_hist' // params = customer_id
  public PAYMENT_REQUEST = environment.apiUrl + '/payment_req'; // POST Method,
  // PARAMS - customer_id, customer_number, amount, payment_class, nw, ref_code, reference_code, voucher_code, payment_med
  public CUSTOMER_CONFIRMED_ITEMS_URL = environment.apiUrl + '/cust_confirmed_items';   // GET Method,
  public CUSTOMER_CONFIRMED_ITEMS_ALL_URL = environment.apiUrl + '/all_cust_confirmed_items';   // GET Method,
  // PARAMS - customer_id,payment_status // P - pending, I - In progress, C - completed
  public ITEM_TRANS_BALANCE_URL = environment.apiUrl + '/get_cust_item_bal';   // GET Method, PARAMS - customer_id, ref_code//
  public ITEM_TRANS_HIST_URL = environment.apiUrl + '/get_cust_item_payment_hist';   // GET Method,
  // PARAMS - customer_id, ref_code//
  public CUST_TRANS_HIST_URL = environment.apiUrl + '/get_cust_payment_hist';   // GET Method, PARAMS - customer_id

  public SHOP_CUST_TRANS_HIST_URL = environment.apiUrl + '/get_entity_cust_payment_hist';   // GET Method,
  // PARAMS - customer_id, entity_id
  public CUST_LOYALTY_POINTS_URL = environment.apiUrl + '/get_cust_loyalty_points';   // GET Method, PARAMS - customer_id, entity_id

  public UPDATE_ITEM_PRICE = environment.apiUrl + '/get_item_price'; // GET Method params: qty, prod_offering_id,
  // Params - customer_id, prod_offering_code, assigned_duration, payment_plan_id
  public SAVE_PAYMENT_WALLET_URL = environment.apiUrl + '/save_payment_medium'; // POST Method,
  // Params - customer_id, wallet_id
  public REMOVE_PAYMENT_WALLET_URL = environment.apiUrl + '/delete_wallet'
  // Params - customer_id, nw, pan, holder_email, exp_month, exp_year, secret, card_holder, mode, GIVs
  public VERIFY_PAYMENT_WALLET_URL = environment.apiUrl + '/verify_payment_medium'; // GET Method,
  // Params - customer_id, nw, pan
  public GET_WALLET_INFO_URL = environment.apiUrl + '/get_wallet_info'; // GET Method,
  // Params - customer_id, payment_mode
  public DELETE_WALLET_URL = environment.apiUrl + '/delete_wallet'; // POST Method, Params - customer_id, wallet_id
  public PRIMARY_WALLET_URL = environment.apiUrl + '/set_med_primary'; // POST Method, Params - customer_id, wallet_id
  public GET_PRIMARY_WALLET_URL = environment.apiUrl + '/get_primary_med'; // GET Method, Params - customer_id, wallet_id
  public INITIATE_REDEEM_URL = environment.apiUrl + '/redeem_initiate'; // POST Method, Params - customer_id, ref_code
  public SUBMIT_USER_REVIEW = environment.apiUrl + '/submit_cust_review'; // POST Method,
  // params: review_type, ref_code, rating, comment, customer_id, P or M

  public UPDATE_USER_PROFILE = environment.apiUrl + '/update_cust_signup_profile'
  public AUTO_DEBIT_INQUIRY_URL = environment.apiUrl + '/auto_debit_inquiry'; // GET Method,
  // Params - customer_id,customer_id, req_freq ,ref_code
  public SCHEDULE_INSTALLMENT_URL = environment.apiUrl + '/schedule_installment'; // POST Method,
  // Params - customer_id, amount, req_freq, ref_code, wallet_id, payment_mode
  public CANCEL_AUTO_DEBIT_URL = environment.apiUrl + '/cancel_auto_debit'; // POST Method, Params - customer_id, ref_code

  public GET_PRODUCT_CATEGORY_URL = environment.apiUrl + '/get_product_cat_list'; // GET Method, params = class_code
  public GET_PRODUCT_CATEGORY_AND_TYPES_URL = environment.apiUrl + '/prod_cat_prod_type_info'; // GET Method, params = class_code
  public GET_CATEGORY_PRODUCT_TYPE_URL = environment.apiUrl + '/get_product_cat_type_list'; // GET METHOD, param=product_id
  public GET_MOST_VIEWED_ITEMS_URL = environment.apiUrl + '/get_most_viewed_items'; // GET Method
  public GET_MOST_VIEWED_CATEGORIES_URL = environment.apiUrl + '/get_most_viewed_categories'; // GET Method
  public GET_LANDING_PAGE_SECTIONS_URL = environment.apiUrl + '/get_section_resources'; // GET Method
  // param: section_code, 1. Sec1 (Section 1) - Slider Sec4, Sec5
  public GET_BANNER_SECTIONS_URL = environment.apiUrl + '/get_banner_resources'; // GET Method
  public GET_BANNER_SECTION_DETAIL_URL = environment.apiUrl + '/get_banner_resource_detail'; // GET Method
  // params banner_code, customer_id
  public REMOVE_MY_ITEMLIST_URL = environment.apiUrl + '/remove_item_mylist'; // GET Method param: customer_id, prod_offering_id

  public ENTITY_REVIEWS_URL = environment.apiUrl + '/get_entity_reviews'; // GET Method param: entity_id
  public ENTITY_COMPLETED_ITEMS_URL = environment.apiUrl + '/get_cust_entity_completed_items'; // GET Method
  // param: entity_id, customer_id
  public DISPLAY_NOTIFICATIONS_URL = environment.apiUrl + '/get_customer_notifications'; // GET Method
  // param: customer_id, notif_cat MN (Merchant Notifications )SN (System Notifications)
  public GET_ID_TYPES_URL = environment.apiUrl + '/get_id_types'; // GET Method
  public GET_TOC_URL = environment.apiUrl + '/get_tos_info'; // GET Method Params - tos_cat - GNR, PRP, ATD
  public GET_FAQ_URL = environment.apiUrl + '/get_faq_info'; // GET Method
  public GET_CUST_EVOUCHER_INFO_URL = environment.apiUrl + '/get_cust_voucher_info'; // GET Method
  // Params - ref_code, customer_number, payment_plan
  public GET_ABOUT_INFO_URL = environment.apiUrl + '/about_service_info'; // GET Method
  public GET_COUNTRY_CODES_URL = environment.apiUrl + '/get_country_codes'; // GET Method
  public GET_CURRENCY_URL = environment.apiUrl + '/get_currency'; // GET Method
  public CHANGE_CURRENCY_URL = environment.apiUrl + '/alt_curr_pref'; // POST Method PARAMS: customer_id, curr_code
  public GET_CUSTOMER_CURRENCY_URL = environment.apiUrl + '/get_customer_curr_pref'; // GET Method PARAMS: customer_id
  public SEARCH_PRODUCT_URL = environment.apiUrl + '/prod_search_main'; // GET Method PARAMS: search_name
  public GET_AUTO_DEBIT_PLAN_URL = environment.apiUrl + '/auto_debit_plan'; // GET Method PARAMS: customer_id, ref_code
  public CHANGE_CUSTOMER_PIN_URL = environment.apiUrl + '/change_customer_pin'; // POST Method PARAMS: customer_id, old_pin, new_pin

  public GET_TRANSACTION_CHARGE_URL = environment.apiUrl + '/get_transaction_charge'; // GET Method PARAMS: item_list
  public VALIDATE_USERNAME_URL = environment.apiUrl + '/validate_username'; // GET Method PARAMS:
  public FORGOTTEN_CUST_PIN_URL = environment.apiUrl + '/forgotten_cust_pin'; // POST Method PARAMS: customer_id, new_pin
  public EMAIL_AUTH_CODE_URL = environment.apiUrl + '/email_auth_code'; // POST Method PARAMS: email
  public EMAIL_OTP_VERIFICATION_URL = environment.apiUrl + '/verify_email_auth_code'; // POST Method PARAMS: email, auth_code

  public GET_ENTITY_PAYMENT_TERM_URL = environment.apiUrl + '/entity_payment_term'; // GET Method PARAMS: entity_id
  public GET_PRODUCT_PAYMENT_TERM_URL = environment.apiUrl + '/product_payment_terms'; // GET Method params: params: entity_id, prod_offering_id, qty, payment_plan, customer_id
  public GET_OTP_CODE_URL = environment.apiUrl + '/req_auth_code';

  public GET_QR_CODE_URL = environment.apiUrl + '/get_product_qr_code'; // GET Method PARAMS: ref_code, customer_id
  public GET_QR_DETAIL_URL = environment.apiUrl + '/get_qr_detail'; // GET Method PARAMS: ref_code, customer_id
  public REDEEM_QR_DETAIL_URL = environment.apiUrl + '/redeem_prod_req'; // POST Method PARAMS: ref_code, customer_id

  public GET_FINANCE_ENTITY_LIST_URL = environment.apiUrl + '/get_finance_entity_list'; // GET Method
  public GET_REFERRAL_CODE_URL = environment.apiUrl + '/get_referral_code'; // GET Method params: customer_id
  public GET_AUTO_DEBIT_MANDATE_URL = environment.apiUrl + '/get_auto_debit_mandate'; // GET Method params: customer_id, ref_code
  public GET_CUSTOMER_CAMPAIGN_STATUS_URL = environment.apiUrl + '/get_cust_campaign_status'; // GET Method

  public GET_NEW_ARRIVALS_URL = environment.apiUrl + '/get_newly_published_prod_list'; // GET Method
  public GET_RELATED_PRODUCTS = environment.apiUrl + '/get_product_sub_div_by_prod_div'
  // params: customer_id, ref_code

  // COASTAL EASY BOX

  // Get items for coastal box
  public GET_COASTAL_BOX_ITEMS = environment.apiUrl + '/get_merchant_by_service_code?service_code=CEB';
  public GET_SCHOOL_LIST = environment.apiUrl + '/get_school_list'
  public GET_SCHOOL_CLASS_LIST = environment.apiUrl + '/get_school_class_list'
  public GET_SCHOOL_HALL_LIST = environment.apiUrl + '/get_school_dorm_list'
  public GET_COASTAL_DELIVERY_CHARGE = environment.apiUrl + '/get_static_delivery_charge'
  // COASTAL EASY BOX END

}
