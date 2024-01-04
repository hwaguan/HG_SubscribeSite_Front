import { sysConfig } from '@/stores/sysConfig'
import axios from 'axios'

export default class MailSender {
    public Subject: string = ""
    public Content: string = ""
    private Recipients: any = []

    public send = async () => {
        const config = sysConfig()

        if (this.Subject != "" && this.Content != "" && this.Recipients.length > 0) {
            const mailInfo = {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "fromName" : "華冠投顧 - ClickGo",
                "fromAddress" : "service@hwa-guan.com.tw",
                "subject" : this.Subject,
                "content" : this.Content,
                "recipients" : this.Recipients
            }

            console.log(mailInfo)

            await axios.post(config.MailServerPath, mailInfo, {
                headers: {
                    "X-API-KEY": config.sendMailKey
                }
            })
                .then((response) => {
                    return response
                })
        }
    }

    public MailReceiver = class{
        public name:string = ""
        public address:string = ""
        public variables:any = {
            "UUID": "1234-56-78-9012"
        }
    }

    public addReceiver = (receiver:any) => {
        this.Recipients.push(receiver)
    }
}