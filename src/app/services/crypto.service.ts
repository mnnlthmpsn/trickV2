import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class CryptoService {

  crypto_key = 'o3/evKoE6WSa1luEYsSP4wAqtyxmw8mINXsJP08X/m7kzeF7zFBcKV6+STWXTXA4';

  constructor() { }

  set(value: any) {
    var key = CryptoJS.enc.Utf8.parse(this.crypto_key);
    var iv = CryptoJS.enc.Utf8.parse(this.crypto_key);
    var encrypted = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(value.toString()), key,
      {
        keySize: 128 / 8,
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
      });

    return encrypted.toString();
  }


  //The get method is use for decrypt the value.
  get(value: any) {
    var key = CryptoJS.enc.Utf8.parse(this.crypto_key);
    var iv = CryptoJS.enc.Utf8.parse(this.crypto_key);
    var decrypted = CryptoJS.AES.decrypt(value, key, {
      keySize: 128 / 8,
      iv: iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7
    });
    return decrypted.toString(CryptoJS.enc.Utf8);
  }
}
