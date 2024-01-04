<template>
    <div>
        <button @click="sendMail">送出</button>
    </div>
</template>

<script setup lang="ts">
import { sysConfig } from '@/stores/sysConfig'
import { useRoute, useRouter } from 'vue-router'
import apiProcdure from '@/assets/ts/APIProcdure'
import mailSender from '@/assets/ts/MailSender'

const config = sysConfig()

const sendMail = async () => {
    const MS = new mailSender();
    let mailContent = "<h3>華冠投顧 ClickGo 會員註冊成功</h3>"
    mailContent += "<p>您好，<br><br>我們以經收到您的註冊申請<br>請您點擊以下連結進行會員帳號啟用，謝謝您<br></p>"
    mailContent += "華冠投顧 敬祝您<br><br>"
    mailContent += "投資獲利 所向披靡"
    MS.Subject = "華冠投顧_ClickGO - 會員註冊成功通知信"
    MS.Content = mailContent

    const receiver = new MS.MailReceiver()
    receiver.name = "貴會員"
    receiver.address = "blair@hwa-guan.com.tw"

    MS.addReceiver(receiver)
    MS.send()
}
</script>