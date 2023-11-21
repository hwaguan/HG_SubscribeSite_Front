import CryptoJS from 'crypto-js'

export default class newebpayCryptor {
    private RespondType = "JSON" //回傳格式
    private Version = "1.5" //串接程式版本
    private LangType = "zh-Tw" //語系
    private MerOrderNo = "" //商店訂單編號
    private ProdDesc = "" //產品名稱
    private PeriodAmt = 0 //委託金額
    private PeriodType = "M" //週期類別
    private PeriodPoint = "15" //每次自動扣款日期
    private PeriodStartType = "1" //交易模式 (1. 測試授權, 2. 立即授權, 3. 不授權)
    private PeriodTimes = 12 //授權期數
    private ReturnURL = "" //交易結果回抛網址
    private PayerEmail = "" //交易完成時發送通知信通知付款人的郵箱
    private EmailModify = "1" //付款人電子信箱是否開放給客戶修改
    private PaymentInfo = "Y" //是否開啟付款人資訊
    private OrderInfo = "N" //是否開啟收件人資訊
    private NotifyURL = "" //每期授權結果通知網址
    private BackURL = "" //消交易返回網址
    private UNIONPAY = "0" //信用卡銀聯卡啟用
    private storeNo = "" //商店代碼
    private cryptKey = "" //交易金鑰
    private cryptIV = "" //交易IV\

    private bin2Hex = (str) => {
        let i = 0
        let f = 0
        const a = [];
        str += '';
        f = str.length;

        for (i = 0; i < f; i++) {
            a[i] = str.charCodeAt(i).toString(16).replace(/^([\da-f])$/, "0$1");
        }

        return a.join('');
    }

    //設定店代, key, iv 等交易基礎值
    public setKeyValue = (storeNo: string, cryptKey: string, cryptIv: string) => {
        this.storeNo = storeNo
        this.cryptKey = cryptKey
        this.cryptIV = cryptIv
    }

    //設定定扣日期
    public setChargeDate = (date: int) => {
        this.PeriodPoint = (date < 10 ? "0" : "") + date
    }

    //設定交易完成回抛電文網址
    public setTransferResultReceiver = (url: string) => {
        this.ReturnURL = url
    }

    //設定交易完成通知付款人信箱
    public setTransferNotifyEmail = (mail: string) => {
        this.PayerEmail = mail
    }

    //設定每期授權結果通知網址
    public setPreTransferNotify = (url: string) => {
        this.NotifyURL
    }

    //設定消費者取消交易返回網址
    public setCancelReturnUrl = (url: string) => {
        this.BackURL = url
    }

    public getSbuscribeData = (orderNo: string, productName: string, price: numberm, PeriodTimes: numberm, payerMail: string) => {
        const now = new Date()
        const today = now.getDate()
        const Period = parseInt(this.PeriodPoint)
        let transferData = "RespondType=" + this.RespondType
        transferData += "&TimeStamp=" + Date.now()
        transferData += "&Version=" + this.Version
        transferData += "&LangType=" + this.LangType
        transferData += "&MerOrderNo=" + orderNo
        transferData += "&ProdDesc=" + productName
        transferData += "&PeriodAmt=" + price
        transferData += "&PeriodType=" + this.PeriodType
        transferData += "&PeriodPoint=" + this.PeriodPoint
        transferData += "&PeriodStartType=" + (Period <= today ? "2" : "3")
        transferData += "&PeriodTimes=" + PeriodTimes
        transferData += "&ReturnURL=" + this.ReturnURL
        transferData += "&PayerEmail=" + payerMail
        transferData += "&EmailModify=" + this.EmailModify
        transferData += "&PaymentInfo=" + this.PaymentInfo
        transferData += "&OrderInfo=" + this.OrderInfo
        transferData += "&NotifyURL=" + this.NotifyURL
        transferData += "&BackURL=" + this.BackURL

        const cipher = CryptoJS.AES.encrypt(encodeURI(transferData), CryptoJS.enc.Utf8.parse(this.cryptKey), {
            iv: CryptoJS.enc.Utf8.parse(this.cryptIV), // parse the IV 
            padding: CryptoJS.pad.Pkcs7,
            mode: CryptoJS.mode.CBC
        })

        return this.bin2Hex(atob(cipher.toString()))
    }
}