<template>
  <div class="packageContainer">
    <div class="packageMain">
      <div class="packageBody" v-for="(pkg, index) in packageList" :key="index">
        <div class="packageSubject">
          <img src="package.img" v-if="pkg.p_img != ''" />
          <div class="packageSubjectText" v-if="pkg.p_img == ''">{{ pkg.p_subject }}</div>
          <div class="packageScore">瀏覽數 : {{ pkg.p_view }} / 訂閱數 : {{ pkg.p_subscribe }}</div>
        </div>
        <div class="packageIntro">
          <div class="packageIntroText" v-html="pkg.p_intro"></div>
          <div class="packageLearnMore">瞭解更多...</div>
        </div>
        <div class="pakcagePrice">NT ${{ pkg.p_price }} / 月</div>

        <div class="pakcageSubscribe">
          <button type="button" class="btn btn-sm btn-primary">訂閱</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.packageContainer {
  min-height: 500px;
  display: flex;
  justify-content: center;
  background: url('../assets/images/collage-finance-banner-concept.jpg');
  background-size: cover;
  background-repeat: no-repeat;
  .packageMain {
    width: var(--main-container-width);
    padding: 100px 0px;
    display: grid;
    grid-template-columns: 33% 33% 33%;
    justify-content: space-between;

    .packageBody {
      padding: 20px;
      background-color: rgb(240, 240, 240);
      border: 1px rgb(220, 220, 220) solid;
      border-radius: 15px;
      box-shadow: 3px 3px 10px rgba(0, 0, 0, 0.1);

      .packageSubjectText {
        font-size: 1.68rem;
        border-bottom: 2px rgb(220, 220, 220) solid;
      }
      .packageScore {
        padding-bottom : 20px;
        font-size: 12px;
        text-align: right;
      }

      .packageIntro {
        min-height: 100px;

        .packageLearnMore {
          padding-top: 20px;
          font-size: 12px;
          text-align: right;
        }
      }

      .pakcagePrice {
        padding: 20px 10px;
        color: rgb(210, 10, 10);
        font-size: 1.5rem;
        text-align: right;
        font-weight: 600;
      }

      .pakcageSubscribe {
        display: flex;
        justify-content: center;

        button {
          width: 95%;
        }
      }
    }
  }
}

@media screen and (max-width: 768px) {
    .packageMain {
        width : 100vw !important;
    }
}
</style>

<script setup lang="ts">
import { sysConfig } from '@/stores/sysConfig'
const config = sysConfig()
import { ref } from 'vue'
import axios from 'axios'
import decryptor from '@/assets/ts/tokenDecryptor'

const dec = new decryptor()
const now = new Date()
let packageList = ref<any>()

packageList.value = [
  {
    p_id: 1,
    p_subject: 'Eason 每日報告',
    p_intro: '每日1篇 台股盤勢專業分析文章',
    p_img: '',
    p_price: 399,
    p_month: 1,
    p_view: 5666,
    p_subscribe: 1312
  },
  {
    p_id: 1,
    p_subject: 'Eason 報告組合包',
    p_intro: '每日1篇 台股盤勢專業分析文章<br />每週1集週報影片',
    p_img: '',
    p_price: 999,
    p_month: 1,
    p_view: 3140,
    p_subscribe: 534
  },
  {
    p_id: 1,
    p_subject: 'Eason 直播互動',
    p_intro: '每日1篇 台股盤勢專業分析文章<br />直播',
    p_img: '',
    p_price: 1999,
    p_month: 1,
    p_view: 4225,
    p_subscribe: 31
  }
]
</script>
