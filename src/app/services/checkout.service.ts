import { Injectable } from '@angular/core';
import { CryptoService } from './crypto.service';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {

  // checkoutItems: any[] = []

  constructor(private cryptoService: CryptoService) { }

  addItems(items: any): void {
    // set encrypted in storage
    const key = this.cryptoService.set('checkout')
    const value = this.cryptoService.set(JSON.stringify(items))
    sessionStorage.setItem(key, value)
  }
}
