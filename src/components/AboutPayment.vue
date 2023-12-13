<template>
  <div class="webSelection">
    <div
      :class="{
        selectionItem: pickedItem != index + 1,
        selectionItem_picked: pickedItem == index + 1
      }"
      v-for="(sel, index) in slideList"
      :key="index"
      @click="switchCase(index + 1)"
    >
      {{ sel.text }}
    </div>
  </div>
  <Carousel
    :items-to-show="2.5"
    :wrap-around="true"
    ref="carousel"
    class="mobileSelection"
    v-model="currentSlide"
  >
    <Slide v-for="(slide, index) in slideList" :key="index">
      <div class="carousel__item">{{ slide.text }}</div>
    </Slide>

    <template #addons>
      <navigation>
        <template #next>
          <svg
            class="carousel__icon"
            viewBox="0 0 20 20"
            style="width: 24px; height: 24px; position: absolute; right: -30px"
            role="img"
            aria-label="Arrow pointing to the right"
            @click="switchCase(pickedItem + 1)"
          >
            <title>下一則</title>
            <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"></path>
          </svg>
        </template>
        <template #prev>
          <svg
            class="carousel__icon"
            viewBox="0 0 20 20"
            style="width: 24px; height: 24px; position: absolute; left: -35px"
            role="img"
            aria-label="Arrow pointing to the left"
            @click="switchCase(pickedItem - 1)"
          >
            <title>上一則</title>
            <path d="M15.41 16.59L10.83 12l4.58-4.59L14 6l-6 6 6 6 1.41-1.41z"></path>
          </svg>
        </template>
      </navigation>
      <Pagination />
    </template>
  </Carousel>
  <div class="storeTabContainer" v-if="pickedItem == 5">
    <div class="storeTabContainerCase">
      <div
        class="sevenTab"
        :class="{ sevenTab_active: m_type == 1 }"
        @click="changeMT(1)"
        title="7-ELEVEN ibon"
      ></div>
    </div>
    <div class="storeTabContainerCase">
      <div
        class="familyTab"
        :class="{ familyTab_active: m_type == 2 }"
        @click="changeMT(2)"
        title="全家 FamiPort"
      ></div>
    </div>
    <div class="storeTabContainerCase">
      <div
        class="hilifeTab"
        :class="{ hilifeTab_active: m_type == 3 }"
        @click="changeMT(3)"
        title="萊爾富 Life-ET"
      ></div>
    </div>
  </div>
  <div class="paymentContainer">
    <component :is="activeCase" :mtype="m_type"></component>
    <div class="paymentRefundHead">
      <h6>退款處理</h6>
    </div>
    <div class="paymentRefund">
      退費之處理方式(退費日以會員收到本公司書面通知日為準，應於收到書面通知七日內與本公司聯繫處理)
      <div class="fdrundBlock">
        <div class="refundNo">1.</div>
        <div class="refundContent longText">
          於契約(投顧委任契約，以下稱為契約)簽訂之日起七日內書面通知終止本契約者，本公司得請求終止契約前所提供服務之相當報酬。(如傳輸設備未損壞並退還本公司，則無須負擔任何費用；如傳輸設備損壞可歸責於會員，則本公司得視損壞程度向會員收取合理之修繕或賠償費用)，但不得請求契約終止之損害賠償或違約金。
        </div>
      </div>
      <div class="fdrundBlock">
        <div class="refundNo">2.</div>
        <div class="refundContent longText">
          自本契約簽訂之日起已逾七日，本公司可向會員請求契約所提列之所有成本項目，如：資訊設定費、資訊傳輸費(以月計費)、設備費及其他必須支出成本(如：技術分析課、講座、講義、DVD…等，視專案內容計費)，並約定載明扣除顧問費比例如下：(會期計算方式：使用天數未滿15日以半個月計算，超過15日以一個月計算)。自簽約之日起15日內者，扣除顧問費30%。自簽約之日起，未達會期四分之一者，扣除顧問費50%。自簽約之日起，未達會期二分之一者，扣除顧問費60%。自簽約之日起，未達四分之三者，扣除顧問費70%。自簽約之日起逾會期四分之三者，扣除顧問費100%。本公司可依照上述約定扣除相關金額後，再將剩餘款項退回給會員。
        </div>
      </div>
      <div class="fdrundBlock">
        <div class="refundNo">3.</div>
        <div class="refundContent longText">
          若會員以信用卡支付顧問報酬者，僅得以信用卡辦理退費。本公司依照上述規則計算退費款項後，將該金額退回會員的信用卡帳戶，於信用卡帳單中做負項處理，退回時間以會員所使用之信用卡銀行作業時間為準，與本公司無涉。
        </div>
      </div>
      <div class="fdrundBlock">
        <div class="refundNo">4.</div>
        <div class="refundContent longText">
          會員如申請退費之程序須配合本公司作業流程，撥款日以本公司會計作帳時間為準。
        </div>
      </div>
    </div>
    <div class="paymentFAQHead">
      <h6>常見問題</h6>
    </div>
    <div class="paymentFAQ">
      <div class="bolckContainerBlock">
        <div class="bolckContainerNo question">Q</div>
        <div class="bolckContainerContent longText question">
          信用卡付費，持卡人可以選擇哪些卡片？
        </div>
        <div class="bolckContainerNo">A</div>
        <div class="bolckContainerContent longText">
          提供消費者使用 VISA / MASTER / JCB 等卡片進行刷卡消費。
        </div>
      </div>
      <div class="bolckContainerBlock">
        <div class="bolckContainerNo question">Q</div>
        <div class="bolckContainerContent longText question">信用卡持卡人消費需要付手續費嗎？</div>
        <div class="bolckContainerNo">A</div>
        <div class="bolckContainerContent longText">消費者不須支付任何手續費用。</div>
      </div>
      <div class="bolckContainerBlock">
        <div class="bolckContainerNo question">Q</div>
        <div class="bolckContainerContent longText question">為什麼信用卡付款失敗？</div>
        <div class="bolckContainerNo">A</div>
        <div class="bolckContainerContent longText">
          可能的原因有：
          <div class="bolckContainerBlock">
            <div class="bolckContainerNo">1.</div>
            <div class="bolckContainerContent longText">信用卡第一次使用尚未開卡。</div>
            <div class="bolckContainerNo">2.</div>
            <div class="bolckContainerContent longText">信用卡卡號或到期日輸入錯誤。</div>
            <div class="bolckContainerNo">3.</div>
            <div class="bolckContainerContent longText">信信用卡已超過到期日使用期限。</div>
            <div class="bolckContainerNo">4.</div>
            <div class="bolckContainerContent longText">超出信用卡使用額度或餘額不足。</div>
            <div class="bolckContainerNo">5.</div>
            <div class="bolckContainerContent longText">信用卡發卡銀行內部系統問題…等。</div>
            <div class="bolckContainerNo">6.</div>
            <div class="bolckContainerContent longText">
              此筆卡號同時有人刷卡授權中，因此視窗會跳出。
            </div>
            <div class="bolckContainerNo">7.</div>
            <div class="bolckContainerContent longText">信用卡授權時，網路斷線。</div>
          </div>
          若您的信用卡並未超出使用額度，請重新購買。<br /><br />
          提醒您！請留意輸入的信用卡卡號、姓名、到期日以及卡片背後末3碼是否正確。如果依然收到授權失敗的通知，可能原因為發卡銀行內部系統作業問題，請與您的信用卡發卡銀行聯絡。
        </div>
      </div>
      <div class="bolckContainerBlock">
        <div class="bolckContainerNo question">Q</div>
        <div class="bolckContainerContent longText question">
          使用超商條碼/代碼付款需要負擔手續費嗎？
        </div>
        <div class="bolckContainerNo">A</div>
        <div class="bolckContainerContent longText">
          消手續費由本公司負擔，提醒您！超商店員不會在結帳時另外收取手續費。
        </div>
      </div>
      <div class="bolckContainerBlock">
        <div class="bolckContainerNo question">Q</div>
        <div class="bolckContainerContent longText question">超商付款繳款期限已過了該怎麼辦？</div>
        <div class="bolckContainerNo">A</div>
        <div class="bolckContainerContent longText">
          繳款代碼/條碼一但超過繳費期限，該筆訂單將自動取消。請重新訂購商品，再次取得一組新的繳費代碼/條碼。
        </div>
      </div>
      <div class="bolckContainerBlock">
        <div class="bolckContainerNo question">Q</div>
        <div class="bolckContainerContent longText question">超商付款後需要將收據回傳嗎？</div>
        <div class="bolckContainerNo">A</div>
        <div class="bolckContainerContent longText">
          不用。提醒您！務必將繳費證明單妥善收放，以應日後發生帳務問題時核對！
        </div>
      </div>
      <div class="bolckContainerBlock">
        <div class="bolckContainerNo question">Q</div>
        <div class="bolckContainerContent longText question">ATM櫃員機轉帳失敗？</div>
        <div class="bolckContainerNo">A</div>
        <div class="bolckContainerContent longText">
          可能的原因有：
          <div class="transferFailed">
            <div class="transferFailedRowHeader">
              <div>可能原因</div>
              <div>建議</div>
            </div>
            <div class="transferFailedRow">
              <div>帳號輸入錯誤</div>
              <div>請再重新轉帳一次，並檢查帳號是否輸入正確。</div>
            </div>
            <div class="transferFailedRow">
              <div>匯款金額輸入錯誤</div>
              <div>
                請於重新轉帳時，檢查匯款金額是否輸入正確。(金額與您當初購買之賣場金額需一致)
              </div>
            </div>
            <div class="transferFailedRow">
              <div>帳號繳款期限過期</div>
              <div>請至原賣場重新購買取得新的繳款帳號。</div>
            </div>
            <div class="transferFailedRow">
              <div>餘額不足</div>
              <div>請確認轉帳之銀行帳戶，餘額是否足夠匯款。</div>
            </div>
            <div class="transferFailedRow">
              <div>提款卡未啟用轉帳功能</div>
              <div>請聯絡您的發卡機構，協助辦理。</div>
            </div>
            <div class="transferFailedRow">
              <div>銀行帳戶未啟用「非約定轉帳」功能</div>
              <div>請聯絡您的發卡機構，協助辦理。</div>
            </div>
            <div class="transferFailedRow">
              <div>轉帳一直出現錯誤頁面</div>
              <div>建議您可更換其他台提款機，或有可能是銀行端連線發生問題。</div>
            </div>
          </div>
        </div>
      </div>
      <div class="bolckContainerBlock">
        <div class="bolckContainerNo question">Q</div>
        <div class="bolckContainerContent longText question">ATM櫃員機帳號繳費期限已過怎麼辦？</div>
        <div class="bolckContainerNo">A</div>
        <div class="bolckContainerContent longText">請重新購買，並於繳費期限內完成轉帳。</div>
      </div>
      <div class="bolckContainerBlock">
        <div class="bolckContainerNo question">Q</div>
        <div class="bolckContainerContent longText question">
          網路ATM、ATM櫃員機轉帳、超商代碼、及網路超商代碼繳費，最晚的繳費期限為何？
        </div>
        <div class="bolckContainerNo">A</div>
        <div class="bolckContainerContent longText">
          <div class="bolckContainerBlock">
            <div class="bolckContainerNo">1.</div>
            <div class="bolckContainerContent longText">
              網路ATM、ATM櫃員機轉帳，繳費期限為４天。
            </div>
            <div class="bolckContainerNo">2.</div>
            <div class="bolckContainerContent longText">
              超商代碼、及網路超商代碼繳費，繳費期限為7天。
            </div>
          </div>
          如超過繳費期限，請重新購買，並於繳費期限內完成付款。
        </div>
      </div>
      <div class="bolckContainerBlock">
        <div class="bolckContainerNo question">Q</div>
        <div class="bolckContainerContent longText question">如何查詢是否付款成功？</div>
        <div class="bolckContainerNo">A</div>
        <div class="bolckContainerContent longText">
          付款成功後，將會發送email及簡訊通知。也可至「會員專區-購買紀錄」查詢。如有其他問題，請與我們聯繫查詢。
        </div>
      </div>
      <div class="bolckContainerBlock">
        <div class="bolckContainerNo question">Q</div>
        <div class="bolckContainerContent longText question">
          付款成功後，是否可以馬上使用購買之產品功能？
        </div>
        <div class="bolckContainerNo">A</div>
        <div class="bolckContainerContent longText">
          線上付款成功後，利用您所註冊之會員帳號登入「會員專區」，可馬上使用網站之購買產品功能。
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.webSelection {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  column-gap: 30px;

  .selectionItem,
  .selectionItem_picked {
    padding: 5px;
    text-align: center;
    border-radius: 99rem;
  }

  .selectionItem {
    background-color: rgba(220, 220, 220, 0.8);
    cursor: pointer;
  }

  .selectionItem:hover {
    background-color: rgba(255, 144, 0, 0.2);
  }

  .selectionItem_picked {
    background-color: rgba(255, 144, 0, 0.5);
  }
}

.paymentContainer {
  width: 100%;
  height: 90%;
  margin-top: 30px;
  overflow-y: auto;

  .paymentRefundHead,
  .paymentFAQHead {
    padding: 5px 0px 5px 15px;
    margin-top: 50px;
    border-left: 10px rgba(255, 144, 0, 0.5) solid;

    h6 {
      color: rgb(150, 150, 150);
      font-weight: 700;
      letter-spacing: 2px;
      margin: unset;
    }
  }

  .paymentRefund {
    padding: 20px;
    color: rgb(150, 150, 150);
    display: grid;
    row-gap: 30px;

    .fdrundBlock {
      display: grid;
      grid-template-columns: 20px auto;
      text-align: justify;
    }
  }

  .paymentFAQ {
    padding: 30px 0px 0px 30px;
    color: rgb(150, 150, 150);

    .bolckContainerBlock {
      padding-bottom: 50px;
      display: grid;
      grid-template-columns: 20px auto;
      row-gap: 10px;

      .bolckContainerContent {
        padding-right: 30px;
      }

      .longText {
        text-align: justify;
      }
    }

    .question {
      color: rgb(0, 89, 255);
    }
  }

  .transferFailed {
    .transferFailedRow,
    .transferFailedRowHeader {
      display: grid;
      grid-template-columns: 1fr 3fr;
      column-gap: 1px;
      background-color: rgb(220, 220, 220);
      border-left: 1px rgb(220, 220, 220) solid;
      border-right: 1px rgb(220, 220, 220) solid;
      border-bottom: 1px rgb(220, 220, 220) solid;
    }

    .transferFailedRowHeader div {
      text-align: center;
    }

    .transferFailedRow div {
      padding: 10px;
      text-align: left;
      background-color: rgb(255, 255, 255);
    }
  }

  .transferFailed:nth-of-type(1) {
    background-color: rgb(220, 220, 220);
    text-align: center;
  }
}

.mobileSelection {
  display: none;
}

.storeTabContainer {
  width: 50px;
  height: 150px;
  right: 80px;
  top: 200px;
  display: grid;
  grid-template-columns: 1fr;
  row-gap: 15px;
  position: absolute;

  .storeTabContainerCase {
    width: 50px;
    height: 45px;

    .sevenTab,
    .familyTab,
    .hilifeTab {
      width: 40px;
      height: 40px;
      border-radius: 99rem;
      box-shadow: 2px 2px 5px rgba(150, 150, 150, 0.2);
      background-size: 80% !important;
      background-repeat: no-repeat !important;
      transition: all 0.2s;
      cursor: pointer;
    }

    .sevenTab {
      background-position: center 2px !important;
      background: url('../assets/images/SevenEleven_logo_gray.png'), rgb(220, 220, 220);
    }

    .sevenTab_active,
    .sevenTab:hover {
      width: 45px;
      height: 45px;
      background: url('../assets/images/SevenEleven_logo.png'), rgb(255, 255, 255);
      background-size: contain !important;
      border: 3px rgb(255, 255, 255) solid;
      box-shadow: 4px 4px 5px rgba(0, 0, 0, 0.3);
    }

    .sevenTab_active {
      cursor: unset;
    }

    .familyTab {
      background-position: center !important;
      background: url('../assets/images/FamilyMart_logo_gray.png'), rgb(220, 220, 220);
    }

    .familyTab_active,
    .familyTab:hover {
      width: 45px;
      height: 45px;
      background: url('../assets/images/FamilyMart_logo.png'), rgb(255, 255, 255);
      background-size: cover !important;
      border: 3px rgb(255, 255, 255) solid;
      box-shadow: 4px 4px 5px rgba(0, 0, 0, 0.3);
    }

    .familyTab_active {
      cursor: unset;
    }

    .hilifeTab {
      background-position: center !important;
      background: url('../assets/images/HiLife_logo_gray.png'), rgb(220, 220, 220);
    }

    .hilifeTab_active,
    .hilifeTab:hover {
      width: 45px;
      height: 45px;
      background: url('../assets/images/HiLife_logo.png'), rgb(255, 255, 255);
      background-size: cover !important;
      border: 3px rgb(255, 255, 255) solid;
      box-shadow: 4px 4px 5px rgba(0, 0, 0, 0.3);
    }

    .hilifeTab_active {
      cursor: unset;
    }
  }
}

@media screen and (max-width: 768px) {
  .paymentContainer {
    height: calc(100% - 55px) !important;
  }

  .webSelection {
    display: none;
  }

  .mobileSelection {
    display: block;
  }

  .carousel__slide--active {
    background-color: rgba(255, 144, 0, 0.5) !important;
    border-radius: 10px;
  }

  .carousel__slide--active .carousel__item {
    font-weight: 800 !important;
  }

  .carousel__slide--prev,
  .carousel__slide--next {
    font-size: 12px;
    color: rgba(150, 150, 150, 0.8);
  }

  .storeTabContainer {
    right: 15px;
    top: 150px;
  }
}
</style>

<script setup lang="ts">
import { defineComponent, ref, shallowRef, watch } from 'vue'
import { Carousel, Navigation, Slide } from 'vue3-carousel'
import credit from '@/components/PaymentCreditCard.vue'
import atm from '@/components/PaymentATM.vue'
import webatm from '@/components/PaymentWebAtm.vue'
import store from '@/components/PaymentStore.vue'
import stroeMachine from '@/components/PaymentStoreMachine.vue'

import 'vue3-carousel/dist/carousel.css'

let slideList = ref([{ text: '' }])
let pickedItem = ref(1)
let activeCase = shallowRef<any>()
let m_type = ref(0)
let currentSlide = ref(1)

slideList.value = [
  {
    text: '信用卡'
  },
  {
    text: '網路ATM'
  },
  {
    text: 'ATM櫃員機'
  },
  {
    text: '超商代碼'
  },
  {
    text: '超商網路'
  }
]

const changeMT = (MT: number) => {
  m_type.value = MT
}

const switchCase = (cid: number) => {
  pickedItem.value = cid < 1 ? 5 : cid > 5 ? 1 : cid

  console.log('switchCase => ' + pickedItem.value)
  switch (pickedItem.value) {
    case 1:
      activeCase.value = credit
      break
    case 2:
      activeCase.value = webatm
      break
    case 3:
      activeCase.value = atm
      break
    case 4:
      activeCase.value = store
      break
    case 5:
      activeCase.value = stroeMachine
      changeMT(1)
      break
  }
}

switchCase(1)

watch(
  //頁面重新開啟時清空輸入格與錯誤狀態
  () => currentSlide,
  (before, after) => {
    console.log(before + ' => ' + after)
    switch (after.value) {
      case 1:
        activeCase.value = credit
        break
      case 2:
        activeCase.value = webatm
        break
      case 3:
        activeCase.value = atm
        break
      case 4:
        activeCase.value = store
        break
      case 5:
        activeCase.value = stroeMachine
        changeMT(1)
        break
    }
  }
)
</script>
