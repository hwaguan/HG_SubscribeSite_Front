<template>
  <div class="dailogHeader">公司簡介</div>
  <div class="introContainer">
    <div class="introMain">
      <div class="introImg"></div>
      <div class="introContent">
        <h3>華冠投顧成立於西元1998年</h3>
        <p>
          是一家政府立案合法運作的投資顧問公司，於2005年春季重新改組，正式更名為『
          華冠證券投資顧問股份有限公司 』，登記（111）金管投顧新字第015號。
        </p>

        <h3>真誠、專業、精進</h3>
        <p>
          本公司是由一群擁有多年市場實戰經驗及研究分析專家所組成的專業團隊，堅持『 正派 』與『 專業
          』是我們經營的方針，在永續經營的規劃前提下，強調注重服務品質、獲利能力與風險控管，本著『
          真誠、專業、精進
          』的經營理念，戮力打造一個擁有真誠服務與專業的團隊，並且秉持著不斷精進的態度，提供廣大投資朋友更高品質及更全方位的投資諮詢與顧問服務。
          未來公司將持續以協助投資人做好最佳資產管理，創造最佳報酬為目標，進而成為投資人心目中最佳的投資顧問公司，並以此達成客戶、公司與員工三贏的最佳局面。
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.dailogHeader {
  padding-bottom: 20px;
  font-size: 1.5rem;
  border-bottom: 2px rgb(220, 220, 220) solid;
}

.introContainer {
  width: 100%;
  height: calc(100% - (1.5rem + 40px));
  background: rgba(255, 255, 255, 0.8) url('../assets/images/about_750.jpg');
  background-size: cover;

  .introMain {
    width: 100%;
    height: 100%;
    padding: 20px;
    backdrop-filter: blur(8px);
    background: rgba(255, 255, 255, 0.9);

    .introImg {
      width: 45%;
      height: 60%;
      background: rgba(255, 255, 255, 0.8) url('../assets/images/about_750.jpg');
      background-position: 40% 0px;
      border-radius: 15px;
    }

    .introContent {
      right: 20px;
      bottom: 20px;
      width: 60%;
      height: 80%;
      padding: 40px 20px 0px 30px;
      font-size: 1rem;
      text-align: justify;
      letter-spacing: 2px;
      background: rgb(255, 255, 255);
      border-radius: 10px;
      box-shadow: 3px 3px 5px rgba(0, 0, 0, 0.2);
      position: absolute;
      z-index: 1;
    }
  }
}

@media screen and (max-width: 768px) {
  .introMain {
    overflow-y: auto;

    .introImg {
      width: 100% !important;
      height: 38% !important;
      background-size: 180% !important;
    }

    .introContent {
      width: 100% !important;
      height: unset !important;
      max-height: 500vh !important;
      padding: 40px 20px !important;
      margin-top: 20px;
      position: unset !important;
    }
  }
}
</style>

<script setup lang="ts">
import { ref } from 'vue'
</script>
