import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { CryptoService } from './crypto.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  customer_id: string

  constructor(private crypto: CryptoService, private cookies: CookieService) {
    this.customer_id = ''
   }

  async isAuthenticated(): Promise<any>{
    // get token from cookie and check server if token is correct
    // in this case, just check the presence of the token
    const cookieName = this.crypto.set('authKey')
    const encryptedData = this.cookies.get(cookieName)
    const decryptedData = this.crypto.get(encryptedData)
    return decryptedData && JSON.parse(decryptedData)
  }


  setIsAuthenticated(userData: any): void{
    // encrypt cookie name
    const cookieName = this.crypto.set('authKey')

    // encrypt customer-details (make this jwt when Jerry finishes)
    const cookieValue = this.crypto.set(JSON.stringify(userData))

    // store encrypted key in cookies
    this.cookies.set(cookieName, cookieValue)
  }

  // for authguard
  canLogin() {
    const cookieName = this.crypto.set('authKey')
    const encryptedData = this.cookies.get(cookieName)
    const decrypted = encryptedData && this.crypto.get(encryptedData)
    const data = decrypted && JSON.parse(decrypted)
    return data.customer_id !== undefined
  }
}
