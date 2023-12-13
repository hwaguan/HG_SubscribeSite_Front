import HexBinTransfer from './HexBinTransfer' //hex2bin & bin2hex 編碼器
import CryptoJSCryptor from './CryptoJSCryptor' //AES-256-CBC 編碼器

export default class newebpayCryptor {
  private RespondType = 'JSON' //回傳格式
  private Version = '1.5' //串接程式版本
  private LangType = 'zh-Tw' //語系
  private MerOrderNo = '' //訂單編號
  private ProdDesc = '' //產品名稱
  private PeriodAmt = 0 //委託金額
  private PeriodType = 'M' //週期類別
  private PeriodPoint = '15' //每次自動扣款日期
  private PeriodStartType = '1' //交易模式 (1. 測試授權, 2. 立即授權, 3. 不授權)
  private PeriodTimes = 12 //授權期數
  private PeriodFirstdate = '' //首次扣款日期
  private PeriodMemo = '' //交易備註
  private ReturnURL = '' //交易結果回抛網址
  private PayerEmail = '' //交易完成時發送通知信通知付款人的郵箱
  private EmailModify = '1' //付款人電子信箱是否開放給客戶修改
  private PaymentInfo = 'Y' //是否開啟付款人資訊
  private OrderInfo = 'N' //是否開啟收件人資訊
  private NotifyURL = '' //每期授權結果通知網址
  private BackURL = '' //消交易返回網址
  private UNIONPAY = '0' //信用卡銀聯卡啟用
  private storeNo = '' //商店代碼
  private cryptKey = '' //交易金鑰
  private cryptIV = '' //交易IV\
  private HBT = new HexBinTransfer()
  private CSC = new CryptoJSCryptor()

  private Bin2Hex = (str: any) => {
    let i = 0
    const a = []
    str += ''

    for (i = 0; i < str.length; i++) {
      a[i] = str
        .charCodeAt(i)
        .toString(16)
        .replace(/^([\da-f])$/, '0$1')
    }

    return a.join('')
  }

  private Hex2Bin = (hex: string) => {
    let result = ''
    for (let i = 0; i < hex.length; i += 2) {
      result += String.fromCharCode(parseInt(hex.substr(i, 2), 16))
    }

    return result
  }

  //設定商店代碼
  public setStoreNo = (storeNo: string) => {
    this.storeNo = storeNo
  }

  //設定加密金鑰 key
  public setKey = (key: string) => {
    this.cryptKey = key
    this.CSC.setKey(this.cryptKey)
  }

  //設定交易 iv
  public setIv = (iv: string) => {
    this.cryptIV = iv
    this.CSC.setIv(this.cryptIV)
  }

  //設定回傳格式 (0 : JSON , 1 : string)
  public setRespondType = (respondType: number) => {
    this.RespondType = respondType < 1 ? 'JSON' : 'string'
  }

  //設定串接程式版本
  public setVersion = (version: number) => {
    this.Version = '' + version
  }

  //設定語系 (0 : 中文版 , 1 : 英文版)
  public setLangType = (langType: number) => {
    this.LangType = langType < 1 ? 'zh-Tw' : 'en'
  }

  //設定訂單編號
  public setMerOrderNo = (orderNo: string) => {
    this.MerOrderNo = orderNo
  }

  //商定商品名稱
  public setProdDesc = (prodDesc: string) => {
    this.ProdDesc = prodDesc
  }

  //設定委託金額
  public setPeriodAmt = (periodAmt: number) => {
    this.PeriodAmt = periodAmt
  }

  //設定週期類別 (D : 固定天期制 , W : 每週 , M : 每月, Y : 每年)
  public setPeriodType = (periodType: string) => {
    this.PeriodType = periodType
  }

  //設定每次自動扣款日期 (1.當 PeriodType = D，此欄位值限為數字 2~999，以授權日期隔日起算。例：數值為 2，則表示每隔兩天會執行一次委託
  //                    2.當 PeriodType =W，此欄位值限為數字 1~7，代表每週一至週日。例：每週日執行授權，則此欄位值為 7；若週日與週一皆需執行授權，請分別建立一張委託
  //                    3.當 PeriodType = M，此欄位值限為數字 01~31，代表每月 1 號~31 號。若當月沒該日期則由該月的最後一天做為扣款日例：每月 1 號執行授權，則此欄位
  //                      值為 01；若於 1 個月內需授權多次，請以建立多次委託方式執行。
  //                    4.當 PeriodType =Y，此欄位值格式為 MMDD)
  public setPeriodPoint = (periodPoint: number) => {
    this.PeriodPoint = '' + periodPoint
  }

  //設定交易模式 (1. 測試授權, 2. 立即授權, 3. 不授權)
  public setPeriodStartType = (PST: number) => {
    this.PeriodStartType = '' + PST
  }

  //設定授權期數
  public setPeriodTimes = (periodTimes: number) => {
    this.PeriodTimes = periodTimes
  }

  //設定首次扣款日期
  public setPeriodFirstdate = (periodFirstdate: string) => {
    this.PeriodFirstdate = periodFirstdate
  }

  //設定交易備註
  public setPeriodMemo = (periodMemo: string) => {
    this.PeriodMemo = periodMemo
  }

  //設定交易結果回傳網址
  public setReturnURL = (returnURL: string) => {
    this.ReturnURL = returnURL
  }

  //設定交易完成時發信通知的付款人郵箱
  public setPayerEmail = (payerEmail: string) => {
    this.PayerEmail = payerEmail
  }

  //設定付款人郵箱是否開放修改 (預設為 1)
  public setEmailModify = (emailModify: number) => {
    this.EmailModify = emailModify < 1 ? '0' : '1'
  }

  //設定是否開啟付款人資訊 (預設為 1)
  public setPaymentInfo = (paymentInfo: number) => {
    this.PaymentInfo = paymentInfo < 1 ? 'N' : 'Y'
  }

  //設定開否開啟收件人資訊 (預設為 0)
  public setOrderInfo = (orderInfo: number) => {
    this.OrderInfo = orderInfo < 1 ? 'N' : 'Y'
  }

  //設定每期扣款結果通知網址
  public setNotifyURL = (notifyURL: string) => {
    this.NotifyURL = notifyURL
  }

  //設定取消交易時的跳轉網址
  public setBackURL = (backURL: string) => {
    this.BackURL = backURL
  }

  //設定是否啟用允許銀聯卡交易 (預設為 0)
  public setUNIONPAY = (unionpay: number) => {
    this.UNIONPAY = unionpay < 1 ? '0' : '1'
  }

  public encrypt = () => {
    const today = new Date()
    const dayNow = today.getDate()
    let result = ''

    if (this.cryptKey == '') return 'error : crypt key is empty.'
    if (this.cryptIV == '') return 'error : crypt iv is empty.'
    if (this.MerOrderNo == '') return 'error : MerOrderNo is empty.'
    if (this.ProdDesc == '') return 'error : ProdDesc is empty.'
    if (this.PeriodAmt <= 0) return 'error : PeriodAmt should be higher then 0.'
    if (parseInt(this.PeriodPoint) <= 0) return 'error : PeriodPoint should be higher then 0.'
    if (this.ReturnURL == '') return 'error : ReturnURL is empty.'
    if (this.PayerEmail == '') return 'error : PayerEmail is empty.'
    if (this.BackURL == '') return 'error : BackURL is empty.'

    let transferData = 'RespondType=' + this.RespondType
    transferData += '&TimeStamp=' + Date.now()
    transferData += '&Version=' + this.Version
    transferData += '&LangType=' + this.LangType
    transferData += '&MerOrderNo=' + this.MerOrderNo
    transferData += '&ProdDesc=' + this.ProdDesc
    transferData += '&PeriodAmt=' + this.PeriodAmt
    transferData += '&PeriodType=' + this.PeriodType
    transferData += '&PeriodPoint=' + this.PeriodPoint
    transferData += '&PeriodStartType=' + (parseInt(this.PeriodPoint) <= dayNow ? '2' : '3')
    transferData += '&PeriodTimes=' + this.PeriodTimes
    transferData += '&ReturnURL=' + this.ReturnURL
    transferData += '&PayerEmail=' + this.PayerEmail
    transferData += '&EmailModify=' + this.EmailModify
    transferData += '&PaymentInfo=' + this.PaymentInfo
    transferData += '&OrderInfo=' + this.OrderInfo
    transferData += '&NotifyURL=' + this.NotifyURL
    transferData += '&BackURL=' + this.BackURL

    const cipher = this.CSC.encrypt(transferData)

    result = this.HBT.Bin2Hex(atob(cipher.toString()))

    return result
  }

  public decrypt = (transferResult: string) => {
    if (transferResult == null || transferResult.length == 0 || transferResult == '')
      return 'error : transferResult should not be empty.'

    const decryptedData = this.CSC.decrypt(btoa(this.HBT.Hex2Bin(transferResult)))

    return decodeURI(decryptedData)
  }
}
