<template>
  <div class="dailogHeader">聯絡我們</div>
  <div class="contactContainer">
    <div class="contactArea">
      <h5>公司資料</h5>
      <iframe
        class="MapFrame"
        src="https://www.google.com/maps/embed?pb=!1m16!1m12!1m3!1d7229.331195035147!2d121.5273289953099!3d25.045420131291102!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!2m1!1z6I-v5Yag5oqV6aGn!5e0!3m2!1szh-TW!2stw!4v1698910095572!5m2!1szh-TW!2stw"
        style="border: 0"
        loading="lazy"
        referrerpolicy="no-referrer-when-downgrade"
      ></iframe>
      <div class="companyDataContainer">
        <div class="companyDataLine">
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-geo-alt-fill"
              viewBox="0 0 16 16"
            >
              <path
                d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10zm0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6z"
              />
            </svg>
          </div>
          <div>地址 :</div>
          <div></div>
          <div>台北市中正區忠孝東路二段100號6樓之2</div>
        </div>
        <div class="companyDataLine">
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-envelope"
              viewBox="0 0 16 16"
            >
              <path
                d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4Zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1H2Zm13 2.383-4.708 2.825L15 11.105V5.383Zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741ZM1 11.105l4.708-2.897L1 5.383v5.722Z"
              />
            </svg>
          </div>
          <div>Email :</div>
          <div></div>
          <div><a href="mailto:service@hwa-guan.com.tw">service@hwa-guan.com.tw</a></div>
        </div>
        <div class="companyDataLine">
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-clock"
              viewBox="0 0 16 16"
            >
              <path
                d="M8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71V3.5z"
              />
              <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm7-8A7 7 0 1 1 1 8a7 7 0 0 1 14 0z" />
            </svg>
          </div>
          <div>營業時間 :</div>
          <div></div>
          <div class="companyService">
            <div>週一～五</div>
            <div>8:30 ~ 18:00</div>
            <div>週六、日</div>
            <div>休息</div>
          </div>
        </div>
      </div>
    </div>
    <div class="contactArea">
      <div class="contactForm">
        <div class="contactFormTitle">
          <h5>聯絡表單</h5>
        </div>
        <div class="contactFormBody">
          <div class="contactFormBodyContainer">
            <div class="contactFormBodyLine">
              <div class="contactFormInputTitle">姓　　名</div>
              <div>
                <input
                  type="text"
                  class="nameField"
                  :class="{ inputError: nameErr }"
                  placeholder="請輸入您的姓名"
                  v-model="contactData.name"
                  @keydown="
                    ($event.keyCode >= 48 && $event.keyCode <= 57) ||
                    ($event.keyCode >= 96 && $event.keyCode <= 111) ||
                    ($event.keyCode >= 186 && $event.keyCode <= 192) ||
                    ($event.keyCode >= 219 && $event.keyCode <= 222)
                      ? $event.preventDefault()
                      : null
                  "
                  @change="verifyName"
                  maxlength="5"
                />
                <div class="nameAlarm" :class="{ showAlarm: nameErr }">姓名格式不正確</div>
              </div>
            </div>
            <div class="contactFormBodyLine">
              <div class="contactFormInputTitle">手　　機</div>
              <div>
                <input
                  type="number"
                  class="phoneField"
                  :class="{ inputError: phoneErr }"
                  placeholder="請輸入您的手機號碼"
                  v-model="contactData.phone"
                  @keydown="
                    $event.key === '-' ||
                    $event.key === 'e' ||
                    $event.key === '.' ||
                    ('' + contactData.phone).length > 10
                      ? $event.preventDefault()
                      : null
                  "
                  @keyup="verifyPhone"
                  @change="verifyPhone2"
                />
                <div class="phoneAlarm" :class="{ showAlarm: phoneErr }">手機格式不正確</div>
              </div>
            </div>
            <div class="contactFormBodyLine">
              <div class="contactFormInputTitle">電子郵件</div>
              <div>
                <input
                  type="text"
                  class="emailField"
                  :class="{ inputError: mailErr }"
                  placeholder="請輸入您的電子郵件信箱"
                  v-model="contactData.mail"
                  @keydown="
                    ($event.keyCode >= 219 && $event.keyCode <= 222) ||
                    $event.keyCode === 106 ||
                    $event.keyCode === 107 ||
                    $event.keyCode === 111 ||
                    $event.key === '!' ||
                    $event.key === '`' ||
                    $event.key === '~' ||
                    $event.key === '#' ||
                    $event.key === '$' ||
                    $event.key === '%' ||
                    $event.key === '^' ||
                    $event.key === '&' ||
                    $event.key === '*' ||
                    $event.key === '(' ||
                    $event.key === ')' ||
                    $event.key === '=' ||
                    $event.key === '\\' ||
                    $event.key === '?' ||
                    $event.key === '/' ||
                    $event.key === '<' ||
                    $event.key === '>' ||
                    $event.key === '+' ||
                    $event.key === ';' ||
                    $event.key === ',' ||
                    $event.key === ':'
                      ? $event.preventDefault()
                      : null
                  "
                  @change="verifyMail"
                />
                <div class="emailAlarm" :class="{ showAlarm: mailErr }">Email格式不正確</div>
              </div>
            </div>
            <div class="contactFormBodyLine">
              <div class="contactFormInputTitle">聯絡內容</div>
              <div>
                <textarea
                  :class="{ inputError: msgErr }"
                  rows="5"
                  placeholder="請輸入您的留言"
                  v-model="contactData.content"
                  @change="verifyMsg"
                ></textarea>
                <div class="msgAlarm" :class="{ showAlarm: msgErr }">聯絡內容不可為空白</div>
              </div>
            </div>
          </div>
          <div class="contactFormBtnContainer">
            <blutton type="button" class="btn btn-sm btn-primary" @click="submitVerify"
              >送出表單</blutton
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
/* Chrome, Safari, Edge, Opera */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
input[type='number'] {
  -moz-appearance: textfield;
}

.MapFrame {
  width: 500px;
  height: 300px;
}

.dailogHeader {
  padding-bottom: 20px;
  font-size: 1.5rem;
  border-bottom: 2px rgb(220, 220, 220) solid;
}

.contactContainer {
  height: 95%;
  padding: 20px;
  display: grid;
  grid-template-columns: 500px auto;
  column-gap: 50px;
  letter-spacing: 2px;

  .companyDataContainer {
    .companyDataLine {
      padding-top: 15px;
      display: grid;
      grid-template-columns: 30px auto;

      .companyService {
        display: grid;
        grid-template-columns: 100px auto;
      }
    }
  }

  .contactForm {
    border: 1px rgb(220, 220, 220) solid;
    border-radius: 10px;

    .contactFormTitle {
      padding: 10px 15px;
      background-color: rgb(220, 220, 220);
      border-radius: 8px 8px 0px 0px;
    }

    .contactFormBody {
      padding: 0px 10px;

      .contactFormBodyContainer {
        background: rgb(220, 220, 220);
        display: grid;
        grid-template-columns: 1fr;
        row-gap: 1px;
      }

      .contactFormBodyLine {
        padding: 10px 0px;
        background: rgb(255, 255, 255);
        display: grid;
        grid-template-columns: 80px auto;

        input,
        textarea {
          width: 100%;
          padding: 5px 10px;
          border: 1px transparent solid;
          border-radius: 5px;
          resize: none;
        }

        input:focus,
        textarea:focus {
          outline: 2px rgba(0, 81, 255, 0.3) solid;
        }

        input::placeholder,
        textarea::placeholder {
          font-size: 0.8rem;
          color: rgba(180, 180, 180, 0.8);
          letter-spacing: 2px;
        }
      }
    }
  }
}

.contactContainer iframe {
  box-shadow: 3px 3px 5px rgba(100, 100, 100, 0.3);
}

.contactFormBtnContainer {
  padding: 20px 0px;
  text-align: right;
}

.nameAlarm,
.phoneAlarm,
.emailAlarm,
.msgAlarm {
  padding-top: 5px;
  color: rgb(255, 0, 0);
  font-size: 13px;
  text-align: right;
  display: none;
}

.inputError {
  outline: 2px rgba(255, 0, 0, 0.8) solid;
}

.showAlarm {
  display: block;
}

@media screen and (max-width: 768px) {
  .MapFrame {
    width: 100%;
    height: 30%;
  }

  .contactContainer {
    height: calc(100% - 70px);
    display: block !important;
    overflow-y: auto;
  }

  .contactArea {
    padding-bottom: 50px;
  }
}
</style>

<script setup lang="ts">
import { ref, watch } from 'vue'
import swal from 'sweetalert2'

//定義表單資料模型物件
let contactData = ref({
  name: '',
  phone: '',
  mail: '',
  content: ''
})

//定義資料錯誤指標
let nameErr = ref(false)
let phoneErr = ref(false)
let mailErr = ref(false)
let msgErr = ref(false)

const emit = defineEmits(['callBack']) //定義資料上拋方法

//定義上層傳入變數接收器
const props = defineProps({
  reset: Number
})

watch(
  //頁面重新開啟時清空輸入格與錯誤狀態
  () => props.reset,
  (before, after) => {
    contactData.value.name = ''
    contactData.value.phone = ''
    contactData.value.mail = ''
    contactData.value.content = ''
    nameErr.value = false
    phoneErr.value = false
    mailErr.value = false
    msgErr.value = false
  }
)

//驗證姓名欄位正確性
const verifyName = () => {
  const inputName = '' + contactData.value.name
  nameErr.value = inputName.length == 0
  emit('callBack', contactData.value) //把資料物件向上層拋送
}

//手機欄位輸入檢核
const verifyPhone = () => {
  if (eval(contactData.value.phone) > 9999999999) contactData.value.phone = '9'
  let mobNo = ((eval(contactData.value.phone) > 0 ? '0' : '') + contactData.value.phone).replace(
    '.',
    ''
  )
  contactData.value.phone = mobNo.slice(0, 10)
}

//驗證手機欄位正確性
const verifyPhone2 = () => {
  const inputPhone = '' + contactData.value.phone
  phoneErr.value = inputPhone.length < 10 || inputPhone.slice(0, 2) != '09'
  emit('callBack', contactData.value) //把資料物件向上層拋送
}

//驗證Email欄位正確性
const verifyMail = () => {
  const re = /^(([.](?=[^.]|^))|[\w_%{|}#$~`+!?-])+@(?:[\w-]+\.)+[a-zA-Z.]{2,63}$/
  const inputMail = '' + contactData.value.mail
  mailErr.value = inputMail == '' || !re.test(inputMail)
  emit('callBack', contactData.value) //把資料物件向上層拋送
}

//驗證留言欄位正確性
const verifyMsg = () => {
  const inputMsg = '' + contactData.value.content
  msgErr.value = inputMsg.length == 0
  emit('callBack', contactData.value) //把資料物件向上層拋送
}

//送出表單前檢查
const submitVerify = () => {
  verifyName()
  verifyPhone2()
  verifyMail()
  verifyMsg()

  if (nameErr.value || phoneErr.value || mailErr.value || msgErr.value) {
    swal
      .fire({
        icon: 'warning',
        title: '輸入資料不完整',
        text: '請確認所有欄位是否依規則正確填寫哦~',
        showCancelButton: false,
        confirmButtonColor: '#3085d6',
        confirmButtonText: '碓定'
      })
      .then((result) => {})
  }
}
</script>
