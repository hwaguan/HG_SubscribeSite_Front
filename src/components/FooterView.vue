<template>
  <div class="footerContainer">
    <div class="footerMain">
      <div>
        <div class="footerTitle">關於我們</div>
        <div>華冠證券投資顧問股份有限公司</div>
        <div>100台北市中正區忠孝東路二段100號6樓之2</div>
        <div>傳真 : (02)2397-3938</div>
        <div>客服郵件: <a href="mailto:service@hwa-guan.com.tw">service@hwa-guan.com.tw</a></div>
        <div>華冠投顧 111金管投顧新字第015號</div>
      </div>
      <div>
        <div class="footerTitle">網站安心保證</div>
      </div>
      <div class="footerContact">
        <div>
          <div class="footerTitle">常用連結</div>
          <div class="ruleItem" @click="showDailog(7)">聯絡我們</div>
        </div>
        <div>
          <div class="footerTitle">條款聲明</div>
          <div class="ruleItem" @click="showDailog(1)">服務條款</div>
          <div class="ruleItem" @click="showDailog(2)">內容授權</div>
          <div class="ruleItem" @click="showDailog(3)">隱私權政策</div>
          <div class="ruleItem" @click="showDailog(4)">合作方案</div>
          <div class="ruleItem" @click="showDailog(6)">人力招募</div>
          <div class="ruleItem" @click="showDailog(5)">防制洗錢專區</div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import '../assets/base.css';

.footerContainer {
  width: 100%;
  padding: 30px calc((100% - var(--main-container-width)) / 2);
  color: var(--vt-c-white);
  background-color: var(--vt-c-black-mute);

  .footerMain {
    display: grid;
    grid-template-columns: 33% auto 33%;
    letter-spacing: 1px;

    .footerTitle {
      padding-bottom: 15px;
      font-size: 1.2rem;
    }

    .footerContact {
      display: grid;
      grid-template-columns: 50% 50%;
    }

    .ruleItem {
      padding: 5px 0px;
      cursor: pointer;
    }

    .ruleItem:hover {
      color: rgb(255, 230, 0);
    }
  }
}

@media screen and (max-width: 768px) {
  .footerContainer {
    padding: 20px;

    .footerMain {
      grid-template-columns: 100% !important;
      row-gap: 30px;

      .footerTitle {
        font-size: 1.5rem;
      }

      .footerContact {
        grid-template-columns: 100% !important;
        row-gap: 30px;
      }
    }
  }
}
</style>

<script setup lang="ts">
import { ref, shallowRef, watch } from 'vue'

const emit = defineEmits(['callDailog'])
let targetDailog = ref('')

const showDailog = (rid: Number) => {
  switch (rid) {
    case 1:
      //targetDailog.value = 'rules'
      targetDailog.value = ""
      window.open('../termsOfService', 'TermsOfService')
      break
    case 2:
      targetDailog.value = 'authoirty'
      break
    case 3:
      //targetDailog.value = 'privacy'
      targetDailog.value = ""
      window.open('../privacyPolicy', 'PrivacyPolicy')
      break
    case 4:
      targetDailog.value = 'cooperate'
      break
    case 5:
      targetDailog.value = 'laundering'
      break
    case 6:
      window.open('https://www.104.com.tw/company/7fdplao', 'HR')
      break
    case 7:
      targetDailog.value = 'contact'
      break
  }

  emit('callDailog', null, targetDailog.value)
}
</script>
