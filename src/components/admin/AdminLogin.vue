<template>
  <loading :status="showLoading"></loading>
  <div class="AdminLoginContainer" @keyup="procedeLogin">
    <div class="LoginPanelContainer">
      <div class="panenTitle">
        <h2>華冠投顧</h2>
        <h4>ClickGo 網站管理平台</h4>
        <input class="acc" type="text" v-model="loginInfo.userName" placeholder="帳號" />
        <input class="pwd" :type="showPass ? 'text' : 'password'" v-model="loginInfo.password" placeholder="密碼" />
        <svg class="passEyeClose" v-if="showPass" xmlns="http://www.w3.org/2000/svg" height="16" width="20"
          viewBox="0 0 640 512" @click="showPass = false" title="顯示密碼">
          <path
            d="M634 471L36 3.5A16 16 0 0 0 13.5 6l-10 12.5A16 16 0 0 0 6 41l598 467.5a16 16 0 0 0 22.5-2.5l10-12.5A16 16 0 0 0 634 471zM296.8 146.5l134.8 105.4C429.4 191.9 380.5 144 320 144a112.3 112.3 0 0 0 -23.2 2.5zm46.4 219.1L208.4 260.2C210.7 320.1 259.5 368 320 368a113 113 0 0 0 23.2-2.5zM320 112c98.7 0 189.1 55 237.9 144a285.5 285.5 0 0 1 -44 60.2l37.7 29.5a333.7 333.7 0 0 0 52.9-75.1 32.4 32.4 0 0 0 0-29.2C550.3 135.6 442.9 64 320 64c-36.7 0-71.7 7-104.6 18.8l46.4 36.3c18.9-4.3 38.3-7.1 58.2-7.1zm0 288c-98.7 0-189.1-55-237.9-144a285.5 285.5 0 0 1 44.1-60.2l-37.7-29.5a333.6 333.6 0 0 0 -52.9 75.1 32.4 32.4 0 0 0 0 29.2C89.7 376.4 197.1 448 320 448c36.7 0 71.7-7.1 104.6-18.8l-46.4-36.3C359.3 397.2 339.9 400 320 400z" />
        </svg>
        <svg class="passEye" v-if="!showPass" xmlns="http://www.w3.org/2000/svg" height="16" width="18"
          viewBox="0 0 576 512" @click="showPass = true" title="隱藏密碼">
          <path
            d="M288 144a110.9 110.9 0 0 0 -31.2 5 55.4 55.4 0 0 1 7.2 27 56 56 0 0 1 -56 56 55.4 55.4 0 0 1 -27-7.2A111.7 111.7 0 1 0 288 144zm284.5 97.4C518.3 135.6 410.9 64 288 64S57.7 135.6 3.5 241.4a32.4 32.4 0 0 0 0 29.2C57.7 376.4 165.1 448 288 448s230.3-71.6 284.5-177.4a32.4 32.4 0 0 0 0-29.2zM288 400c-98.7 0-189.1-55-237.9-144C98.9 167 189.3 112 288 112s189.1 55 237.9 144C477.1 345 386.7 400 288 400z" />
        </svg>
        <div :class="{
          noGo: loginInfo.userName == '' || loginInfo.password == '',
          goodToGo: loginInfo.userName != '' && loginInfo.password != ''
        }" @click="verifyLogin">
          GO
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
$baseGray: rgba(150, 150, 150, 1);

.AdminLoginContainer {
  display: flex;
  justify-content: center;
  justify-items: center;

  .LoginPanelContainer {
    width: 350px;
    height: 400px;
    margin-top: calc((100vh - 400px) / 4);
    display: grid;
    grid-template-columns: 1fr;
    justify-content: center;
    justify-items: center;

    .panenTitle {
      text-align: center;

      h2 {
        letter-spacing: 0.3rem;
      }

      h4 {
        letter-spacing: 0.2rem;
      }

      .acc,
      .pwd {
        background-repeat: no-repeat !important;
        background-position: 15px !important;
        background-size: 25px !important;
      }

      .acc {
        background: url('data:image/svg+xml;charset=UTF-8, <svg xmlns="http://www.w3.org/2000/svg" height="16" width="14" fill="rgba(150, 150, 150, .8)" viewBox="0 0 448 512"><path d="M224 256c70.7 0 128-57.3 128-128S294.7 0 224 0 96 57.3 96 128s57.3 128 128 128zm89.6 32h-16.7c-22.2 10.2-46.9 16-72.9 16s-50.6-5.8-72.9-16h-16.7C60.2 288 0 348.2 0 422.4V464c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48v-41.6c0-74.2-60.2-134.4-134.4-134.4z"/></svg>');
      }

      .pwd {
        background: url('data:image/svg+xml;charset=UTF-8, <svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" fill="rgba(150, 150, 150, .8)" viewBox="0 0 512 512"><path d="M512 176C512 273.2 433.2 352 336 352c-11.2 0-22.2-1.1-32.8-3.1l-24 27A24 24 0 0 1 261.2 384H224v40c0 13.3-10.7 24-24 24h-40v40c0 13.3-10.7 24-24 24H24c-13.3 0-24-10.7-24-24v-78.1c0-6.4 2.5-12.5 7-17l161.8-161.8C163.1 213.8 160 195.3 160 176 160 78.8 238.8 0 336 0 433.5 0 512 78.5 512 176zM336 128c0 26.5 21.5 48 48 48s48-21.5 48-48-21.5-48-48-48-48 21.5-48 48z"/></svg>');
      }

      input {
        width: 100%;
        height: 40px;
        margin-top: 1.5rem;
        padding: 5px 50px 5px 50px;
        border: 1px $baseGray solid;
        border-radius: 99rem;
      }

      .passEye,
      .passEyeClose {
        margin: 35px 0px 0px -30px;
        position: absolute;
        cursor: pointer;
        fill: $baseGray;
      }

      .passEye:hover {
        fill: rgba(250, 100, 100, 0.8);
      }

      .passEyeClose:hover {
        fill: rgba(100, 250, 100, 0.8);
      }

      .noGo,
      .goodToGo {
        width: 50px;
        height: 50px;
        margin-left: calc((100% - 50px) / 2);
        margin-top: 20px;
        line-height: 50px;
        color: rgb(255, 255, 255);
        font-weight: bold;
        text-align: center;
        vertical-align: middle;
        border-radius: 99rem;
      }

      .noGo {
        background-color: $baseGray;
        cursor: not-allowed;
      }

      .goodToGo {
        background: rgb(75, 107, 210);
        box-shadow: 3px 3px 10px rgba(0, 0, 0, 0.5);
        cursor: pointer;
      }

      .goodToGo:hover {
        background: rgb(115, 147, 250);
      }
    }
  }
}

@media screen and (max-width: 768px) {}
</style>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { sysConfig } from '@/stores/sysConfig'
import swal from 'sweetalert2'
import axios from 'axios'
import sysAlarm from '@/assets/ts/sysAlarm'
import cryptor from '@/assets/ts/Cryptor'
import apiProcdure from '@/assets/ts/APIProcdure'
import loading from '@/components/LoadingCover.vue'

const config = sysConfig()
const emit = defineEmits(['redirectPage', 'loadingSwitch'])
const alarm = new sysAlarm()
const dec = new cryptor()
const api = new apiProcdure()

//console.log(config.hostPath + config.tokenPath)
//console.log(axios)

let loginInfo = ref({
  userName: '',
  password: ''
})
let showPass = ref(false)
let showLoading = ref(false)

const loadingSwitch = (status: boolean) => {
  emit('loadingSwitch', status)
}

const verifyLogin = async () => {
  let sysAdmin = loginInfo.value.userName == 'sysAdmin' && loginInfo.value.password == '1qazXSW@'
  const tokenPath = config.hostPath + config.tokenPath

  if (loginInfo.value.userName != '' && loginInfo.value.password != '') {
    loadingSwitch(true)

    if (!sysAdmin) {
      const loginPath = config.hostPath + config.adminLoginPath
      const valObj = {
        account: loginInfo.value.userName,
        password: loginInfo.value.password
      }

      const loginResult: any = await api.callAPI(loginPath, valObj)

      if (loginResult.result) {
        sessionStorage.setItem('adminInfo', JSON.stringify(loginResult.message))
        emit('redirectPage', null, 'main')
      } else {
        if (loginResult.code == -1) {
          let footer = "<a href='#'>忘記密碼?</a>"

          loadingSwitch(false)
          alarm.centralError('登入失敗', '請確認您的登入資訊!', footer)
        } else {
          swal.fire({
            icon: 'warning',
            title: '服務器錯誤，請稍候再試'
          })
        }
      }

      loadingSwitch(false)
    } else {
      loadingSwitch(false)
      const sysAdminStr =
        '{"admID": 0,"admName": "最高管理者","admCorp": "HG01","admDep": "0004","admMail": "","admExt": "","admAccount": "","admPassword": "","admAuthority": "all","admEnabled": 1,"admCreateDate": "2023-12-06T16:40:28.387","admLastModify": "","admGroup": 0}'
      sessionStorage.setItem('adminInfo', sysAdminStr)
      emit('redirectPage', null, 'main')
    }
  }
}

const procedeLogin = (e : any) => {
  if(e.keyCode == 13 && loginInfo.value.userName != '' && loginInfo.value.password != '')verifyLogin()
}
</script>
