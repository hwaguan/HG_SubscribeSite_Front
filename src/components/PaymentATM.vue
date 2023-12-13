<template>
  <div class="atmContainer">
    <div class="blockTitle">
      <h6>ATM 櫃員機付款流程</h6>
    </div>
    <div class="bolckContainer">
      <div class="bolckContainerBlock">
        <div class="bolckContainerNo">1.</div>
        <div class="bolckContainerContent">
          若使用ATM櫃員機，可選擇轉帳/轉出(繳費單筆上限3萬元)或繳費(無上限3萬元限制)之功能按鈕；若為使用第一銀行ATM櫃員機，請選擇「繳費」按鈕。※第一銀行櫃員機畫面，如下圖所示：
        </div>
      </div>
      <div class="bolckContainerBlock">
        <div class="bolckContainerNo">2.</div>
        <div class="bolckContainerContent">
          適用【繳費】功能之銀行ATM櫃員機：台新銀行、玉山銀行、中國信託、華南銀行、第一銀行、富邦銀行、台灣銀行、土地銀行、彰化銀行、永豐銀行、國泰世華銀行、大眾銀行。(
          無上限3萬元限制 )
        </div>
        <div class="bolckContainerNo"></div>
        <div class="bolckContainerContent">
          <img src="../assets/images/payatm03.jpg" />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.atmContainer {
  .blockTitle {
    padding: 5px 0px 5px 15px;
    border-left: 10px rgba(255, 144, 0, 0.5) solid;

    h6 {
      color: rgb(150, 150, 150);
      font-weight: 700;
      letter-spacing: 2px;
      margin: unset;
    }
  }

  .bolckContainer {
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
}

@media screen and (max-width: 768px) {
  .atmContainer {
    img {
      width: 100%;
    }
  }
}
</style>

<script setup lang="ts"></script>
