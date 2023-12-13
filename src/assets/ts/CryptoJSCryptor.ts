import CryptoJS from 'crypto-js'

export default class CryptoJSCryptor {
  constructor() {}

  private cryptKey = ''
  private cryptIV = ''

  public setKey = (key: string) => {
    this.cryptKey = key
  }

  public setIv = (iv: string) => {
    this.cryptIV = iv
  }

  public encrypt = (str: string) => {
    console.log('key ===> ' + this.cryptKey)
    console.log('iv ===> ' + this.cryptIV)
    const cipher = CryptoJS.AES.encrypt(encodeURI(str), CryptoJS.enc.Utf8.parse(this.cryptKey), {
      iv: CryptoJS.enc.Utf8.parse(this.cryptIV), // parse the IV
      padding: CryptoJS.pad.Pkcs7,
      mode: CryptoJS.mode.CBC
    })

    return cipher
  }

  public decrypt = (str: string) => {
    console.log('key ===> ' + this.cryptKey)
    console.log('iv ===> ' + this.cryptIV)
    console.log(btoa(str))
    const decryptedData = CryptoJS.AES.decrypt(str, CryptoJS.enc.Utf8.parse(this.cryptKey), {
      iv: CryptoJS.enc.Utf8.parse(this.cryptIV),
      padding: CryptoJS.pad.Pkcs7,
      mode: CryptoJS.mode.CBC
    })
    console.log(decryptedData.toString(CryptoJS.enc.Utf8).toString())

    return decryptedData.toString(CryptoJS.enc.Utf8).toString()
  }
}
