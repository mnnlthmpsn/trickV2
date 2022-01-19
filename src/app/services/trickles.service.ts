// @ts-nocheck

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TricklesApiLinksService } from './trickles-api-links.service';

@Injectable({
  providedIn: 'root'
})
export class TricklesService {

  constructor(private trickles_api_links: TricklesApiLinksService, private httpclient: HttpClient) { }

  returnAPIURL() {
    return this.trickles_api_links.LOGIN_URL;
  }

  getHomeBanners(): Observable<any> {
    return this.httpclient.get(`${this.trickles_api_links.GET_BANNER_SECTIONS_URL}`);
  }

  getShops(class_code): Observable<any> {
    var url = `${this.trickles_api_links.DISPLAY_SHOPS}?class_code=${class_code}&entity_type=PRL`;
    return this.httpclient.get(url);
  }

  getShopDetails(entity_id): Observable<any> {
    var url = `${this.trickles_api_links.SHOP_DETAILS_URL}?entity_id=${entity_id}`
    return this.httpclient.get(url);
  }

  getShopProducts(entity_id): Observable<any> {
    var url = `${this.trickles_api_links.ENTITY_PRODUCT_LIST}?entity_id=${entity_id}`
    return this.httpclient.get(url)
  }

  getMostViewedItemsRequest(): Observable<any> {
    return this.httpclient.get(this.trickles_api_links.GET_MOST_VIEWED_ITEMS_URL);
  }

  LoginRequest(params): Observable<any> {
    return this.httpclient.post(this.trickles_api_links.LOGIN_URL, params);
  }

  RegisterRequest(params): Observable<any> {
    return this.httpclient.post(this.trickles_api_links.REQUEST_SIGNUP, params);
  }

  VerifyPhone(params): Observable<any> {
    return this.httpclient.post(this.trickles_api_links.VERIFY_CUSTOMER, params);
  }

  SendOTPRequest(params): Observable<any> {
    return this.httpclient.post(this.trickles_api_links.GET_OTP_CODE_URL, params);
  }

  getBasketItemsRequest(customer_id): Observable<any> {
    const url = `${this.trickles_api_links.DISPLAY_CART_ITEMS_URL}?customer_id=${customer_id}`;
    return this.httpclient.get(url);
  }


  GetBasketItems(customer_id): Observable<BasketOrders[]> {
    const url = `${this.trickles_api_links.DISPLAY_CART_ITEMS_URL}?customer_id=${customer_id}`;
    return this.httpclient.get(url).pipe(
      // Adapt each item in the raw data array
      map((data: any[]) => data.map((item) => this.basketordersAdapter.adapt(item)))
    );
  }


  getMyItemsRequest(customer_id, payment_status): Observable<any> {
    const url = `${this.trickles_api_links.CUSTOMER_CONFIRMED_ITEMS_ALL_URL}?customer_id=${customer_id}&payment_status=${payment_status}`;
    return this.httpclient.get(url);
  }

  getPendingMyItemsRequest(customer_id): Observable<any> {
    const url = `${this.trickles_api_links.CUSTOMER_CONFIRMED_ITEMS_ALL_URL}?customer_id=${customer_id}&payment_status=PI`;
    return this.httpclient.get(url);
  }

  getCompletedMyItemsRequest(customer_id): Observable<any> {
    const url = `${this.trickles_api_links.CUSTOMER_CONFIRMED_ITEMS_ALL_URL}?customer_id=${customer_id}&payment_status=CM`;
    return this.httpclient.get(url);
  }

  getInProgressMyItemsRequest(customer_id): Observable<any> {
    const url = `${this.trickles_api_links.CUSTOMER_CONFIRMED_ITEMS_ALL_URL}?customer_id=${customer_id}&payment_status=I`;
    return this.httpclient.get(url);
  }

  getItemsByProductType(prod_type_id): Observable<any> {
    const url = `${this.trickles_api_links.PRODUCT_SUB_DIV_PROD_TYPE_URL}?product_type_id=${prod_type_id}`
    return this.httpclient.get(url)
  }

  // getMyItemsRequest(customer_id): Observable<any> {
  //   return this.httpclient.get(`${this.trickles_api_links.CUSTOMER_CONFIRMED_ITEMS_URL}?customer_id=${customer_id}`)
  // }

  getFavItemsRequest(customer_id): Observable<any> {
    // console.log(`${this.trickles_api_links.DISPLAY_CUSTOMER_FAVORITES_URL}?customer_id=${customer_id}`);
    return this.httpclient.get(`${this.trickles_api_links.DISPLAY_CUSTOMER_FAVORITES_URL}?customer_id=${customer_id}`)
  }

  getProductcatListRequest(): Observable<any> {
    // console.log(`${this.trickles_api_links.WEB_PRODUCT_CAT_LIST_URL}?class_code=GNR`);
    return this.httpclient.get(`${this.trickles_api_links.WEB_PRODUCT_CAT_LIST_URL}?class_code=GNR`);
  }

  getProductDetailsRequest(product_info_id, customer_id): Observable<any> {
    // console.log(`${this.trickles_api_links.PRODUCT_DETAILS_URL}?product_info_id=${product_info_id}`);
    return this.httpclient.get(`${this.trickles_api_links.PRODUCT_DETAILS_URL}?product_info_id=${product_info_id}&customer_id=${customer_id}`)
  }

  AddToFavoriteRequest(params): Observable<any> {
    return this.httpclient.post(this.trickles_api_links.ADD_CUSTOMER_FAVORITE_ITEM_URL, params);
  }

  RemoveFavoriteRequest(params): Observable<any> {
    return this.httpclient.post(this.trickles_api_links.DELETE_CUSTOMER_FAVORITE_ITEM_URL, params);
  }

  RemoveItemFromCartRequest(params): Observable<any> {
    return this.httpclient.post(this.trickles_api_links.DELETE_CART_ITEM_URL, params);
  }

  RemoveItemFromItemsRequest(params): Observable<any> {
    return this.httpclient.post(this.trickles_api_links.REMOVE_MY_ITEMLIST_URL, params)
  }

  AddToBasketRequest(params): Observable<any> {
    return this.httpclient.post(this.trickles_api_links.ADD_TO_CART_URL, params);
  }

  GetCustomerFavItemsRequest(customer_id): Observable<any> {
    // console.log(`${this.trickles_api_links.DISPLAY_CUSTOMER_FAVORITES_URL}?customer_id=${customer_id}`);
    return this.httpclient.get(`${this.trickles_api_links.DISPLAY_CUSTOMER_FAVORITES_URL}?customer_id=${customer_id}`)
  }

  // GetShopProductTypesRequest(customer_id): Observable<any> {
  //   console.log(`${this.trickles_api_links.DISPLAY_CUSTOMER_FAVORITES_URL}?customer_id=${customer_id}`);
  //   return this.httpclient.get(`${this.trickles_api_links.DISPLAY_CUSTOMER_FAVORITES_URL}?customer_id=${customer_id}`)
  // }

  GetNewArrivalsRequest(): Observable<any> {
    // console.log(`${this.trickles_api_links.GET_NEW_ARRIVALS_URL}`);
    return this.httpclient.get(`${this.trickles_api_links.GET_NEW_ARRIVALS_URL}`)
  }

  GetTopCategoriesRequest(): Observable<any> {
    var url = `${this.trickles_api_links.GET_MOST_VIEWED_CATEGORIES_URL}?class_code=GNR`
    return this.httpclient.get(url);
  }

  GetProductCategoryList(): Observable<any> {
    var url = `${this.trickles_api_links.GET_PRODUCT_CATEGORY_URL}?class_code=GNR`
    return this.httpclient.get(url);
  }

  GetCustAirtimeHistory(cust_id: any): Observable<any> {
    var url = `${this.trickles_api_links.GET_CUST_AIRTIME_HIST}?customer_id=${cust_id}`
    return this.httpclient.get(url);
  }

  GetProductCategoryAndCategoryTypesList(): Observable<any> {
    var url = `${this.trickles_api_links.GET_PRODUCT_CATEGORY_AND_TYPES_URL}?class_code=GNR`
    return this.httpclient.get(url);
  }

  GetCategoryProductTypesList(prod_id): Observable<any> {
    var url = `${this.trickles_api_links.GET_CATEGORY_PRODUCT_TYPE_URL}?product_id=${prod_id}`
    return this.httpclient.get(url);
  }

  GetProductPaymentTerms(p): Observable<any> {
    // params: entity_id, prod_offering_id, qty, payment_plan, customer_id
    const url = `${this.trickles_api_links.GET_PRODUCT_PAYMENT_TERM_URL}?entity_id=${p.entity_id}&prod_offering_id=${p.prod_offering_id}&qty=${p.qty}&payment_plan=${p.payment_plan}&customer_id=${p.customer_id}`
    return this.httpclient.get(url);
  }

  updateItemPriceRequest(qty, prod_offering_id): Observable<any> {
    const url = `${this.trickles_api_links.UPDATE_ITEM_PRICE}?qty=${qty}&prod_offering_id=${prod_offering_id}`;
    return this.httpclient.get(url);
  }

  GetCustomerTransHistoryRequest(customer_id): Observable<any> {
    // console.log(`${this.trickles_api_links.CUST_TRANS_HIST_URL}?customer_id=${customer_id}`);
    return this.httpclient.get(`${this.trickles_api_links.CUST_TRANS_HIST_URL}?customer_id=${customer_id}`)
  }

  GetCustomerItemTransHistoryRequest(customer_id, ref_code): Observable<any> {
    // console.log(`${this.trickles_api_links.ITEM_TRANS_HIST_URL}?customer_id=${customer_id}&ref_code=${ref_code}`);
    return this.httpclient.get(`${this.trickles_api_links.ITEM_TRANS_HIST_URL}?customer_id=${customer_id}&ref_code=${ref_code}`)
  }

  GetWalletListRequest(customer_id): Observable<any> {
    // console.log(`${this.trickles_api_links.GET_WALLET_INFO_URL}?customer_id=${customer_id}`);
    return this.httpclient.get(`${this.trickles_api_links.GET_WALLET_INFO_URL}?customer_id=${customer_id}`)
  }

  AddToWalletRequest(params): Observable<any> {
    return this.httpclient.post(this.trickles_api_links.SAVE_PAYMENT_WALLET_URL, params);
  }

  getNotificationRequest(customer_id): Observable<any> {
    return this.httpclient.get(`${this.trickles_api_links.DISPLAY_NOTIFICATIONS_URL}?customer_id=${customer_id}&notif_cat=SN`)
  }

  GetFAQRequest(): Observable<any> {
    return this.httpclient.get(`${this.trickles_api_links.GET_FAQ_URL}`);
  }

  GetTNCRequest(): Observable<any> {
    return this.httpclient.get(`${this.trickles_api_links.GET_TOC_URL}?tos_cat=GNR`);
  }

  GetPrivacyPolicyRequest(): Observable<any> {
    return this.httpclient.get(`${this.trickles_api_links.GET_TOC_URL}?tos_cat=PRP`);
  }

  SaveBasketItems(params): Observable<any> {
    return this.httpclient.post(`${this.trickles_api_links.SAVE_FOR_PAYMENT_URL}`, params)
  }

  SubmitCustomerReview(params): Observable<any> {
    return this.httpclient.post(this.trickles_api_links.SUBMIT_USER_REVIEW, params)
  }

  GetTransactionCharge(item_list): Observable<any> {
    return this.httpclient.get(`${this.trickles_api_links.GET_TRANSACTION_CHARGE_URL}?item_list=${item_list}`)
  }

  GetPrimaryPaymentMethod(params): Observable<any> {
    return this.httpclient.get(`${this.trickles_api_links.GET_PRIMARY_WALLET_URL}?customer_id=${params.customer_id}&payment_mode=${params.payment_mode}`)
  }

  SetPrimaryPaymentMethod(params): Observable<any> {
    return this.httpclient.post(this.trickles_api_links.PRIMARY_WALLET_URL, params)
  }

  VerifyPaymentMedium(params): Observable<any> {
    return this.httpclient.get(`${this.trickles_api_links.VERIFY_PAYMENT_WALLET_URL}?customer_id=${params.customer_id}&mode=${params.mode}&pan=${params.pan}`)
  }

  RemovePaymentMedium(params): Observable<any> {
    return this.httpclient.post(`${this.trickles_api_links.REMOVE_PAYMENT_WALLET_URL}`, params)
  }

  VerifyAuthCode(params): Observable<any> {
    return this.httpclient.post(`${this.trickles_api_links.VERIFY_AUTH_CODE}`, params)
  }

  MakePayment(params): Observable<any> {
    return this.httpclient.post(`${this.trickles_api_links.PAYMENT_REQUEST}`, params)
  }

  GetIDs(): Observable<any> {
    return this.httpclient.get(this.trickles_api_links.GET_ID_TYPES_URL)
  }

  UpdateUserProfile(params): Observable<any> {
    return this.httpclient.post(this.trickles_api_links.UPDATE_USER_PROFILE, params)
  }

  GetSubCategories(prod_cat_id): Observable<any> {
    return this.httpclient.get(`${this.trickles_api_links.PRODUCT_CAT_TYPE_URL}?product_cat_id=${prod_cat_id}`)
  }

  // Coastal BOx start
  GetCoastalBoxItems(): Observable<any> {
    return this.httpclient.get(this.trickles_api_links.GET_COASTAL_BOX_ITEMS)
  }

  GetSchoolList(): Observable<any> {
    return this.httpclient.get(this.trickles_api_links.GET_SCHOOL_LIST)
  }

  GetSchoolClassList(school_code: String): Observable<any> {
    return this.httpclient.get(`${this.trickles_api_links.GET_SCHOOL_CLASS_LIST}?school_code=${school_code}`)
  }

  ResetPassword(params: any): Observable<any> {
    return this.httpclient.post(`${this.trickles_api_links.FORGOTTEN_CUST_PIN_URL}`, params)
  }

  GetSchoolHallList(school_code: String): Observable<any> {
    return this.httpclient.get(`${this.trickles_api_links.GET_SCHOOL_HALL_LIST}?school_code=${school_code}`)
  }

  GetCoastalDeliveryCharge(entID: String, price: String): Observable<any> {
    return this.httpclient.get(`${this.trickles_api_links.GET_COASTAL_DELIVERY_CHARGE}?entity_id=${entID}&price=${price}`)
  }
  // Coastal Box end

  SearchProduct(product: String): Observable<any> {
    return this.httpclient.get(`${this.trickles_api_links.SEARCH_PRODUCT_URL}?search_name=${product}`)
  }

  GetCustomerLoyaltyPoints(custID: String): Observable<any> {
    return this.httpclient.get(`${this.trickles_api_links.CUST_LOYALTY_POINTS_URL}?customer_id=${custID}`)
  }

  GetReferralCode(custID: String): Observable<any> {
    return this.httpclient.get(`${this.trickles_api_links.GET_REFERRAL_CODE_URL}?customer_id=${custID}`)
  }

  GetCustomerCampaignStatus(custID: string, ref_code:string): Observable<any> {
    return this.httpclient.get(`${this.trickles_api_links.GET_CUSTOMER_CAMPAIGN_STATUS_URL}?customer_id=${custID}&referral_code=${ref_code}`)
  }

  GetRelatedProducts(custID: string, prod_id: string | number): Observable<any> {
    return this.httpclient.get(`${this.trickles_api_links.GET_RELATED_PRODUCTS}?customer_id=${custID}&product_div_id=${prod_id}`)
  }

}
