<template>
  <div class="loginContainer" @keydown="submitLogin">
    <div class="loginHeader">
      <div v-if="!forgetPassword">
        <h4>會員<span v-if="isLogin">登入</span><span v-if="!isLogin">註冊</span></h4>
      </div>
      <div class="forgetPassTitle" v-if="forgetPassword">
        <h4>忘記密碼</h4>
      </div>
    </div>
    <div class="inputZone" v-if="!forgetPassword">
      <div class="thirdPartyLogin">
        <div class="loginLine">
          <div class="loginBtn googlelogin" @click="googleLogin">
            使用 Google 帳號<span v-if="isLogin">登入</span><span v-if="!isLogin">註冊</span>
          </div>
        </div>
        <div class="loginLine" v-if="false">
          <div class="loginBtn facebooklogin">
            使用 Facebook 帳號<span v-if="isLogin">登入</span><span v-if="!isLogin">註冊</span>
          </div>
        </div>
        <div class="loginLine" v-if="false">
          <div class="loginBtn linelogin">
            使用 Line 帳號<span v-if="isLogin">登入</span><span v-if="!isLogin">註冊</span>
          </div>
        </div>
      </div>
      <div class="gapLine">
        <div class="gapText">或</div>
      </div>
      <div class="accountInfo">
        <div class="infoLineCase">
          <div class="infoLine account" :class="{ accountError: loginError.account.error }">
            <div class="infoTitle">帳　　號</div>
            <div class="infoInput">
              <input type="text" class="memberInfoInput" v-model="loginInfo.account" placeholder="請輸入您的 E-mail"
                @change="confirmAccount" />
            </div>
            <div class="infoHide"></div>
          </div>
          <div class="infoAlarm" v-if="loginError.account.error">{{ loginError.account.text }}</div>
        </div>
        <div class="infoLineCase">
          <div class="infoLine password" :class="{ passwordError: loginError.pass.error }">
            <div class="infoTitle">密　　碼</div>
            <div class="infoInput">
              <input type="text" class="memberInfoInput" v-model="loginInfo.password" maxlength="12" v-if="!hidePass"
                placeholder="請輸入 6 ~ 12 位密碼" @change="confirmPass" />
              <input type="password" class="memberInfoInput" v-model="loginInfo.password" maxlength="12" v-if="hidePass"
                placeholder="請輸入 6 ~ 12 位密碼" @change="confirmPass" />
            </div>
            <div class="infoHide">
              <i class="bi bi-eye-slash" @click="hideSwitch(0)" v-if="hidePass"></i>
              <i class="bi bi-eye" @click="hideSwitch(0)" v-if="!hidePass"></i>
            </div>
          </div>
          <div class="infoAlarm" v-if="loginError.pass.error">{{ loginError.pass.text }}</div>
        </div>
        <div class="infoLineCase">
          <div class="infoLine confirmPass" :class="{ confirmPassError: loginError.cpass.error }">
            <div class="infoTitle">確認密碼</div>
            <div class="infoInput">
              <input type="text" class="memberInfoInput" v-model="loginInfo.confirmPass" v-if="!hideConfirmPass"
                maxlength="12" placeholder="請再次輸入密碼" @change="confirmVerify" />
              <input type="password" class="memberInfoInput" v-model="loginInfo.confirmPass" v-if="hideConfirmPass"
                maxlength="12" placeholder="請再次輸入密碼" @change="confirmVerify" />
            </div>
            <div class="infoHide">
              <i class="bi bi-eye-slash" @click="hideSwitch(1)" v-if="hideConfirmPass"></i>
              <i class="bi bi-eye" @click="hideSwitch(1)" v-if="!hideConfirmPass"></i>
            </div>
          </div>
          <div class="infoAlarm" v-if="loginError.cpass.error">{{ loginError.cpass.text }}</div>
        </div>
      </div>
      <div class="extraLine" :class="{ atRegister: !isLogin }">
        <div>
          <div class="register" @click="isLogin = !isLogin">
            <span v-if="isLogin">註冊帳號</span><span v-if="!isLogin">登入帳號</span>
          </div>
        </div>
        <div v-if="isLogin">
          <div class="forgetPass" @click="forgetPassword = !forgetPassword">忘記密碼</div>
        </div>
      </div>
      <div class="submitBtnCase">
        <div class="submitButton" :class="{ btnDisabled: !allPass }" @click="loginOrRegister">
          <span v-if="isLogin">登入</span><span v-if="!isLogin">註冊</span>
        </div>
      </div>
    </div>
    <div class="forgetPassContainer" v-if="forgetPassword">
      <div class="forgetPassWording">請輸入您註冊會員時所填寫的 e-mail<br>進行重置密碼</div>
      <div class="forgetPassPS">註：一個月內僅能進行三次密碼重置申請，請謹慎操作。</div>
      <div class="forgetPassInput">
        <input type="text" v-model="fpMail" @blur="verifyMail" @focus="ftMailError = ''" />
        <div class="forgetPassError" v-if="ftMailError != ''" v-html="ftMailError"></div>
      </div>
      <div class="forgetPassBtnCase">
        <div class="forgetPassAbortBtn">放棄重置</div>
        <div class="forgetPassSubmitBtn" :class="{ 'forgetPassSubmitBtn_disabled': !fpMailPass }"
          @click="applyResetPassword">送出申請</div>
      </div>
    </div>
  </div>
</template>

<stlyle scoped lang="scss">
.loginContainer {
  width: 100%;
  height: 100%;

  .loginHeader {
    padding-bottom: 15px;
    text-align: center;
    letter-spacing: 0.3rem;
    /*border-bottom : 2px rgb(210, 210, 210) solid;*/
  }

  .thirdPartyLogin {
    padding: 30px 20px;
    display: grid;
    grid-template-columns: 1fr;
    row-gap: 15px;

    .loginLine {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center !important;

      .loginBtn {
        width: 300px;
        padding: 10px;
        text-align: center;
        font-weight: 600;
        letter-spacing: 2px;
        border-radius: 5px;
        cursor: pointer;
      }

      .googlelogin {
        background: url('../assets/images/google.512x512.png'), rgb(240, 240, 240);
        background-size: 28px 28px;
        background-repeat: no-repeat;
        background-position: 10px 10px;
      }

      .googlelogin:hover {
        background-color: rgb(220, 220, 220);
      }

      .facebooklogin {
        color: rgb(255, 255, 255);
        background: url('data:image/svg+xml;charset=UTF-8, <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="rgb(255, 255, 255)" class="bi bi-facebook" viewBox="0 0 20 20"><path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z"/></svg>'),
          rgb(8, 102, 255);
        background-size: 32px 32px;
        background-repeat: no-repeat;
        background-position: 10px 10px;
      }

      .facebooklogin:hover {
        background-color: rgb(0, 82, 235);
      }

      .linelogin {
        color: rgb(255, 255, 255);
        background: url('data:image/svg+xml;charset=UTF-8, <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="rgb(255, 255, 255)" class="bi bi-line" viewBox="0 0 20 20"><path d="M8 0c4.411 0 8 2.912 8 6.492 0 1.433-.555 2.723-1.715 3.994-1.678 1.932-5.431 4.285-6.285 4.645-.83.35-.734-.197-.696-.413l.003-.018.114-.685c.027-.204.055-.521-.026-.723-.09-.223-.444-.339-.704-.395C2.846 12.39 0 9.701 0 6.492 0 2.912 3.59 0 8 0ZM5.022 7.686H3.497V4.918a.156.156 0 0 0-.155-.156H2.78a.156.156 0 0 0-.156.156v3.486c0 .041.017.08.044.107v.001l.002.002.002.002a.154.154 0 0 0 .108.043h2.242c.086 0 .155-.07.155-.156v-.56a.156.156 0 0 0-.155-.157Zm.791-2.924a.156.156 0 0 0-.156.156v3.486c0 .086.07.155.156.155h.562c.086 0 .155-.07.155-.155V4.918a.156.156 0 0 0-.155-.156h-.562Zm3.863 0a.156.156 0 0 0-.156.156v2.07L7.923 4.832a.17.17 0 0 0-.013-.015v-.001a.139.139 0 0 0-.01-.01l-.003-.003a.092.092 0 0 0-.011-.009h-.001L7.88 4.79l-.003-.002a.029.029 0 0 0-.005-.003l-.008-.005h-.002l-.003-.002-.01-.004-.004-.002a.093.093 0 0 0-.01-.003h-.002l-.003-.001-.009-.002h-.006l-.003-.001h-.004l-.002-.001h-.574a.156.156 0 0 0-.156.155v3.486c0 .086.07.155.156.155h.56c.087 0 .157-.07.157-.155v-2.07l1.6 2.16a.154.154 0 0 0 .039.038l.001.001.01.006.004.002a.066.066 0 0 0 .008.004l.007.003.005.002a.168.168 0 0 0 .01.003h.003a.155.155 0 0 0 .04.006h.56c.087 0 .157-.07.157-.155V4.918a.156.156 0 0 0-.156-.156h-.561Zm3.815.717v-.56a.156.156 0 0 0-.155-.157h-2.242a.155.155 0 0 0-.108.044h-.001l-.001.002-.002.003a.155.155 0 0 0-.044.107v3.486c0 .041.017.08.044.107l.002.003.002.002a.155.155 0 0 0 .108.043h2.242c.086 0 .155-.07.155-.156v-.56a.156.156 0 0 0-.155-.157H11.81v-.589h1.525c.086 0 .155-.07.155-.156v-.56a.156.156 0 0 0-.155-.157H11.81v-.589h1.525c.086 0 .155-.07.155-.156Z"/></svg>'),
          rgb(0, 185, 0);
        background-size: 32px 32px;
        background-repeat: no-repeat;
        background-position: 10px 10px;
      }

      .linelogin:hover {
        background-color: rgb(0, 165, 0);
      }
    }
  }

  .gapLine {
    width: 80%;
    margin-left: 10%;
    height: 30px;
    background: linear-gradient(transparent 0px 13px,
        rgb(210, 210, 210) 13px 13px,
        transparent 14px 30px);
    display: flex;
    justify-content: center;

    .gapText {
      width: 50px;
      color: rgb(210, 210, 210);
      text-align: center;
      font-weight: 500;
      background-color: rgb(255, 255, 255);
    }
  }

  .accountInfo {
    padding: 30px 20px 0px 20px;
    display: grid;
    grid-template-columns: 1fr;
    row-gap: 15px;

    .infoLineCase {
      .infoLine {
        width: 80%;
        margin-left: 10%;
        padding: 5px;
        display: grid;
        grid-template-columns: 90px auto 30px;
        border: 1px rgb(210, 210, 210) solid;
        border-radius: 5px;
        background-repeat: no-repeat !important;

        .infoTitle {
          padding: 3px 10px 0px 0px;
          letter-spacing: 3px;
          text-align: right;
        }

        .infoHide {
          padding-left: 10px !important;
        }

        .infoHide i {
          cursor: pointer;
        }
      }

      .infoLine input {
        width: 100%;
        height: 30px;
        padding: 0px 10px;
        border: 0px;
        border-radius: 5px;
      }

      .infoLine input::placeholder {
        color: rgba(210, 210, 210, 0.8) !important;
      }

      .infoLine input:focus {
        outline: 2px rgba(0, 183, 255, 0.3) solid;
      }

      .account {
        background: url('data:image/svg+xml;charset=UTF-8, <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="rgba(0, 0, 0, .1)" class="bi bi-person-fill" viewBox="0 0 16 16"><path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3Zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"/></svg>'),
          linear-gradient(to right, rgba(230, 230, 230, 1) 0px 100px, transparent 150px 100%);
      }

      .accountError {
        background: url('data:image/svg+xml;charset=UTF-8, <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="rgba(0, 0, 0, .1)" class="bi bi-person-fill" viewBox="0 0 16 16"><path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3Zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"/></svg>'),
          linear-gradient(to right, rgba(255, 0, 0, 0.2) 0px 100px, transparent 150px 100%);
      }

      .password {
        background: url('data:image/svg+xml;charset=UTF-8, <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="rgba(0, 0, 0, .1)" style="margin-top : 5px" class="bi bi-bag" viewBox="0 0 16 16"><path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1zm3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4h-3.5zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V5z"/></svg>'),
          linear-gradient(to right, rgba(230, 230, 230, 1) 0px 100px, transparent 150px 100%);
        /*background-position: 0px 5px !important;*/
      }

      .passwordError {
        background: url('data:image/svg+xml;charset=UTF-8, <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="rgba(0, 0, 0, .1)" style="margin-top : 5px" class="bi bi-bag" viewBox="0 0 16 16"><path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1zm3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4h-3.5zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V5z"/></svg>'),
          linear-gradient(to right, rgba(255, 0, 0, 0.2) 0px 100px, transparent 150px 100%);
      }

      .confirmPass {
        background: url('data:image/svg+xml;charset=UTF-8, <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="rgba(0, 0, 0, .1)" style="margin-top : 5px" class="bi bi-bag-check" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M10.854 8.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 0 1 .708-.708L7.5 10.793l2.646-2.647a.5.5 0 0 1 .708 0z"/><path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1zm3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4h-3.5zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V5z"/></svg>'),
          linear-gradient(to right, rgba(230, 230, 230, 1) 0px 100px, transparent 150px 100%);
        /*background-position: 0px 5px !important;*/
      }

      .confirmPassError {
        background: url('data:image/svg+xml;charset=UTF-8, <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="rgba(0, 0, 0, .1)" style="margin-top : 5px" class="bi bi-bag-check" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M10.854 8.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 0 1 .708-.708L7.5 10.793l2.646-2.647a.5.5 0 0 1 .708 0z"/><path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1zm3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4h-3.5zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V5z"/></svg>'),
          linear-gradient(to right, rgba(255, 0, 0, 0.2) 0px 100px, transparent 150px 100%);
      }

      .infoAlarm {
        padding-right: 50px;
        font-size: 12px;
        color: rgb(255, 0, 0);
        letter-spacing: 3px;
        text-align: right;
      }
    }
  }

  .atRegister {
    grid-template-columns: 1fr !important;
  }

  .extraLine {
    width: 100%;
    padding: 10px;
    margin-top: 20px;
    text-align: center;
    /*background-color: rgba(230, 230, 230, .5);*/
    background: linear-gradient(transparent 0px 23px,
        rgb(210, 210, 210) 23px 23px,
        transparent 24px 30px);
    display: grid;
    grid-template-columns: 1fr 1fr;
    column-gap: 1px;

    .register,
    .forgetPass {
      width: 100px;
      letter-spacing: 2px;
      background: rgb(255, 255, 255);
      cursor: pointer;
    }

    .register:hover,
    .forgetPass:hover {
      color: rgb(0, 82, 235);
      background-color: rgb(210, 225, 255);
      border-radius: 99em;
      font-weight: 600;
    }
  }

  .extraLine div {
    display: flex;
    justify-content: center;
    justify-items: center;
  }

  .submitBtnCase {
    padding-top: 20px;
    display: flex;
    justify-content: center;

    .submitButton {
      width: 300px;
      padding: 10px;
      color: rgb(255, 255, 255);
      letter-spacing: 3px;
      text-align: center;
      background: rgb(50, 50, 50);
      border-radius: 5px;
      cursor: pointer;
    }
  }

  .forgetPassContainer {
    padding: 20px;
    letter-spacing: .2rem;
    color: rgb(50, 50, 50);

    .forgetPassWording {
      padding-bottom: 10px;
      font-size: 1rem;
      text-align: center !important;
    }

    .forgetPassPS {
      padding-bottom: 30px;
      letter-spacing: .1rem;
      font-size: .8rem;
      text-align: center;
      color: rgb(165, 0, 0);
    }

    .forgetPassInput {
      padding-bottom: 30px;
      display: grid;
      grid-template-columns: 1fr;

      .forgetPassError {
        padding: 0px 10px;
        color: rgb(255, 0, 0);
        font-size: .8rem;
        text-align: right;
      }
    }

    .forgetPassBtnCase {
      display: grid;
      grid-template-columns: 1fr 1fr;
      column-gap: 30px;
      justify-content: center;
      justify-items: center;

      .forgetPassAbortBtn,
      .forgetPassSubmitBtn {
        width: 80%;
        padding: 10px 20px;
        color: rgb(255, 255, 255);
        text-align: justify;
        text-align-last: justify;
        border-radius: 5px;
        background-color: rgba(210, 210, 210);
        cursor: pointer;
      }

      .forgetPassAbortBtn {
        background-color: rgb(165, 0, 0);
      }

      .forgetPassAbortBtn:hover {
        background-color: rgb(100, 0, 0);
      }

      .forgetPassSubmitBtn {
        background-color: rgb(0, 165, 0);
      }

      .forgetPassSubmitBtn:hover {
        background-color: rgb(0, 100, 0);
      }

      .forgetPassSubmitBtn_disabled,
      .forgetPassSubmitBtn_disabled:hover {
        color: rgb(155, 155, 155);
        background-color: rgba(210, 210, 210);
        cursor: not-allowed;
      }
    }
  }
}

@media screen and (max-width: 768px) {
  .loginHeader {
    padding: 0px !important;
  }

  .inputZone {
    height: calc(100% - 50px) !important;
    overflow-y: auto;

    .thirdPartyLogin {
      padding: 20px !important;
    }

    .accountInfo {
      padding-top: 20px;

      .infoLine {
        width: 100% !important;
        margin: 0px !important;
      }
    }
  }
}

.btnDisabled {
  cursor: not-allowed !important;
  background-color: rgb(200, 200, 200) !important;
}
</stlyle>

<script setup lang="ts">
import { ref, watch } from 'vue'
import swal from 'sweetalert2'
import sysAlarm from '@/assets/ts/sysAlarm'
import thirdPartyLauncher from '@/assets/ts/ThirdPartyLauncher'
import memberLauncher from '@/assets/ts/MemberLauncher'
import { sysConfig } from '@/stores/sysConfig'
import { useRoute, useRouter } from 'vue-router'
import apiProcdure from '@/assets/ts/APIProcdure'

const config = sysConfig()
const alarm = new sysAlarm()
const now = new Date()
const TPL = new thirdPartyLauncher()
const launcher = new memberLauncher()
const api = new apiProcdure()
const router = useRouter()
const greeting =
  now.getHours() < 11
    ? '早安'
    : now.getHours() > 13
      ? '日安'
      : now.getHours() > 18
        ? '晚安'
        : '日安'

//定義數值上抛器
const emit = defineEmits(['callBack', 'loadingSwitch', 'closeDailog', 'memberStatusChange'])

let loginInfo = ref({
  account: '',
  password: '',
  confirmPass: ''
})

let loginError = ref({
  account: {
    error: false,
    text: ''
  },
  pass: {
    error: false,
    text: ''
  },
  cpass: {
    error: false,
    text: ''
  }
})

let forgetPassword = ref(false)
let hidePass = ref(true)
let hideConfirmPass = ref(true)
let isLogin = ref(true)
let allPass = ref(false)
let memberInfo = ref(config.getMember())
let fpMail = ref("")
let fpMailPass = ref(false)
let ftMailError = ref("")
let props = defineProps({
  reset: Number
})

watch(
  () => props.reset,
  (before, after) => {
    loginInfo.value.account = ''
    loginInfo.value.password = ''
    loginInfo.value.confirmPass = ''

    loginError.value.account.error = false
    loginError.value.pass.error = false
    loginError.value.cpass.error = false

    allPass.value = false
    fpMail.value = ""
    fpMailPass.value = false
    ftMailError.value = ""
    forgetPassword.value = false
  }
)

const hideSwitch = (hideField: number) => {
  if (hideField > 0) {
    hideConfirmPass.value = !hideConfirmPass.value
  } else {
    hidePass.value = !hidePass.value
  }
}

const confirmAccount = () => {
  //console.log('confirmAccount')
  let regex = new RegExp(/^[^@\s]+@[^@\s]+\.[^@\s]+$/)

  loginError.value.account.error = !regex.test(loginInfo.value.account)
  if (!regex.test(loginInfo.value.account)) loginError.value.account.text = 'Email格式不正確'

  verifyInfo()
}

const confirmPass = () => {
  let regex = new RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,12}$/)

  loginError.value.pass.error = !regex.test(loginInfo.value.password)
  if (!regex.test(loginInfo.value.password)) loginError.value.pass.text = '密碼格式不正確'

  verifyInfo()
}

const confirmVerify = () => {
  let regex = new RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,12}$/)
  loginError.value.cpass.error = loginInfo.value.password != loginInfo.value.confirmPass
  if (loginInfo.value.password != loginInfo.value.confirmPass)
    loginError.value.cpass.text = '確認密碼密碼輸入不一致'

  loginError.value.cpass.error = !regex.test(loginInfo.value.confirmPass)
  if (!regex.test(loginInfo.value.confirmPass)) loginError.value.cpass.text = '確認密碼格式不正確'

  verifyInfo()
}

const verifyInfo = () => {
  allPass.value =
    loginInfo.value.account != '' &&
    loginInfo.value.password != '' &&
    loginInfo.value.confirmPass != '' &&
    !loginError.value.account.error &&
    !loginError.value.pass.error &&
    !loginError.value.cpass.error

  //console.log(allPass.value)
  //return allPass.value
}

const loginOrRegister = () => {
  console.log("loginOrRegister => " + (isLogin.value ? "login" : "register"))

  if (isLogin.value) {
    proceedLogin()
  } else {
    proceedRegister()
  }
}

const proceedRegister = async () => {
  console.log("register");
  const verifyPath = config.hostPath + config.memberExistenceCheckPath

  loadingSwitch(true)
  const checkResult: any = await api.callAPI(verifyPath, { mMail: loginInfo.value.account })
  loadingSwitch(false)

  if (checkResult.message) {
    swal.fire({
      icon: 'warning',
      title: '您所輸入的資訊發生錯誤!',
      text: '您所輸入的 eMail 已經存在',
      showCancelButton: false,
      confirmButtonColor: '#3085d6',
      confirmButtonText: '碓定'
    })
  } else {

    loadingSwitch(true)
    const registerPath = config.hostPath + config.memberRegisterPath
    const registerResult: any = await api.callAPI(registerPath, { account: loginInfo.value.account, password: loginInfo.value.password })
    loadingSwitch(false)

    let finalSubject = "註冊" + (registerResult.result ? "成功" : "失敗")
    let finalMessage = registerResult.result ? "請至您剛才輸入的信箱收臤確認郵件，完成您的註冊" : "系統發生問題，請秋候再試"

    swal.fire({
      icon: registerResult.result ? 'success' : 'warning',
      title: finalSubject,
      text: finalMessage,
      showCancelButton: false,
      confirmButtonColor: '#3085d6',
      confirmButtonText: '碓定'
    }).then((result) => {
      emit('closeDailog')
    })
  }
}

const proceedLogin = async () => {
  if (
    loginInfo.value.account != '' ||
    loginInfo.value.password != '' ||
    loginInfo.value.confirmPass != ''
  ) {
    if (!allPass.value) {
      swal.fire({
        icon: 'warning',
        title: '輸入資訊不完整',
        text: '您所輸入的' + (isLogin.value ? '登入' : '註冊') + '資訊不完全哦!!',
        showCancelButton: false,
        confirmButtonColor: '#3085d6',
        confirmButtonText: '碓定'
      })
    } else {
      loadingSwitch(true)
      const loginResult = await launcher.userLogin(loginInfo.value.account, loginInfo.value.password)
      loadingSwitch(false)

      if (loginResult.result) {
        const userInfo = loginResult.message

        const GenderText = memberInfo.value.gender == '0' ? '小姐' : '先生'

        emit('callBack', null, '')

        swal.fire({
          icon: 'success',
          title: "登入成功",
          text: userInfo.mName + " 您好",
          //showCancelButton: true,
          confirmButtonColor: '#3085d6',
          //cancelButtonColor: '#d33',
          confirmButtonText: '碓定',
          //cancelButtonText: '放棄'
        })
          .then((result) => {
            if (result.isConfirmed) {
              memberInfo.value.id = "" + userInfo.mID
              memberInfo.value.name = "" + userInfo.mName
              memberInfo.value.gender = "" + userInfo.mGender == null ? "未設定" : userInfo.mGender == 0 ? "女" : "男"
              memberInfo.value.email = "" + userInfo.mMail
              memberInfo.value.avatar = "" + userInfo.mAvatar
              memberInfo.value.tel = "" + userInfo.mTelHome
              memberInfo.value.mobile = "" + userInfo.mMobile
              memberInfo.value.addressZip = "" + userInfo.mZip
              memberInfo.value.addressCity = "" + userInfo.mAddressCity
              memberInfo.value.addressArea = "" + userInfo.mAddressArea
              memberInfo.value.addressOther = "" + userInfo.mAddressRest

              config.setMemberInfo(memberInfo.value)

              emit('memberStatusChange', memberInfo)
              emit('closeDailog')
            }
          })
      } else {
        swal.fire({
          icon: 'error',
          title: "登入失敗",
          text: "請您再次確認您的登入資訊是否正確",
          //showCancelButton: true,
          confirmButtonColor: '#3085d6',
          //cancelButtonColor: '#d33',
          confirmButtonText: '碓定',
          //cancelButtonText: '放棄'
        })
          .then((result) => {
          })
      }
    }
  }
}

const googleLogin = async () => {

  const googleAccount = await TPL.googleLogin()

  loadingSwitch(true)
  const loginResult = await launcher.googleLogin(googleAccount.sub, googleAccount.name, googleAccount.email, googleAccount.picture)
  loadingSwitch(false)

  if (loginResult.result) {
    const resultCode = loginResult.result.code
    const userInfo = loginResult.message

    swal.fire({
      icon: 'success',
      title: "登入成功",
      text: userInfo.mGoogleName + " 您好",
      //showCancelButton: true,
      confirmButtonColor: '#3085d6',
      //cancelButtonColor: '#d33',
      confirmButtonText: '碓定',
      //cancelButtonText: '放棄'
    })
      .then((result) => {
        if (result.isConfirmed) {
          memberInfo.value.id = "" + userInfo.mID
          memberInfo.value.name = "" + userInfo.mGoogleName
          memberInfo.value.gender = "" + userInfo.mGender == null ? "未設定" : userInfo.mGender == 0 ? "女" : "男"
          memberInfo.value.avatar = "" + userInfo.mGoogleIcon
          memberInfo.value.email = "" + userInfo.mMail
          memberInfo.value.tel = "" + userInfo.mTelHome
          memberInfo.value.mobile = "" + userInfo.mMobile
          memberInfo.value.addressZip = "" + userInfo.mZip
          memberInfo.value.addressCity = "" + userInfo.mAddressCity
          memberInfo.value.addressArea = "" + userInfo.mAddressArea
          memberInfo.value.addressOther = "" + userInfo.mAddressRest

          sessionStorage.setItem('memberID', memberInfo.value.id)
          sessionStorage.setItem('memberName', memberInfo.value.name)
          sessionStorage.setItem('memberGender', memberInfo.value.gender)
          sessionStorage.setItem('memberEmail', memberInfo.value.email)
          sessionStorage.setItem('memberAvatar', memberInfo.value.avatar)
          sessionStorage.setItem('memberMobile', memberInfo.value.mobile)
          sessionStorage.setItem('memberTel', memberInfo.value.tel)
          sessionStorage.setItem('memberAddrZip', memberInfo.value.addressZip)
          sessionStorage.setItem('memberAddrCity', memberInfo.value.addressCity)
          sessionStorage.setItem('memberAddrArea', memberInfo.value.addressArea)
          sessionStorage.setItem('memberAddress', memberInfo.value.addressOther)

          emit('memberStatusChange', memberInfo)
          emit('closeDailog')
        }
      })
  } else {
    swal.fire({
      icon: 'error',
      title: "登入失敗",
      text: "請您再次確認您的登入資訊是否正確",
      //showCancelButton: true,
      confirmButtonColor: '#3085d6',
      //cancelButtonColor: '#d33',
      confirmButtonText: '碓定',
      //cancelButtonText: '放棄'
    })
      .then((result) => {
      })
  }
}

const verifyMail = () => {
  let regex = new RegExp(/^[^@\s]+@[^@\s]+\.[^@\s]+$/)

  fpMailPass.value = regex.test(fpMail.value)
  ftMailError.value = fpMailPass.value ? '' : 'Email格式不正確'
}

const applyResetPassword = async () => {
  if (fpMailPass.value) {

    const verifyPath = config.hostPath + config.memberExistenceCheckPath

    loadingSwitch(true)
    const checkResult: any = await api.callAPI(verifyPath, { mMail: fpMail.value })
    loadingSwitch(false)

    if (!checkResult.message) {
      swal.fire({
        icon: 'error',
        title: "重置失敗",
        text: "您所輸入的 e-mail 不是有效會員帳號",
        //showCancelButton: true,
        confirmButtonColor: '#3085d6',
        //cancelButtonColor: '#d33',
        confirmButtonText: '碓定',
        //cancelButtonText: '放棄'
      }).then((result) => {
        calcelApply()
      })
    } else {
      const applayPath = config.hostPath + config.memberApplyResetPasswordPath

      loadingSwitch(true)
      const applyResult: any = await api.callAPI(applayPath, { mMail: fpMail.value })
      loadingSwitch(false)
      console.log(applyResult)

      if (applyResult.result) {
        if (applyResult.message) {
          swal.fire({
            icon: 'success',
            title: "重置密碼請求已送出",
            text: "請您至剛才所輸入的 e-mail 信箱中收取重置連結，進行密碼重置",
            //showCancelButton: true,
            confirmButtonColor: '#3085d6',
            //cancelButtonColor: '#d33',
            confirmButtonText: '碓定',
            //cancelButtonText: '放棄'
          }).then((result) => {
            calcelApply()
          })
        } else {
          swal.fire({
            icon: 'warning',
            title: "重置密碼請求失敗",
            text: "申請重置密碼次數已超出限制",
            //showCancelButton: true,
            confirmButtonColor: '#3085d6',
            //cancelButtonColor: '#d33',
            confirmButtonText: '碓定',
            //cancelButtonText: '放棄'
          }).then((result) => {
            calcelApply()
          })
        }
      } else {
        swal.fire({
          icon: 'error',
          title: "重置密碼請求失敗",
          text: "系統暫時無法處理您的請求，請稍候再試...",
          //showCancelButton: true,
          confirmButtonColor: '#3085d6',
          //cancelButtonColor: '#d33',
          confirmButtonText: '碓定',
          //cancelButtonText: '放棄'
        }).then((result) => {
          calcelApply()
        })
      }
    }
  }
}

const calcelApply = () => {
  fpMail.value = ""
  fpMailPass.value = false
  ftMailError.value = ""
  forgetPassword.value = false
  emit('closeDailog')
}

const submitLogin = (e : any) => {
  verifyInfo()
  if(e.keyCode == 13 && isLogin.value && allPass.value)proceedLogin()
}

const loadingSwitch = (status: boolean) => {
  emit('loadingSwitch', status)
}
</script>
